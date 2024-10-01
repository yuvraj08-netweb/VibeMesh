/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button";
import { addUserFriends } from "../../../reducers/userSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UserCard = ({ func, user }) => {

  const { userDetails } = useSelector((state) => state.user);

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

  return (
    <>
      <div className="card flex items-center justify-between mb-3">
        <div className="userData flex items-center gap-3">
          <div className="imgContainer">
            <img src={user.avatar} alt="" className="w-[50px] rounded-[100%]" />
          </div>
          <div className="nameHeading">
            <h4 className="!text-darkPurple">{user.fullName}</h4>
          </div>
        </div>
        <div className="addBtn">
          <Button
            btnText={
              <>
                Add &nbsp;
                <i className="fa fa-plus"></i>
              </>
            }
            className="text-[12px] bg-greyPurple !text-[#fff] border-none !font-bold"
            btnFun={handleAddFriend}
          />
        </div>
      </div>
    </>
  );
};

export default UserCard;
