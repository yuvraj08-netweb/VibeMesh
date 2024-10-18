/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import {
  setSelectedChat,
  setSelectedGroupChatData,
} from "../../../reducers/userSlice";
import ProfileImage from "../../Common/ProfileImage";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";

/* eslint-disable react/prop-types */
const GroupCard = ({ groupInfo, className }) => {
  const [fullGroupInfo, setFullGroupInfo] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "groupChats", groupInfo.groupId),
      (res) => {
        setFullGroupInfo(res.data());
      },
    );
    
    return () => {
      unsub();
    };
  }, [groupInfo.groupId]);

  return (
    <>
      <div
        className="card flex items-center h-[50px] cursor-pointer mb-4"
        onClick={() => 
        {  dispatch(setSelectedChat(groupInfo))
          dispatch(setSelectedGroupChatData(fullGroupInfo));}
        }
      >
        <div className="imgContianer !w-[50px] !h-[50px]">
          <ProfileImage
            imgSrc={groupInfo.groupAvatar}
            className="!w-[50px] !h-[50px]"
          />
        </div>
        <div className="friendInfo ml-3">
          <div className="fName mb-1">
            <h4 className="text- font-normal">{groupInfo.groupName}</h4>
          </div>
          <div className="lastMessage text-xs text-[#ffffff81]">
            {fullGroupInfo?.messages.length > 0 ? (
              <p>
                {fullGroupInfo?.messages[fullGroupInfo?.messages?.length - 1]
                  ?.from?.senderName + "~"}{" "}
                {fullGroupInfo?.lastMessage?.messageText || ""}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupCard;
