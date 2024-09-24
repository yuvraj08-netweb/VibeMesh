import { toast } from "react-toastify";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const UserArea = () => {
  const [userDetails, setUserDetails] = useState(null);
  
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "Users", user.uid));
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          toast.success(`Welcome Back ${docSnap.data().fullName}`);
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
          <h1>Welcome {userDetails.fullName}</h1>

          <Button btnText={"Log Out"} btnFun={handleLogOut} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserArea;
