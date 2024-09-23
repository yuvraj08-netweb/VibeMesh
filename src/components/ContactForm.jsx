import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import Button from "./Button";

const ContactForm = () => {

    const schema = yup.object().shape({
        fullName: yup.string().required("Your Full Name is Required!"),
        email: yup
          .string()
          .required("Email is required !")
          .matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Email is Invalid"
          ),
        message: yup.string().required("Please Enter Your Message!")
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
      fullName: "", // Default value for fullName
      email: "",
      message: "",
    },
  });

  const submitForm = (data) =>{
    console.log(data);
    reset();
  }
  return (
    <form className="max-w-[450px]">
      <div className="formElement">
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => <input {...field} placeholder="Enter Full Name" />}
        />
        <p>{errors.fullName?.message}</p>
      </div>
      <div className="formElement">
        <Controller
          name="email"
          control={control}
          render={({ field }) => <input {...field} placeholder="Enter Email" />}
        />
        <p>{errors.email?.message}</p>
      </div>
      <div className="formElement">
        <Controller
          name="message"
          control={control}
          render={({ field }) => <textarea {...field} placeholder="Your message..." />}
        />
        <p>{errors.message?.message}</p>
      </div>
      
      <div className="formElement">
      <Button btnText={"Submit"} btnFun={handleSubmit(submitForm)} className="bg-darkPurple text-lightPurple"/>
      </div>

    </form>
  );
};

export default ContactForm;
