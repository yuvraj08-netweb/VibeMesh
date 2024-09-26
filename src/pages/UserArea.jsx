import { toast } from "react-toastify";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "../components/Common/Button";
import { useNavigate } from "react-router-dom";
import NoChatSelected from "../components/UserArea/NoChatSelected";
import Tabs from "../components/UserArea/Tabs";
import PageLoader from "../components/Common/pageLoader";

const UserArea = () => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "Users", user.uid));
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          // toast.success(`Welcome Back ${docSnap.data().fullName}`);
        } else {
          toast.error("User data not found!");
        }
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const navigate = useNavigate();
  async function handleLogOut() {
    try {
      await auth.signOut();
      navigate("/login");
      toast.success("User Logged Out Successfully.");
    } catch (error) {
      toast.error(`${error.message}`);
    }
  }

  return (
    <div>
      {userDetails ? (
        <>
          <div className="userArea min-h-screen w-full flex items-center text-[#fff]">
            <div className="centerCard min-h-[90vh] w-[90%] m-auto">
              <div className="innerContainer container flex min-h-[inherit]">
                {/* Left Side Area */}
                <div className="containerLeft border-r-2  w-[350px]">
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
                  {/* For Switiching Between One to One and Group Chat */}
                  <div className="tabs">
                     <Tabs/>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="containerRight w-full ">
                  <NoChatSelected />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <PageLoader/>
        </>
      )}
    </div>
  );
};

export default UserArea;
