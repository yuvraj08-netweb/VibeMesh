/* eslint-disable react/prop-types */
import { useState } from 'react';
import { collection , getDocs } from "firebase/firestore";
import {db} from "../../firebase/config"; // Your Firebase setup
import { debounce } from 'lodash'; // For debouncing the search input
import Button from '../Common/Button';

const SearchBar = ({ userChats,userDetails }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

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
        const usersRef = collection(db, 'Users');
        const querySnapshot = await getDocs(usersRef);
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
        // Filter results based on case-insensitive fullName comparison
        const filteredUsers = users.filter(user => 
          user.fullName.toLowerCase().includes(searchQuery)
        );
        const morefilteredUsers = filteredUsers.filter((user)=>user.id!==userDetails.id);

        setSearchResults(morefilteredUsers);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if the user is already in userChats
  const isUserInChat = (userId) => {
    return userChats.some(chat => chat.receiverId === userId || chat.senderId === userId);
  };

  // Handle adding a user to chat
  const handleAddUser = (user) => {
    // Your logic to add user to chat here
    console.log('Add user:', user);
  };

  // Handle chatting with a user
  const handleChat = (user) => {
    // Your logic to start chat with user here
    console.log('Chat with user:', user);
  };

  return (
    <div className="searchBar w-full flex border-b-2 p-3 relative">
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
              <div key={user.id} className="flex justify-between items-center p-2 border-b">
                <div className='flex items-center'>
                  <img src={user.avatar} alt={user.fullName} className="w-8 h-8 rounded-full mr-2" />
                  <span>{user.fullName}</span>
                </div>
                <div>
                  {isUserInChat(user.id) ? (
                    <button className="btn-chat" onClick={() => handleChat(user)}>Chat</button>
                  ) : (
                    <button className="btn-add" onClick={() => handleAddUser(user)}>Add</button>
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
