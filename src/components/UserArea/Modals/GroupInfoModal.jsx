/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import ProfileImage from "../../Common/ProfileImage";

const GroupInfoModal = ({ open, onClose }) => {
  const { selectedGroupChatData } = useSelector((state) => state.user);

  const modalRef = useRef(null);
  const date = new Date(selectedGroupChatData?.updatedAt);

  // Handle clicking outside of the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <>
      {open ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 !z-[10000] outline-none focus:outline-none text-[black]"
            id="modal"
          >
            <div
              className="relative sm:w-[400px] w-[300px] my-6 mx-auto !z-[1000] "
              ref={modalRef}
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#fff] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between py-2 px-5 border-b border-solid border-[blueGray]rounded-t">
                  <h3 className="text-2xl font-semibold">Group Details</h3>
                  <button
                    className="p-1 ml-auto bg-[transparent] border-0 text-[black] opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <i className="fa fa-close"></i>
                  </button>
                </div>
                {/*body*/}
                <div className="bodyContent w-full h-[450px] overflow-y-auto !z-[1000]">
                  <div className="profilePhotoContainer relative">
                    <div className="bgContainer min-h-[150px]  mx-auto"></div>
                    <div className="imgContainer w-[200px] mx-auto  -mt-[90px]">
                      <img
                        src={selectedGroupChatData?.groupAvatar}
                        alt="profilePicture"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="userInfo p-5">
                    <div className="name text-center">
                      <h5 className="text-xl font-semibold">
                        {selectedGroupChatData?.groupName}
                      </h5>
                    </div>
                    <div className="otherInfo mt-10">
                      <div className="id">
                        <div className="userId flex gap-4 items-center">
                          Created By :{" "}
                          <span className="break-words flex items-center gap-2 max-w-[200px]">
                            <ProfileImage
                              imgSrc={selectedGroupChatData?.createdBy.avatar}
                            />
                            {selectedGroupChatData?.createdBy.name}
                          </span>
                        </div>
                      </div>
                      <div className="createdAt mt-5">
                        <div className="flex gap-4 items-center ">
                          Created At :{" "}
                          <span className="text-sm break-words sm:max-w-[250px] max-w-[150px]">
                            {" "}
                            {date.toString()}
                          </span>
                        </div>
                      </div>
                      <div className="membersList mt-5">
                        <h5 className="font-normal text-lg">
                          {" "}
                          Group Members :
                        </h5>
                        {console.log(
                          selectedGroupChatData,
                          "selectedGroupChatData"
                        )}
                        <div className="listContainer">
                          <ul>
                            {selectedGroupChatData?.groupMembers.length > 0 ? (
                              <>
                                {selectedGroupChatData?.groupMembers.map(
                                  (member, idx) => {
                                    return (
                                      <li key={idx}>
                                        <div className=" flex items-center gap-3 mt-4">
                                          <ProfileImage
                                            imgSrc={member?.avatar}
                                          />
                                          <span>{member?.name}</span>
                                        </div>
                                      </li>
                                    );
                                  }
                                )}
                              </>
                            ) : (
                              ""
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
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

export default GroupInfoModal;
