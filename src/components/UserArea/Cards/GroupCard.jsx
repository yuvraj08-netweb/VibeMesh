/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedChat,
  setSelectedGroupChatData,
} from "../../../reducers/userSlice";
import ProfileImage from "../../Common/ProfileImage";
import { useEffect, useState, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";

/* eslint-disable react/prop-types */
const GroupCard = ({ groupInfo, className }) => {
  const [fullGroupInfo, setFullGroupInfo] = useState();
  const dispatch = useDispatch();
  const {userDetails,selectedChat} = useSelector(state => state.user)
  const lastMessageTimestampRef = useRef(null); // Track last message timestamp during session

  // Retrieve the last processed message timestamp from localStorage
  const getStoredTimestamp = (groupId) =>
     localStorage.getItem(`lastGroupMessageTimestamp_${groupId}`);

  // Store the latest message timestamp in localStorage
  const storeTimestamp = (groupId, timestamp) =>
    localStorage.setItem(`lastGroupMessageTimestamp_${groupId}`, timestamp);

  // Display notification for new group messages
  const showNotification = (message) => {
    const senderId = message.messageId.split("_")[0]; // Extract sender's ID

    if (senderId !== userDetails.id && selectedChat === null){

      const senderName = message?.senderName;
  
      if (senderName) {
        new Notification("New Group Message", {
          body: `${groupInfo.groupName} ~ ${senderName}: ${message.messageText}`,
        });
      }
    }
  };

  useEffect(() => {
    // Listen for updates in the group chat document
    const unsub = onSnapshot(doc(db, "groupChats", groupInfo.groupId), (res) => {
      const data = res.data();
      setFullGroupInfo(data);
      
      const lastMessage = data?.lastMessage;
 
      (lastMessage)
      const lastMessageTimestamp = lastMessage?.timestamp;

      const storedTimestamp = getStoredTimestamp(groupInfo.groupId); // Get stored timestamp
      
      // Trigger notification only for new messages
      if (
        lastMessage &&
        (!storedTimestamp || lastMessageTimestamp > storedTimestamp) &&
        lastMessageTimestamp !== lastMessageTimestampRef.current
      ) {
        console.log("EnteredIF");
        
        showNotification(lastMessage); // Show notification
        storeTimestamp(groupInfo.groupId, lastMessageTimestamp); // Update localStorage
        lastMessageTimestampRef.current = lastMessageTimestamp; // Update ref for session
      }
    });

    return () => {
      unsub(); // Clean up listener on unmount
    };
  }, [groupInfo.groupId]);

  return (
    <div
      className={`card flex items-center h-[50px] cursor-pointer mb-4 ${className}`}
      onClick={() => {
        dispatch(setSelectedChat(groupInfo));
        dispatch(setSelectedGroupChatData(fullGroupInfo));
      }}
    >
      <div className="imgContianer !w-[50px] !h-[50px]">
        <ProfileImage
          imgSrc={groupInfo.groupAvatar}
          className="!w-[50px] !h-[50px]"
        />
      </div>
      <div className="friendInfo ml-3">
        <div className="fName mb-1">
          <h4 className="text-xl font-normal">{groupInfo.groupName}</h4>
        </div>
        <div className="lastMessage text-xs text-[#ffffff81]">
          {fullGroupInfo?.messages.length > 0 ? (
            <p>
              {
                fullGroupInfo.messages[fullGroupInfo.messages.length - 1].from
                  ?.senderName + "~"
              }{" "}
              {fullGroupInfo?.lastMessage?.messageText || ""}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
