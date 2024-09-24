import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
const LoginForm = () => {
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
      console.log(data);
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
        <Button
          btnText={"Log In"}
          btnFun={handleSubmit(submitForm)}
          className="text-darkPurple bg-lightPurple border-none"
        />
      </div>
    </form>
  );
};

export default LoginForm;
