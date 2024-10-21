import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../../reducers/userSlice";
import { useEffect, useState, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import ProfileImage from "../../Common/ProfileImage";

/* eslint-disable react/prop-types */
const FriendsCard = ({ friend }) => {
  const { userDetails, selectedChat } = useSelector((state) => state.user);
  const friendData = friend.user;
  const dispatch = useDispatch();
  const [chat, setChat] = useState();
  const lastMessageTimestampRef = useRef(null); // Tracks latest message across renders

  // Retrieve the last processed message timestamp from localStorage
  const getStoredTimestamp = (chatId) => {
    return localStorage.getItem(`lastMessageTimestamp_${chatId}`);
  };

  // Store the new message timestamp in localStorage
  const storeTimestamp = (chatId, timestamp) => {
    localStorage.setItem(`lastMessageTimestamp_${chatId}`, timestamp);
  };

  // Display a notification for new messages
  const showNotification = (message) => {
    const senderId = message.messageId.split("_")[0]; // Extract sender's ID
    if (senderId !== userDetails.id && selectedChat === null) {
      new Notification("New Message", {
        body: `${friendData.fullName} ~ ${message.messageText}`,
      });
    }
  };

  useEffect(() => {
    // Listen for changes in the chat document
    const unsub = onSnapshot(doc(db, "chats", friend.chatId), (res) => {
      const data = res.data();
      setChat(data);

      const lastMessage = data?.lastMessage;
      const lastMessageTimestamp = lastMessage?.timestamp;

      const storedTimestamp = getStoredTimestamp(friend.chatId); // Fetch stored timestamp

      // Ensure notification triggers only for new messages
      if (
        lastMessage &&
        (!storedTimestamp || lastMessageTimestamp > storedTimestamp) &&
        lastMessageTimestamp !== lastMessageTimestampRef.current
      ) {
        showNotification(lastMessage); // Show notification
        storeTimestamp(friend.chatId, lastMessageTimestamp); // Store timestamp in localStorage
        lastMessageTimestampRef.current = lastMessageTimestamp; // Update ref for current session
      }
    });

    return () => {
      unsub(); // Cleanup listener on component unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friend.chatId]);

  return (
    <div
      className="card flex items-center h-[50px] cursor-pointer mb-5"
      onClick={() => dispatch(setSelectedChat(friend))}
    >
      <div className="imgContianer w-[50px]">
        <ProfileImage
          imgSrc={friendData.avatar}
          className="!w-[50px] !h-[50px]"
        />
      </div>
      <div className="friendInfo ml-3">
        <div className="fName mb-1 text-left">
          <h4 className="text-xl font-normal">{friendData.fullName}</h4>
        </div>
        <div className="lastMessage text-xs text-[#ffffff81]">
          <p>{chat?.lastMessage?.messageText || ""}</p>
        </div>
      </div>
    </div>
  );
};

export default FriendsCard;
