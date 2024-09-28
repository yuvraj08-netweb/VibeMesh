import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../firebase/config";
import { arrayUnion, collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
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
      console.log(users);
      
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
  async ({userDetails,user},thunkAPI) => {
    try {
      // Reference to the user document in Firestore
      const userChatsRef = collection(db,"UsersChat");
      const chatsRef = collection(db,"chats");
      
      const newChatDocRef = doc(chatsRef);
      
      await setDoc(newChatDocRef,{
        createdAt: serverTimestamp(),
        messages:[],
      })


      // Update the friends array using arrayUnion
      await updateDoc(doc(userChatsRef,userDetails.id),{
        chats: arrayUnion({
          chatId: newChatDocRef.id,
          lastMessage:"",
          updatedAt: Date.now(),
          senderId: userDetails.id,
          receiverId: user.id,
        }), // `user` is the friend you want to add
      });
      
      // Update the friends array using arrayUnion
      await updateDoc(doc(userChatsRef,user.id),{
        chats: arrayUnion({
          chatId: newChatDocRef.id,
          lastMessage:"",
          updatedAt: Date.now(),
          senderId: user.id,
          receiverId: userDetails.id,
        }), // `user` is the friend you want to add
      });
  
      console.log("Friend added successfully!");
      return {user};
  
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isUser: false,
    userDetails: null,
    selectedChat: null,
    allUsers: null,
    userLoading:false,
    chatMessages:[],
  },
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
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
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.isUser = false;
        console.error(action.payload);
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
  },
});

export const { setSelectedChat} = userSlice.actions;

export default userSlice.reducer;
