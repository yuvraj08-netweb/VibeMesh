import Button from "../components/Common/Button";
import { useNavigate } from "react-router-dom";
import NoChatSelected from "../components/UserArea/Chats/NoChatSelected";
import Tabs from "../components/UserArea/Tabs";
import PageLoader from "../components/Common/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, fetchUsers, logOutUser } from "../reducers/userSlice";
import ChatSelected from "../components/UserArea/Chats/ChatSelected";
import { useEffect, useState } from "react";
import Modal from "../components/UserArea/Modals/AddFriendModal";
import InfoModal from "../components/UserArea/Modals/UserInfoModal";
import GroupChatSelected from "../components/UserArea/Chats/GroupChatSelected";
import SearchBar from "../components/UserArea/SearchBar";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const UserArea = () => {
  const { userDetails, loading, selectedChat, userChats } = useSelector(
    (state) => state.user
  );

  const [openModal, setOpenModal] = useState(false);
  const [viewInfo, setViewInfo] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchGroups());
  }, [dispatch]);

  if (loading) {
    return <PageLoader />;
  }

  const handleLogOut = () => {
    dispatch(logOutUser())
      .unwrap()
      .then(async () => {

        const userIdRef = doc(db, "Users", userDetails.id);
        await updateDoc(userIdRef, {
          FCM_Token: "",
        });

        navigate("/login");
      });
  };

  const handleAddFriend = () => {
    setOpenModal(true);
  };

  const handleViewInfo = () => {
    setViewInfo(true);
  };
  return (
    <div>
      {userDetails ? (
        <>
          <div className="userArea min-h-screen  w-full flex items-center text-[#fff]">
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
                    <div
                      className="userInfo flex items-center cursor-pointer"
                      onClick={handleViewInfo}
                    >
                      <div className="userAvatar max-w-max">
                        <img
                          src={userDetails.avatar}
                          alt="UserAvatar"
                          className="w-[50px] h-[50px]  rounded-[100%] border"
                          draggable="false"
                        />
                      </div>
                      <div className="userName ml-3 text-lg max-w-max">
                        <h2>{userDetails.fullName}</h2>
                      </div>
                    </div>
                    <div className="BtnContainer flex gap-4">
                      <div className="addButton has-tooltip">
                        <Button
                          btnText={
                            <>
                              <span className="tooltip  text-xs rounded shadow-lg p-2 !bg-[#ffffff9a] text-[black] mt-6 -ml-20">
                                Create Chat
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
                    <SearchBar
                      userChats={userChats}
                      userDetails={userDetails}
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
                  {selectedChat ? (
                    selectedChat?.chatId ? (
                      <ChatSelected />
                    ) : (
                      <GroupChatSelected />
                    )
                  ) : (
                    <NoChatSelected />
                  )}
                </div>
              </div>
            </div>
            <Modal open={openModal} onClose={() => setOpenModal(false)} />
            <InfoModal
              open={viewInfo}
              from={"header"}
              onClose={() => setViewInfo(false)}
            />
          </div>
        </>
      ) : (
        <PageLoader />
      )}
    </div>
  );
};

export default UserArea;
