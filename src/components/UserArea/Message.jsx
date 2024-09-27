/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { userDetails, selectedChat } = useSelector((state) => state.user);
  console.log(message, "message");

  return (
    <>
      <div className={message.sender !=="user" ? "message flex mb-5 items-center gap-5" : "message flex mb-5 items-center gap-5 flex-row-reverse" }>
        <img
          className="inline-block size-9 rounded-full"
          src={
            message.sender === "user" ? userDetails.avatar : selectedChat.avatar
          }
          alt="Avatar"
        />
        <div>
          {/* Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 sm:max-w-[400px]">
            {message.text}
          </div>
          {/* End Card */}

          {message.sent ? (
            <span className={`mt-1.5 flex items-center gap-x-1 text-xs text-gray-500 ${message.sender === "user" ? "!justify-end" : ""}`}>
             <i className="fa-solid fa-check-double"></i>
              Sent
            </span>
          ) : (
            <span className="mt-1.5 flex items-center gap-x-1 text-xs text-gray-500">
            <i className="fa-solid fa-circle-exclamation"></i>
             Not Sent
           </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Message;

// className="flex ms-auto gap-x-2 sm:gap-x-4"
