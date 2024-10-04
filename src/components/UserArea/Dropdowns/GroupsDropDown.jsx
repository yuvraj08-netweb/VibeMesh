import { useState, useRef, useEffect } from 'react';
import Button from '../../Common/Button';
import { useDispatch, useSelector } from 'react-redux';
import GroupInfoModal from '../Modals/GroupInfoModal';
import { doc, updateDoc, arrayRemove, collection } from "firebase/firestore"; 
import { setSelectedChat } from '../../../reducers/userSlice';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/config';

const GroupsDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const [viewInfo, setViewInfo] = useState(false);
  const dispatch = useDispatch();
  const {userDetails,selectedGroupChatData, selectedChat} = useSelector(state => state.user)

  
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

const handleView = () =>{
  setViewInfo(prev => !prev);
  toggleMenu()
}

const handleExitGroup = async () =>{

  if (!selectedChat?.groupId) {
    console.error("Group ID is missing!");
    return;
  }

  const groupRefDoc = doc(db, "groupChats", selectedChat.groupId);
 // Ensure correct path
  const userChatRef = collection(db, "UsersChat");
  const userChatRefDoc = doc(userChatRef,userDetails.id); // Ensure correct path
  
  const userToRemove = {
    avatar: userDetails.avatar,
    id: userDetails.id,
    name: userDetails.fullName,
  }

  const GroupToRemove = {
    groupAvatar: selectedGroupChatData.groupAvatar,
    groupId: selectedGroupChatData.groupId,
    groupName: selectedGroupChatData.groupName,
  }

  try {
    
    // Remove user from groupMembers array
    await updateDoc(groupRefDoc, {
      groupMembers: arrayRemove(userToRemove)
    });
    // Remove group from user's chat list
    await updateDoc(userChatRefDoc, {
      groups: arrayRemove(GroupToRemove)
    });
    
    // Actions after successful removal
    toggleMenu();
    dispatch(setSelectedChat(null));
    toast.success("Group Left!");
  } catch (error) {
    console.error("Error leaving group: ", error);
  }
  
}

  return (
    <div className="relative" ref={menuRef}>
      <Button
        btnText={
          <>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </>
        }
        className="border-none text-3xl !py-0"
        btnFun={toggleMenu} // Accepts a function as a parameter
      />

      {isOpen && (
        <div className="absolute text-sm -left-36 w-[150px] mt-2 bg-[white] rounded shadow-lg text-[black]">
          <ul className="py-2">
            <li>
            <Button
                    btnText={
                        <>
                        <i className='fa fa-eye'></i>
                        <span className='ml-3'>Group Info</span>
                        </>
                    }
                    className='border-none'
                    btnFun={handleView}
                />
            </li>
            <li>
                <Button
                    btnText={
                        <>
                        <i className="fa-solid fa-person-through-window"></i>
                        <span className='ml-3'>Exit Group</span>
                        </>
                    }
                    className='border-none'
                    btnFun={handleExitGroup}
                />
            </li>
           
          </ul>
        </div>
      )}
        <GroupInfoModal open={viewInfo} onClose={() => setViewInfo(false)} />
    </div>
    
  );
};

export default GroupsDropDown;
