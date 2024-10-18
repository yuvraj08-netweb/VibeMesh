import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import Button from "../Common/Button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../../reducers/userSlice";
import { generateToken } from "../../firebase/notifications";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const schema = yup.object().shape({
    emailId: yup
      .string()
      .required("Email is required !")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Email is Invalid"
      ),
    password: yup.string().required("Please Enter Password"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      emailId: "", // Default value for fullName
      password: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitForm = async (data) => {
    try {
        await signInWithEmailAndPassword(auth, data.emailId, data.password).then(
        () => {
          dispatch(fetchUserData()).unwrap().then(async (data)=> {
            const userID = data.id;
            if(Notification.permission === "granted"){
              generateToken(userID);
            }
          })
          reset();
          navigate("/userArea");
        }
      );
    } catch (error) {
      toast.error(`Log In Failed Due To : ${error.message}`);
    }
  };

  return (
    <form className="md:max-w-[450px] max-w-[85%] loginForm">
      <div className="formElement">
        <Controller
          name="emailId"
          control={control}
          render={({ field }) => <input {...field} placeholder="Email Id" />}
        />
        <p className="errorPara">{errors.emailId?.message}</p>
      </div>
      <div className="formElement relative">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                id="password"
              />
              <span
                className="absolute top-3 right-5 text-[#fff] cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </span>
            </>
          )}
        />
        <p className="errorPara">{errors.password?.message}</p>
      </div>
      <p className="text-[#949393d7] mb-4 sm:hidden block">Dont`t have a account ? <Link to="/signup"><span className="text-lightPurple font-bold"> SignUp Here </span></Link> </p>
      <div className="formElement">
        <Button
          btnText={"Log In"}
          btnFun={handleSubmit(submitForm)}
          className="!text-[#fff] bg-lightPurple border-none"
        />
      </div>
    </form>
  );
};

export default LoginForm;
