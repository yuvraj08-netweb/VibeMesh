import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../reducers/userSlice";

/* eslint-disable react/prop-types */
const FriendsCard = ({friend}) => {
  console.log(friend);
  const dispatch = useDispatch();
  // const lastMessage = friend.messages.length>0 ? friend.messages[friend.messages.length-1].text : "";
  return (
    <>
      <div
        className="card flex items-center h-[50px] cursor-pointer mb-5"
        onClick={() => dispatch(setSelectedChat(friend))}
      >
        <div className="imgContianer w-[50px]">
          <img
            src={friend.avatar}
            alt="profilePhoto"
            className="w-[50px] h-[50px]  rounded-[100%] border"
          />
        </div>
        <div className="friendInfo ml-3">
          <div className="fName mb-1 text-left">
            <h4 className="text-xl font-normal">{friend.fullName}</h4>
          </div>
          <div className="lastMessage text-xs text-[#ffffff81]">
            {/* <p>{lastMessage}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsCard;
