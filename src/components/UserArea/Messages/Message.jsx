/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {

  const { userDetails, selectedChat } = useSelector((state) => state.user);
  const [senderDetails, setSenderDetails] = useState(null);

  useEffect(() => {
    // Ensure userDetails and selectedChat are loaded before running the effect
    if (userDetails && selectedChat) {
      const [senderId, ] = message.messageId.split("_");
      
      // Check if the sender is the current user
      if (senderId === userDetails.id) {
        setSenderDetails(userDetails);
      } else {
        setSenderDetails(selectedChat.user);
      }

    }
  }, [message.messageId, selectedChat, userDetails]);


  return (
    <>
      <div
        className={
          senderDetails?.id === userDetails?.id
            ? "message flex mb-5 items-center gap-5 flex-row-reverse"
            : "message flex mb-5 items-center gap-5"
        }
      >
        <img
          className="inline-block size-9 rounded-full"
          src={
            senderDetails?.id === userDetails?.id
              ? senderDetails?.avatar
              : senderDetails?.avatar
          }
          alt="Avatar"
        />
        <div>
          {/* Card */}
          <div className="bg-white border border-gray-200 rounded-2xl px-4 !py-2  sm:max-w-[400px]">
            {message?.messageText}
          </div>
          {/* End Card */}
        </div>
      </div>
    </>
  );
};

export default Message;

// className="flex ms-auto gap-x-2 sm:gap-x-4"
