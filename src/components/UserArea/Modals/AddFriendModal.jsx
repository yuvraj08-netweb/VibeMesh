/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import UserCard from "../Cards/UserCard";
import { useEffect, useRef, useState } from "react";
import Button from "../../Common/Button";
import Upload from "../../../firebase/upload";
import { generateGroup } from "../../../reducers/userSlice";
import { toast } from "react-toastify";
import ModalGroupCard from "../Cards/ModalGroupCard";

const Modal = ({ open, onClose }) => {
  const [createGroup, setCreateGroup] = useState(false);
  const [gName, setGName] = useState("NoName");
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(false);
  const { allUsers, userDetails, userChats, groupMembers, groupChats } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userFiltered = allUsers?.filter((user) => userDetails.id !== user.id);

  let friendFiltered =
    userChats.length > 0
      ? userFiltered?.filter((user) => {
          // Create a Set of friend IDs for faster lookup
          const friendIds = new Set(userChats.map((friend) => friend.user.id));

          return !friendIds.has(user.id); // Exclude users who are friends
        })
      : userFiltered;

  const modalRef = useRef(null);

  // Handle clicking outside of the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
        setCreateGroup(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  const [openTab, setOpenTab] = useState("chat");

  const switchTab = (tab) => {
    setOpenTab(tab);
  };

  const handleCreateGroup = async () => {
    setLoading(true);
    const userPersonalData = {
      id: userDetails.id,
      name: userDetails.fullName,
      avatar: userDetails.avatar,
    };

    // Add current user to group members locally
    const updatedGroupMembers = [userPersonalData, ...groupMembers];

    const imgUrl =
      (await Upload(img)) ||
      "https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-business-working-team-people-approach-under-building-concourse-windows-png-image_5181530.png";

    const groupInfo = {
      groupName: gName,
      groupAvatar: imgUrl,
      members: updatedGroupMembers,
      createdBy: {
        id: userDetails.id,
        name: userDetails.fullName,
        avatar: userDetails.avatar,
      },
    };

    dispatch(generateGroup({ groupInfo, userDetails }))
      .unwrap()
      .then(() => {
        setLoading(false);
        onClose();
        toast.success("Group Created Successfully !");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {open ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-[black]"
            id="modal"
          >
            <div
              className="relative w-auto mx-auto max-w-[400px]"
              ref={modalRef}
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-xl relative flex flex-col w-full bg-[#eeeaea] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between px-5 py-3 border-b border-solid rounded-t">
                  <h3 className="text-3xl font-semibold">All Users</h3>
                  <button
                    className="p-1 ml-auto bg-[transparent] border-0 text-[black] opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <i className="fa fa-close"></i>
                  </button>
                </div>

                {/*body*/}
                <div className="listOuter ">
                  <div
                    className={`listInnerContainer ${
                      createGroup
                        ? "sm:!h-[450px] sm:w-[400px] !h-[500px] w-[300px] overflow-y-auto"
                        : "h-[300px] w-[350px]"
                    } relative`}
                  >
                    {createGroup ? (
                      <>
                        <div className="creatingGroup p-3 ">
                          <div className="backButton flex sm:flex-row flex-col justify-between sm:items-center">
                            <Button
                              btnText={
                                <>
                                  &nbsp;
                                  <i className="fa fa-arrow-left"></i>
                                </>
                              }
                              btnFun={() => {
                                setCreateGroup(false);
                              }}
                              className="!text-xs text-darkPurple"
                            />
                            <div className="formElement sm:mt-0 mt-5">
                              <label
                                htmlFor="gName"
                                className="text-sm font-semibold"
                              >
                                Group Name :
                              </label>
                              <input
                                id="gName"
                                type="text"
                                onChange={(e) => {
                                  setGName(e.target.value);
                                }}
                                placeholder="Enter Group Name"
                                className="!p-2 text-xs !w-full"
                                autoFocus
                              />
                            </div>
                          </div>

                          <div className="CreateGroupForm px-1">
                            <div className="formElement">
                              <label
                                className="text-sm font-semibold"
                                htmlFor="profilePhoto"
                              >
                                Group Profile Photo :
                              </label>
                              <input
                                id="profilePhoto"
                                type="file"
                                onChange={(e) => {
                                  setImg(e.target.files[0]);
                                }}
                              />
                            </div>
                            <div className="allUsersList">
                              <h5 className="font-semibold">Add Users : </h5>
                              <div className="userListContainer !h-[200px] overflow-y-auto p-2">
                                <ul>
                                  <li>
                                    {userFiltered?.map((user, index) => (
                                      <UserCard
                                        user={user}
                                        key={index}
                                        from="createGroup"
                                      />
                                    ))}
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="submitButton">
                              <Button
                                btnText={
                                  <>
                                    {loading ? (
                                      "loading..."
                                    ) : (
                                      <>
                                        Create &nbsp;
                                        <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                      </>
                                    )}
                                  </>
                                }
                                className="bg-greyPurple !text-[#fff] border-none mt-5"
                                btnFun={handleCreateGroup}
                                disabled={loading ? true : false}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-wrap">
                        <div className="w-full">
                          {/* Actual Content To Show In The Tabs */}
                          <div className="relative flex flex-col min-w-0 break-words bg-[transparent] w-full h-[250px] overflow-y-auto ">
                            <div className="px-4 py-5 flex-auto">
                              <div className="tab-content tab-space">
                                {/* Content For Single Chat */}
                                <div
                                  className={
                                    openTab === "chat" ? "block" : "hidden"
                                  }
                                  id="singleChat"
                                >
                                  {/* display all available chats */}
                                  <ul>
                                    <li>
                                      {friendFiltered.length < 1
                                        ? "No users found"
                                        : friendFiltered.map((user, index) => (
                                            <UserCard
                                              func={onClose}
                                              user={user}
                                              key={index}
                                            />
                                          ))}
                                    </li>
                                  </ul>
                                </div>
                                {/* Content For The Group Chat */}
                                <div
                                  className={
                                    openTab === "group" ? "block" : "hidden"
                                  }
                                  id="groupChat"
                                >
                                  <div
                                    className="createGroup"
                                    onClick={() => setCreateGroup(true)}
                                  >
                                    <Button
                                      btnText={
                                        <>
                                          Create New Group &nbsp;
                                          <i className="fa fa-plus"></i>
                                        </>
                                      }
                                      className="!text-xs mb-4 text-darkPurple"
                                    />
                                  </div>

                                  {groupChats.length > 0 ? (
                                    groupChats.map((group, index) => {
                                      return (
                                        <ModalGroupCard
                                          groupInfo={group}
                                          func={onClose}
                                          key={index}
                                        />
                                      );
                                    })
                                  ) : (
                                    <p>No Groups To Show</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Tabs For Switching Between Single Chat And Group Chat */}
                          <div className="navTabs ">
                            <ul
                              className="flex list-none flex-wrap flex-row border-t absolute !bottom-0 !bg-purple w-full"
                              role="tablist"
                            >
                              {/* Single Chat */}
                              <li className="flex-auto text-center border-r">
                                <a
                                  className={
                                    "text-lg font-bold uppercase py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === "chat"
                                      ? `text-[#b6b4eb]`
                                      : ` text-[#7c7c7c]`)
                                  }
                                  onClick={(e) => {
                                    e.preventDefault();
                                    switchTab("chat");
                                  }}
                                  data-toggle="tab"
                                  href="#singleChat"
                                  role="tablist"
                                >
                                  <i className="fa fa-user"></i>
                                </a>
                              </li>
                              {/* Group Chat */}
                              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <a
                                  className={
                                    "text-lg font-bold uppercase py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === "group"
                                      ? `text-[#b6b4eb]`
                                      : ` text-[#7c7c7c]`)
                                  }
                                  onClick={(e) => {
                                    e.preventDefault();
                                    switchTab("group");
                                  }}
                                  data-toggle="tab"
                                  href="#groupChat"
                                  role="tablist"
                                >
                                  <i className="fa fa-users"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-[black]"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
