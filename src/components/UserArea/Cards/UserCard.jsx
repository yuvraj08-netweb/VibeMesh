/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button";
import {
  addGroupMembers,
  addUserFriends,
  deleteGroupMember,
} from "../../../reducers/userSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const UserCard = ({ func, user, from = "" }) => {
  const [memberAdded, setMemberAdded] = useState(false);

  const { userDetails} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {}, [userDetails]);

  const handleAddFriend = () => {
    dispatch(addUserFriends({ userDetails, user }))
      .unwrap()
      .then(() => {
        toast.success("User Added As Friend!");
        func();
      });
  };

  const handleAddMember = () => {
    const userData = {
      userId: user.id,
      userName: user.fullName,
      userAvatar: user.avatar,
    };

    if (memberAdded) {
      setMemberAdded(false);
      dispatch(deleteGroupMember(user.id));
    } else {
      dispatch(addGroupMembers(userData));
      setMemberAdded(true);
    }
  };


  return (
    <>
      <div className="card flex items-center justify-between mb-3">
        <div className="userData flex items-center gap-3">
          <div className="imgContainer">
            <img
              src={user.avatar}
              alt=""
              className="w-[50px] h-[50px] rounded-[100%]"
            />
          </div>
          <div className="nameHeading">
            <h4 className="!text-darkPurple">{user.fullName}</h4>
          </div>
        </div>
        <div className="addBtn">
          <Button
            btnText={
              memberAdded ? (
                <>
                  <i className="fa-solid fa-check"></i>
                </>
              ) : (
                <>
                  Add &nbsp;
                  <i className="fa fa-plus"></i>
                </>
              )
            }
            className="text-[12px] bg-greyPurple !text-[#fff] border-none !font-bold"
            btnFun={from === "createGroup" ? handleAddMember : handleAddFriend}
          />
        </div>
      </div>
    </>
  );
};

export default UserCard;
