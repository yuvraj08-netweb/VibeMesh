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
  const schema = yup.object().shape({
    fullName: yup.string().required("Please Provide Your Name"),
    emailId: yup
      .string()
      .required("Email is required !")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Email is Invalid"
      ),
    password: yup.string().min(6).max(20).required("Password is Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords Don't Match")
      .required("Please Re-enter the Password"),
  });

  const [img, setImg] = useState(null);
  const [loading,setLoading] = useState(false);
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
      if (img) {
        imgUrl = await upload(img);

        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            fullName: data.fullName,
            email: user.email,
            id: user.uid,
            blocked: false,
            avatar: imgUrl,
          });
        }
      }

      toast.success("User Registered Successfully!");
      setLoading(false)
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
      <div className="formElement">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="Enter Password" type="password" />
          )}
        />
        <p className="errorPara">{errors.password?.message}</p>
      </div>

      <div className="formElement">
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <input {...field} type="password" placeholder="Confirm Password" />
          )}
        />
        <p className="errorPara">{errors.confirmPassword?.message}</p>
      </div>
      <div className="formElement">
        {
          loading ? <div className="loading-wave">
          <div className="loading-bar" />
          <div className="loading-bar" />
          <div className="loading-bar" />
          <div className="loading-bar" />
        </div>
         : <Button
          btnText={"Register"}
          className="!text-darkPurple bg-lightPurple border-none"
          btnFun={handleSubmit(submitForm)}
        />
        }
        
      </div>
    </form>
  );
};

export default SignUpForm;
