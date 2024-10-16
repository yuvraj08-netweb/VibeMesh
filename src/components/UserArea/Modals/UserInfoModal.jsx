/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const InfoModal = ({ open, onClose ,from}) => {
  const { userDetails,selectedChat } = useSelector((state) => state.user);

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

  return (
    <>
      {open ? from==="header" ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-[black]"
            id="modal"
          >
            <div className="relative sm:w-[400px] w-[300px] my-6 mx-auto " ref={modalRef}>
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#fff] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between py-2 px-5 border-b border-solid border-[blueGray]rounded-t">
                  <h3 className="text-2xl font-semibold">User Details</h3>
                  <button
                    className="p-1 ml-auto bg-[transparent] border-0 text-[black] opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <i className="fa fa-close"></i>
                  </button>
                </div>
                {/*body*/}
                <div className="bodyContent w-full h-[500px] overflow-y-auto">
                  <div className="profilePhotoContainer relative">
                    <div className="bgContainer min-h-[150px]  mx-auto">

                    </div>
                    <div className="imgContainer w-[200px] mx-auto  -mt-[90px]">
                      <img
                        src={userDetails.avatar}
                        alt="profilePicture"
                        className="rounded-xl"
                        draggable="false"
                      />
                    </div>
                  </div>

                  <div className="userInfo p-5">
                    <div className="name text-center">
                      <h5 className="text-xl font-semibold">
                        {userDetails.fullName} 
                      </h5>
                    </div>
                    <div className="otherInfo mt-10">
                      <div className="id">
                        <div className="userId flex gap-4">
                          <i className="fa fa-user"></i>
                          User Id : <span className="text-sm break-words max-w-[200px]"> {userDetails.id}</span>
                        </div>
                      </div>
                      <div className="email flex items-center gap-4 mt-3">
                        <i className="fa fa-envelope"></i>
                        Email :
                        <span className="text-sm">
                         {userDetails.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-[black]"></div>
        </>
      ) : 
      <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-[black]"
            id="modal"
          >
            <div className="relative sm:w-[400px] w-[300px] my-6 mx-auto " ref={modalRef}>
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#fff] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between py-2 px-5 border-b border-solid border-[blueGray]rounded-t">
                  <h3 className="text-2xl font-semibold">User Details</h3>
                  <button
                    className="p-1 ml-auto bg-[transparent] border-0 text-[black] opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <i className="fa fa-close"></i>
                  </button>
                </div>
                {/*body*/}
                <div className="bodyContent w-full h-[450px] overflow-y-auto">
                  <div className="profilePhotoContainer relative">
                    <div className="bgContainer min-h-[150px]  mx-auto">

                    </div>
                    <div className="imgContainer w-[200px] mx-auto  -mt-[90px]">
                      <img
                        src={selectedChat.user.avatar}
                        alt="profilePicture"
                        className="rounded-xl"
                        draggable="false"
                      />
                    </div>
                  </div>

                  <div className="userInfo p-5">
                    <div className="name text-center">
                      <h5 className="text-xl font-semibold">
                        {selectedChat.user.fullName} 
                      </h5>
                    </div>
                    <div className="otherInfo mt-10">
                      <div className="id">
                        <div className="userId flex gap-4">
                          <i className="fa fa-user"></i>
                          User Id : <span className="text-sm break-words max-w-[200px]"> {selectedChat.user.id}</span>
                        </div>
                      </div>
                      <div className="email flex items-center gap-4 mt-3">
                        <i className="fa fa-envelope"></i>
                        Email :
                        <span className="text-sm">
                         {selectedChat.user.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-[black]"></div>
        </>
      : null}
    </>
  );
};

export default InfoModal;
