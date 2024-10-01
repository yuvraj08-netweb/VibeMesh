/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../../reducers/userSlice";

/* eslint-disable react/prop-types */
const GroupCard = ({ groupInfo, className }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div
        className="card flex items-center h-[50px] cursor-pointer mb-4"
        onClick={() => dispatch(setSelectedChat())}
      >
        <div className="imgContianer !w-[50px] !h-[50px]">
          <img
            src={groupInfo.groupAvatar}
            alt="profilePhoto"
            className="w-[50px] h-[50px]  rounded-[100%] border"
          />
        </div>
        <div className="friendInfo ml-3">
          <div className="fName mb-1">
            <h4 className="text- font-normal">{groupInfo.groupName}</h4>
          </div>
          {/* <div className="lastMessage text-xs text-[#ffffff81]">
            <p>{groupInfo.lastMessage}</p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default GroupCard;
