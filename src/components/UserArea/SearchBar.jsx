/* eslint-disable react/prop-types */
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"; // Your Firebase setup
import { debounce } from "lodash"; // For debouncing the search input
import Button from "../Common/Button";
import { useDispatch } from "react-redux";
import { addUserFriends, setSelectedChat } from "../../reducers/userSlice";
import { toast } from "react-toastify";

const SearchBar = ({ userChats, userDetails }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // Debounced function to avoid querying on every keystroke
  const debouncedSearch = debounce(async (value) => {
    if (value.trim()) {
      await searchUsers(value);
    } else {
      setSearchResults([]); // Clear results if input is empty
    }
  }, 500);

  // Handle search input changes
  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
    debouncedSearch(value);
  };

  // Fetch matching users from Firebase
  const searchUsers = async (searchQuery) => {
    setLoading(true);
    try {
      const usersRef = collection(db, "Users");
      const querySnapshot = await getDocs(usersRef);
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter results based on case-insensitive fullName comparison
      const filteredUsers = users.filter((user) =>
        user.fullName.toLowerCase().includes(searchQuery)
      );
      const morefilteredUsers = filteredUsers.filter(
        (user) => user.id !== userDetails.id
      );

      setSearchResults(morefilteredUsers);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if the user is already in userChats
  const isUserInChat = (userId) => {
    return userChats.some(
      (chat) => chat.receiverId === userId || chat.senderId === userId
    );
  };

  // Handle adding a user to chat
  const handleAddUser = (user) => {
    // Your logic to add user to chat here
    dispatch(addUserFriends({ userDetails, user }))
    .unwrap()
    .then(() => {
      toast.success("User Added As Friend!");
      setSearchInput("");
      setSearchResults("");
    });
  };

  // Handle chatting with a user
  const handleChat = (user) => {
    // Your logic to start chat with user here
    const chatVar = userChats.filter((chat) => chat.user.id === user.id);
    dispatch(setSelectedChat(chatVar?.[0]));
    setSearchInput("");
    setSearchResults("");
  };

  return (
    <div className="searchBar w-full flex p-3 relative">
      <input
        type="search"
        value={searchInput}
        onChange={handleInputChange}
        className="rounded border px-3 py-[0.25rem] text-base font-normal leading-[1.6]"
        placeholder="Search"
        aria-label="Search"
      />

      <Button
        btnText={<i className="fa fa-search"></i>}
        className="!text-[#fff] border-none !pl-3 !pr-1"
      />

      {/* Dropdown for search results */}
      {searchResults.length > 0 && (
        <div className="dropdown w-[80%] bg-[white] text-[black] shadow-lg mt-2 rounded absolute top-12 z-50">
          {loading ? (
            <p className="p-3 text-center">Searching...</p>
          ) : (
            searchResults.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full mr-2"
                    draggable = "false"
                  />
                  <span>{user.fullName}</span>
                </div>
                <div>
                  {isUserInChat(user.id) ? (
                    <Button
                      btnText="Chat"
                      className="!py-1 text-sm"
                      btnFun={() => handleChat(user)}
                    />
                  ) : (
                    <Button
                      btnText="Add"
                      className="!py-1 text-sm"
                      btnFun={() => handleAddUser(user)}
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
