import Button from "../components/Common/Button"
import SignUpForm from "../components/Forms/SignUpForm"

const SignUp = () => {
  return (
    <>
 <div className="Login w-full min-h-screen flex justify-center items-center ">
        <div className="glassCard w-[80%] min-h-[80vh]">
          <div className="container mx-auto grid grid-cols-2 items-center min-h-[inherit]">
            <div className="col-1 flex flex-col items-center">
              <div className="header mb-10">
                <h1 className="text-4xl font-extrabold text-[#fff]">Sign Up</h1>
              </div>
              <SignUpForm />
            </div>
            <div className="col-2 border-l-2 border-darkPurple p-5 text-[#ffffff98]">
              <p>New to VibeMesh? Join a world of seamless conversations and vibrant connections! Sign up today to start chatting. <br/> <span className="mt-5 inline-block">Already have an account? Click below to log in and pick up where you left off.</span> 
              </p>
              <Button 
                btnText={"Login"}
                path={"/login"}
                className="mt-8 hover:bg-lightPurple hover:text-darkPurple "
              />
            </div>
          </div>
        </div>
      </div>
  </>
  )
}

export default SignUp