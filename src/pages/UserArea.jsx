import Button from "../components/Common/Button";
import { useNavigate } from "react-router-dom";
import NoChatSelected from "../components/UserArea/NoChatSelected";
import Tabs from "../components/UserArea/Tabs";
import PageLoader from "../components/Common/pageLoader";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, fetchUsers, logOutUser } from "../reducers/userSlice";
import ChatSelected from "../components/UserArea/ChatSelected";
import { useEffect, useState } from "react";
import Modal from "../components/UserArea/Modal";

const UserArea = () => {
  const { userDetails, loading, selectedChat } = useSelector(
    (state) => state.user
  );
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("selectedChat", selectedChat);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <PageLoader />;
  }

  const handleLogOut = () => {
    dispatch(logOutUser())
      .unwrap()
      .then(() => {
        navigate("/login");
      });
  };

  const handleAddFriend = () => {
    setOpenModal(true);
  };
  return (
    <div>
      {userDetails ? (
        <>
          <div className="userArea min-h-screen w-full flex items-center text-[#fff]">
            <div className="centerCard min-h-[90vh] w-[90%] m-auto">
              <div className="innerContainer flex min-h-[inherit]">
                {/* Left Side Area */}
                <div
                  className={
                    selectedChat
                      ? "md:block hidden md:!min-w-[300px] !min-w-[100%] md:border-r-2  "
                      : "containerLeft md:border-r-2  md:!min-w-[300px] !min-w-[100%]"
                  }
                >
                  {/* For User Avatar and Logout */}
                  <div className="top-section flex justify-between items-center p-4 ">
                    <div className="userInfo flex items-center">
                      <div className="userAvatar max-w-max">
                        <img
                          src={userDetails.avatar}
                          alt="UserAvatar"
                          className="w-[50px] h-[50px]  rounded-[100%] border"
                        />
                      </div>
                      <div className="userName ml-3 text-lg max-w-[60%]">
                        <h2>{userDetails.fullName}</h2>
                      </div>
                    </div>
                    <div className="BtnContainer flex gap-4">
                      <div className="addButton has-tooltip">
                        <Button
                          btnText={
                            <>
                              <span className="tooltip  text-xs rounded shadow-lg p-2 !bg-[#ffffff9a] text-[black] mt-6 -ml-20">
                                Add Friends
                              </span>
                              <i className="fa-solid fa-plus"></i>
                            </>
                          }
                          btnFun={handleAddFriend}
                          className="!text-[#fff] border-none !p-0"
                        />
                      </div>
                      <Button
                        btnText={
                          <>
                            <i className="fa-solid fa-right-from-bracket"></i>
                          </>
                        }
                        btnFun={handleLogOut}
                        className="!text-[#fff] border-none !p-0"
                      />
                    </div>
                  </div>
                  <div className="searchBar w-full flex border-b-2 p-3">
                    <input
                      type="search"
                      className="rounded border px-3 py-[0.25rem] text-base font-normal leading-[1.6]"
                      placeholder="Search"
                      aria-label="Search"
                    />

                    <Button
                      btnText={
                        <>
                          <i className="fa fa-search"></i>
                        </>
                      }
                      className="!text-[#fff] border-none !pl-3 !pr-1"
                    />
                  </div>
                  {/* For Switching Between One to One and Group Chat */}
                  <div className="tabs">
                    <Tabs />
                  </div>
                </div>

                {/* Chat Area */}
                <div
                  className={
                    selectedChat
                      ? "containerRight w-full block"
                      : "md:block hidden !w-full"
                  }
                >
                  {selectedChat ? <ChatSelected /> : <NoChatSelected />}
                </div>
              </div>
            </div>
            <Modal open={openModal} onClose={() => setOpenModal(false)} />
          </div>
        </>
      ) : (
        <PageLoader />
      )}
    </div>
  );
};

export default UserArea;
