/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button";
import { addUserToGroup } from "../../../reducers/userSlice";

const ModalGroupCard = ({ groupInfo }) => {
    const {userDetails,userGroups} = useSelector(state => state.user)
    const dispatch = useDispatch();

    const handleJoinGroup = () =>{
        dispatch(addUserToGroup({groupInfo,userDetails,userGroups}))
        console.log("Group Joined SuccessFully");
    }
  return (
    <>
      <div className="card flex justify-between items-center h-[50px] cursor-pointer mb-4">
        <div className="groupInfo flex items-center">
          <div className="imgContianer !w-[50px] !h-[50px]">
            <img
              src={groupInfo.groupAvatar}
              alt="profilePhoto"
              className="w-[50px] h-[50px]  rounded-[100%] border"
            />
          </div>
          <div className="friendInfo ml-3">
            <div className="fName mb-1">
              <h4 className="text- font-normal">
                {groupInfo.groupName}
              </h4>
            </div>
          </div>
        </div>

        <div className="joinBtn">
          <Button
            btnText={
              <>
                Join &nbsp;
                <i className="fa fa-plus"></i>
              </>
            }
            className="text-[12px] bg-greyPurple !text-[#fff] border-none !font-bold"

            btnFun={handleJoinGroup}
          />
        </div>
      </div>
    </>
  );
};

export default ModalGroupCard;
