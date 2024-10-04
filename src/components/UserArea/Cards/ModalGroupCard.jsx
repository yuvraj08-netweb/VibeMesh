/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button";
import { addUserToGroup } from "../../../reducers/userSlice";
import ProfileImage from "../../Common/ProfileImage";

const ModalGroupCard = ({ groupInfo, func }) => {
  const { userDetails, userGroups } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleJoinGroup = () => {
    dispatch(addUserToGroup({ groupInfo, userDetails, userGroups }))
      .unwrap()
      .then(() => {
        console.log("Group Joined SuccessFully");
        func();
      });
  };

  const handleViewGroup = () => {};

  return (
    <>
      <div className="card flex justify-between items-center h-[50px] cursor-pointer mb-4">
        <div className="groupInfo flex items-center">
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
            <div className="btns flex gap-5">
              <div className="viewGroupInfo">
                <Button
                  btnText={
                    <>
                      View &nbsp;
                      <i className="fa fa-eye"></i>
                    </>
                  }
                  className="text-[12px] bg-greyPurple !text-[#fff] border-none !font-bold !py-1"
                  btnFun={handleViewGroup}
                />
              </div>
              <div className="joinBtn">
                <Button
                  btnText={
                    <>
                      Join &nbsp;
                      <i className="fa fa-plus"></i>
                    </>
                  }
                  className="text-[12px] bg-greyPurple !text-[#fff] border-none !font-bold !py-1"
                  btnFun={handleJoinGroup}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalGroupCard;
