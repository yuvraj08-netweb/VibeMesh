/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";

const GroupMessage = ({ message }) => {
    
  const { userDetails } = useSelector((state) => state.user);

  return (
    <>
      <div
        className={
          message.from.senderId === userDetails?.id
            ? "message flex mb-5 items-center gap-5 flex-row-reverse"
            : "message flex mb-5 items-center gap-5"
        }
      >
        <img
          className="inline-block size-9 rounded-full"
          src={
            message.from.senderId === userDetails?.id
              ? userDetails.avatar
              : message.from?.senderAvatar
          }
          alt="Avatar"
        />
        <div>
          {/* Card */}
          <div className="bg-white border border-gray-200 rounded-2xl px-4 !py-2 sm:max-w-[400px]">
            {message?.messageText}
          </div>
          {/* End Card */}
        </div>
      </div>
    </>
  );
};

export default GroupMessage;
