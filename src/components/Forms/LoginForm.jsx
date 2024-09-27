import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";

const LoginForm = () => {

  const [showPassword, setShowPassword] = useState (false);

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

  const submitForm = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.emailId, data.password);
      reset();
      navigate(`/userArea`);
    } catch (error) {
      toast.error(`Log In Failed Due To : ${error.message}`);
    }
  };

  return (
    <form className="max-w-[450px] loginForm">
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
      <div className="formElement">
        <Button
          btnText={"Log In"}
          btnFun={handleSubmit(submitForm)}
          className="!text-darkPurple bg-lightPurple border-none"
        />
      </div>
    </form>
  );
};

export default LoginForm;
