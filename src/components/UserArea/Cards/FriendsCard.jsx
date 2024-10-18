import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../../reducers/userSlice";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import ProfileImage from "../../Common/ProfileImage";


/* eslint-disable react/prop-types */
const FriendsCard = ({friend}) => {

  const friendData = friend.user;
  const dispatch = useDispatch();
  const [chat,setChat] = useState();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", friend.chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unsub();
    };
  }, [friend.chatId]);

  return (
    <>
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
            <p>{chat?.lastMessage?.messageText || ``}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsCard;
