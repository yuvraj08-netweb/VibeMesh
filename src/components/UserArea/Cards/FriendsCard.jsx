import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../../reducers/userSlice";

/* eslint-disable react/prop-types */
const FriendsCard = ({friend}) => {
  const friendData = friend.user;
  const dispatch = useDispatch();

  return (
    <>
      <div
        className="card flex items-center h-[50px] cursor-pointer mb-5"
        onClick={() => dispatch(setSelectedChat(friend))}
      >
        <div className="imgContianer w-[50px]">
          <img
            src={friendData.avatar}
            alt="profilePhoto"
            className="w-[50px] h-[50px]  rounded-[100%] border"
          />
        </div>
        <div className="friendInfo ml-3">
          <div className="fName mb-1 text-left">
            <h4 className="text-xl font-normal">{friendData.fullName}</h4>
          </div>
          <div className="lastMessage text-xs text-[#ffffff81]">
            <p>{friend?.lastMessage || `hello`}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsCard;
