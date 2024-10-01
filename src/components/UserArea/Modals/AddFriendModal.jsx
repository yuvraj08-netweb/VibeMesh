/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import UserCard from "../Cards/UserCard";
import { useEffect, useRef } from "react";

const Modal = ({ open, onClose }) => {
  const { allUsers, userDetails,userChats } = useSelector((state) => state.user);

  const userFiltered = allUsers?.filter((user) => userDetails.id !== user.id);

  // console.log(userChats,"userChats");
  
  // console.log(  userChats.length,"  userChats.length");
  
  let friendFiltered =
  userChats.length > 0
      ? userFiltered?.filter((user) => {
          // Create a Set of friend IDs for faster lookup
          const friendIds = new Set(
            userChats.map((friend) => friend.user.id)
          );
//           console.log(friendIds,"friendIds");
// console.log(!friendIds.has(user.id),"!friendIds.has(user.id)");

          return !friendIds.has(user.id); // Exclude users who are friends
        })
      : userFiltered;

  const modalRef = useRef(null);

  
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

  // useEffect(async () => {
  //   const res = await getDoc(doc(db, "UsersChat", userDetails.id));
  //   setCurrentUserChats(res.data());
  // },[currentUserChats])
  // console.log(currentUserChats, "currentUserChats");

  return (
    <>
      {open ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-[black]"
            id="modal"
          >
            <div
              className="relative w-auto my-6 mx-auto max-w-sm"
              ref={modalRef}
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[white] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-[blueGray]rounded-t">
                  <h3 className="text-3xl font-semibold">All Users</h3>
                  <button
                    className="p-1 ml-auto bg-[transparent] border-0 text-[black] opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <i className="fa fa-close"></i>
                  </button>
                </div>
                {/*body*/}
                <div className="listOuter relative p-6">
                  <div className="listInnerContainer h-[250px] w-[300px] overflow-y-auto">
                    <ul>
                      <li>
                        {friendFiltered.length < 1
                          ? "No users found"
                          : friendFiltered.map((user, index) => (
                            <UserCard func={onClose} user={user} key={index} />
                          ))}
                      </li>
                    </ul>
                  </div>
                </div>
                {/*footer*/}
                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-[#c3c3c3] rounded-b">
                  <button
                    className="text-[red] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div> */}
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
