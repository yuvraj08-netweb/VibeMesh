/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const InfoModal = ({ open, onClose }) => {
  const { userDetails } = useSelector((state) => state.user);
  

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
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#fff] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-[blueGray]rounded-t">
                  <h3 className="text-3xl font-semibold">User Details</h3>
                  <button   
                    className="p-1 ml-auto bg-[transparent] border-0 text-[black] opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <i className="fa fa-close"></i>
                  </button>
                </div>
                {/*body*/}
                <div className="bodyContent w-[400px] p-6">
                    <div className="userImg flex gap-5 justify-between items-center mt-5">
                    <h5 className="text-xl font-semibold ">Profile Picture : </h5> 
                        <img src={userDetails.avatar} alt="profilePicture"  className="w-[150px] rounded-lg border"/>
                    </div>
                    <div className="userName flex gap-5 mt-5 items-center justify-between">
                        <h5 className="text-xl font-semibold">Full Name : </h5> <p>{userDetails.fullName} </p>
                    
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

export default InfoModal;
