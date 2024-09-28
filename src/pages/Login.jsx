import { useSelector } from "react-redux";
import Button from "../components/Common/Button";
import LoginForm from "../components/Forms/LoginForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
// Accessing isUser from the state
const { isUser } = useSelector((state) => state.user);

useEffect(() => {
  // Redirect if user is already logged in
  if (isUser) {
    navigate('/userArea'); // Change to your user area path
  }
},[isUser,navigate]);
  
  return (
    <>
      <div className="Login w-full min-h-screen flex justify-center items-center ">
        <div className="glassCard w-[80%] min-h-[80vh]">
          <div className="container mx-auto grid grid-cols-2 items-center min-h-[inherit]">
            <div className="col-1 flex flex-col items-center">
              <div className="header mb-10">
                <h1 className="text-4xl font-extrabold text-[#fff]">Log In</h1>
              </div>
              <LoginForm />
            </div>
            <div className="col-2 border-l-2 border-darkPurple p-5 text-[#ffffff98]">
              <p>Welcome back to VibeMesh! Ready to reconnect with your friends and communities? Log in below to dive back into your conversations.<br/> <span className="mt-5 inline-block">Don`t have an account yet? Click here to sign up and get started!</span> 
              </p>
              <Button 
                btnText={"SignUp"}
                path="/signup"
                className="mt-8 hover:bg-lightPurple hover:text-darkPurple "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
