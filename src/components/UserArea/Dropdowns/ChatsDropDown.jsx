import { useState, useRef, useEffect } from "react";
import Button from "../../Common/Button";
import InfoModal from "../Modals/UserInfoModal";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/config";
// eslint-disable-next-line no-unused-vars
import { doc, updateDoc, arrayRemove, collection, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { setSelectedChat } from "../../../reducers/userSlice";

const ChatsDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [viewInfo, setViewInfo] = useState(false);
  const dispatch = useDispatch();
  const { userDetails,selectedChat} = useSelector((state) => state.user);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleView = () => {
    setViewInfo(true);
  };

  const handleRemoveUser = async () => {
    const userChatRef = collection(db, "UsersChat");
    const userChatRefDoc = doc(userChatRef, userDetails.id); 

    const friendChatRef = doc(userChatRef,selectedChat.user.id);

    const userChatData = (await getDoc(friendChatRef)).data().chats;

    const chatFiltered = userChatData.filter((chat)=>chat.chatId === selectedChat.chatId)[0];
    
    const chatToRemove = {
      chatId: selectedChat.chatId,
      receiverId: selectedChat.receiverId,
      senderId: selectedChat.senderId,
      updatedAt: selectedChat.updatedAt,
    };

    const friendChatToRemove = {
      chatId: chatFiltered.chatId,
      receiverId: chatFiltered.receiverId ,
      senderId: chatFiltered.senderId ,
      updatedAt: chatFiltered.updatedAt,
    };
    
    try {
      // Remove user from groupMembers array
      await updateDoc(userChatRefDoc, {
        chats: arrayRemove(chatToRemove)
      });
      await updateDoc(friendChatRef, {
        chats: arrayRemove(friendChatToRemove)
      });
    
      // Actions after successful removal
      toggleMenu();
      dispatch(setSelectedChat(null));
      toast.success("User Removed!");
    } catch (error) {
      console.error("Error leaving group: ", error);
    }
  };

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
        <div className="absolute text-sm -left-36 min-w-[150px] mt-2 bg-[white] rounded shadow-lg text-[black]">
          <ul className="py-2">
            <li>
              <Button
                btnText={
                  <>
                    <i className="fa fa-eye"></i>
                    <span className="ml-3">View User</span>
                  </>
                }
                className="border-none"
                btnFun={handleView}
              />
            </li>
            <li>
              <Button
                btnText={
                  <>
                    <i className="fa fa-user-minus"></i>
                    <span className="ml-3">Remove User</span>
                  </>
                }
                className="border-none"
                btnFun={handleRemoveUser}
              />
            </li>
          </ul>
        </div>
      )}
      <InfoModal open={viewInfo} onClose={() => setViewInfo(false)} />
    </div>
  );
};

export default ChatsDropDown;
