/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";

const GroupMessage = ({ message }) => {
  const { userDetails } = useSelector((state) => state.user);

  return (
    <>
      <div
        className={
          message.from.senderId === userDetails?.id
            ? "message  flex mb-5 items-center gap-3 flex-row-reverse"
            : "message flex mb-8 items-center gap-3"
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
          draggable="false"
        />
        <div>
          {/* Card */}
          <div className="relative border border-gray-200 rounded-2xl px-4 -z-10 !py-2 max-w-[270px] lg:max-w-[400px]">
            <span
              className={`w-[200px] text-[11px] text-[#ffffff96]
           ${
             message.from.senderId === userDetails?.id
               ? "hidden"
               : "absolute -top-5 left-0"
           }
          `}
            >
              {message.from.senderName}
            </span>
            {message?.messageText}
          </div>
          {/* End Card */}
        </div>
      </div>
    </>
  );
};

export default GroupMessage;
