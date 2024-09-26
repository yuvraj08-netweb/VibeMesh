import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// Helper function to wrap onAuthStateChanged in a Promise
const getAuthUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("No user is logged in"));
      }
      unsubscribe(); // Clean up the listener
    });
  });
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async ( thunkAPI) => {
    try {
      const user = await getAuthUser(); // Wait for user authentication
      const docSnap = await getDoc(doc(db, "Users", user.uid)); // Fetch user data
      if (docSnap.exists()) {
        console.log(docSnap.data());
        
        return docSnap.data();
      } else {
        toast.error("User data not found!");
        return thunkAPI.rejectWithValue("User data not found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Handle errors properly
    }
  }
);

export const logOutUser = createAsyncThunk(
    "user/logOutUser",
    async (thunkAPI)=>{
        try {
            auth.signOut();
            toast.success("User Logged Out Successfully.");
        } catch (error) {
            toast.error("Log Out Failed");
            return thunkAPI.rejectWithValue(error.message); // Handle errors properly
        }
    }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isUser: false,
    userDetails: null,
  },
  reducers: {},
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
        state.userDetails = null; // Clear user details on logout
      })
      .addCase(logOutUser.rejected, (state, action) => {
        console.error(action.payload); // Handle error if logout fails
      });
  },
});

export default userSlice.reducer;
