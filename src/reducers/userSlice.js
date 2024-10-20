/* eslint-disable no-unused-vars */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../firebase/config";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { getAuthUser } from "../utils";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const usersCollectionRef = collection(db, "Users");
      const querySnapshot = await getDocs(usersCollectionRef);
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(users);

      return users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, thunkAPI) => {
    try {
      const user = await getAuthUser();
      const docSnap = await getDoc(doc(db, "Users", user.uid));
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        toast.error("User data not found!");
        return thunkAPI.rejectWithValue("User data not found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addUserFriends = createAsyncThunk(
  "user/addUserFriends",
  async ({ userDetails, user }, thunkAPI) => {
    try {
      // Reference to the user document in Firestore
      const userChatsRef = collection(db, "UsersChat");
      const chatsRef = collection(db, "chats");

      const newChatDocRef = doc(chatsRef);

      await setDoc(newChatDocRef, {
        createdAt: serverTimestamp(),
        lastMessage: "",
        messages: [],
      });

      // Update the friends array using arrayUnion
      await updateDoc(doc(userChatsRef, userDetails.id), {
        chats: arrayUnion({
          chatId: newChatDocRef.id,
          updatedAt: Date.now(),
          senderId: userDetails.id,
          receiverId: user.id,
        }), // `user` is the friend you want to add
      });

      // Update the friends array using arrayUnion
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatDocRef.id,
          updatedAt: Date.now(),
          senderId: user.id,
          receiverId: userDetails.id,
        }), // `user` is the friend you want to add
      });

      console.log("Friend added successfully!");
      return { user };
    } catch (error) {
      console.error("Error adding friend: ", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "user/logOutUser",
  async (_, thunkAPI) => {
    try {
      auth.signOut();
      toast.success("User Logged Out Successfully.");
    } catch (error) {
      toast.error("Log Out Failed");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const generateGroup = createAsyncThunk(
  "user/generateGroup",
  async ({ groupInfo, userDetails }, thunkAPI) => {
    try {
      if (groupInfo) {
        const userChatsRef = collection(db, "UsersChat");
        const groupsRef = collection(db, "groupChats");
        const newGroupDocRef = doc(groupsRef);
        
        await setDoc(newGroupDocRef, {
          groupId: newGroupDocRef.id,
          groupName: groupInfo.groupName,
          groupAvatar: groupInfo.groupAvatar,
          lastMessage: "",
          groupMembers: groupInfo.members,
          createdBy: groupInfo.createdBy,
          updatedAt: Date.now(),
          messages: [],
        });
        
        await updateDoc(doc(userChatsRef, userDetails.id), {
          groups: arrayUnion({
            groupId: newGroupDocRef.id,
            groupName: groupInfo.groupName,
            groupAvatar: groupInfo.groupAvatar,
          }),
        });

        if (groupInfo.members.length > 0) {
          await Promise.all(
            groupInfo.members.map(async (member) => {
              if (!member.id) {
                throw new Error("Member User ID is required");
              }
              await updateDoc(doc(userChatsRef, member.id), {
                groups: arrayUnion({
                  groupId: newGroupDocRef.id,
                  groupName: groupInfo.groupName,
                  groupAvatar: groupInfo.groupAvatar,
                }),
              });
            })
          );
        }
      } else {
        throw new Error("NoGroupInfoFound");
      }
    } catch (error) {
      console.error("Error adding friend: ", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchGroups = createAsyncThunk(
  "user/fetchGroups",
  async (_, thunkAPI) => {
    try {
      const groupsCollectionRef = collection(db, "groupChats");
      const querySnapshot = await getDocs(groupsCollectionRef);
      const groups = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      return groups;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addUserToGroup = createAsyncThunk(
  "user/addUserToGroup",
  async ({ groupInfo, userDetails, userGroups }, thunkAPI) => {
    try {

      const groupChatsRef = collection(db, "groupChats");
      const userGroupsRef = doc(db, "UsersChat",userDetails.id);

      // Update the friends array using arrayUnion
      await updateDoc(doc(groupChatsRef, groupInfo.groupId), {
        groupMembers: arrayUnion({
          id: userDetails.id,
          name: userDetails.fullName,
          avatar: userDetails.avatar,
        }),
      });

      await updateDoc(userGroupsRef, {
        groups: arrayUnion({
          groupId: groupInfo.groupId,
          groupName: groupInfo.groupName,
          groupAvatar: groupInfo.groupAvatar,
        }),
      });

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: null,
    isUser: false,
    userDetails: null,
    selectedChat: null,
    selectedGroupChatData: null,
    allUsers: null,
    userLoading: false,
    groupMembers: [],
    userChats: [],
    groupChats: null,
    userGroups: [],
  },
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setUserChats: (state, action) => {
      state.userChats = action.payload;
    },
    addGroupMembers: (state, action) => {
      state.groupMembers = [...state.groupMembers, action.payload];
    },
    deleteGroupMember: (state, action) => {
      state.groupMembers = state.groupMembers.filter((member) => {
        return member?.userId !== action.payload;
      });
    },
    setSelectedGroupChatData: (state, action) => {
      state.selectedGroupChatData = action.payload;
    },
    setUserGroups: (state, action) => {
      state.userGroups = action.payload;
    },
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
        state.isUser = true;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.loading = false;
        state.isUser = false;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.isUser = false;
        state.userDetails = null;
        state.selectedChat = null;
      })
      .addCase(logOutUser.rejected, (action) => {
        console.error(action.payload);
      })
      .addCase(fetchUsers.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.userLoading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.allUsers = null;
        state.userLoading = false;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groupChats = action.payload;
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.groupChats = null;
      });
  },
});

export const {
  setSelectedChat,
  setUserChats,
  addGroupMembers,
  deleteGroupMember,
  setUserGroups,
  setSelectedGroupChatData,
} = userSlice.actions;

export default userSlice.reducer;
