import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import Button from "../Common/Button";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import upload from "../../firebase/upload";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const schema = yup.object().shape({
    fullName: yup.string().required("Please Provide Your Name"),
    emailId: yup
      .string()
      .required("Email is required !")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Email is Invalid"
      ),
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Password must be at least 8 characters!")
      .matches(/[a-z]/, "At least one lowercase character!")
      .matches(/[A-Z]/, "At least one uppercase character!")
      .matches(/[\W_]/, "At least 1 special character (@, !, #, etc)!")
      .matches(/[0-9]/, "Must Include One Number"),
    confirmPassword: yup
      .string()
      .required("Password confirmation is required!")
      .oneOf([yup.ref("password"), null], "Passwords must match!"),
  });

  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      emailId: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  const submitForm = async (data) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.emailId, data.password);
      const user = auth.currentUser;

      // Upload the file only if an image is selected
      let imgUrl = "";

      imgUrl =
        (await upload(img)) ||
        "https://smaabacus.com/themes/user/assets_old/img/dd/avatar/male.png";

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          id: user.uid,
          fullName: data.fullName,
          email: user.email,
          avatar: imgUrl,
          blocked: [],
        });
        await setDoc(doc(db, "UsersChat", user.uid), {
          chats: [],
        });
      }

      toast.success("User Registered Successfully!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error(`Registration Failed Due To ${error.message}`);
    }
    reset();
  };

  const handleFileChange = (file) => {
    setImg(file);
  };

  return (
    <form className="md:max-w-[450px] w-[90%] loginForm">
      <div className="formElement">
        <input
          type="file"
          onChange={(e) => handleFileChange(e.target.files[0])}
        />
      </div>
      <div className="formElement">
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => <input {...field} placeholder="Full Name" />}
        />
        <p className="errorPara">{errors.fullName?.message}</p>
      </div>
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

      <div className="formElement relative">
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                id="confirmPassword"
              />
              <span
                className="absolute top-3 right-5 text-[#fff] cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                <i
                  className={`fa ${
                    showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </span>
            </>
          )}
        />
        <p className="errorPara">{errors.confirmPassword?.message}</p>
      </div>
      <div className="formElement">
        {loading ? (
          <div className="loading-wave">
            <div className="loading-bar" />
            <div className="loading-bar" />
            <div className="loading-bar" />
            <div className="loading-bar" />
          </div>
        ) : (
          <Button
            btnText={"Register"}
            className="!text-darkPurple bg-lightPurple border-none"
            btnFun={handleSubmit(submitForm)}
          />
        )}
      </div>
    </form>
  );
};

export default SignUpForm;
