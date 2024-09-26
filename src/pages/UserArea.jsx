import Button from "../components/Common/Button";
import { useNavigate } from "react-router-dom";
import NoChatSelected from "../components/UserArea/NoChatSelected";
import Tabs from "../components/UserArea/Tabs";
import PageLoader from "../components/Common/pageLoader";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logOutUser } from "../reducers/userSlice";
import ChatSelected from "../components/UserArea/ChatSelected";
import { useEffect } from "react";


const UserArea = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails, loading } = useSelector((state) => state.user);

  console.log("userDetails", userDetails);
  
  const something = true;

  useEffect(()=>{
    dispatch(fetchUserData());
  },[])

  if (loading) {
    return <PageLoader />
  }

  const handleLogOut = () => {
    dispatch(logOutUser())
      .unwrap()
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <div>
      {userDetails ? (
        <div className="userArea min-h-screen w-full flex items-center text-[#fff]">
          <div className="centerCard min-h-[90vh] w-[90%] m-auto">
            <div className="innerContainer container flex min-h-[inherit]">
              {/* Left Side Area */}
              <div className="containerLeft md:border-r-2  md:!min-w-[300px] !min-w-[100%]">
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
                  <div className="logoutBtnContainer">
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
              <div className="containerRight w-full md:block hidden">
                {something ? <ChatSelected /> : <NoChatSelected />}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PageLoader/>
      )}
    </div>
  );
};

export default UserArea;
