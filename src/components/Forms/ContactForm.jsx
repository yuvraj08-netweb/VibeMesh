import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import Button from "../Common/Button";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { useState } from "react";

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
    message: yup.string().required("Please Enter Your Message!"),
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

  const [loading,setLoading] = useState(false)

  const sendEmail = async (data) => {
    setLoading(true)
    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID, // Replace with your EmailJS service ID
        import.meta.env.VITE_EMAIL_CONTACT_TEMPLATE_ID, // Replace with your EmailJS template ID
        data,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY // Replace with your EmailJS user ID
      );
      console.log("Email sent successfully:", response.status, response.text);
      toast.success("Thank you for reaching out! We'll get back to you soon.");
      reset();
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false)
  };

  const submitForm = (formData) => {
    sendEmail(formData);
    reset();
  };
  return (
    <form className="max-w-[450px]">
      <div className="formElement">
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="Enter Full Name" />
          )}
        />
        <p className="errorPara">{errors.fullName?.message}</p>
      </div>
      <div className="formElement">
        <Controller
          name="email"
          control={control}
          render={({ field }) => <input {...field} placeholder="Enter Email" />}
        />
        <p className="errorPara">{errors.email?.message}</p>
      </div>
      <div className="formElement">
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <textarea {...field} placeholder="Your message..." />
          )}
        />
        <p className="errorPara">{errors.message?.message}</p>
      </div>

      <div className="formElement">
        <Button
          btnText={
            loading ? 
            <>
              <span>Sending <i className="fa fa-spinner"></i></span>
            </> :  
            "Submit"
          }
          btnFun={handleSubmit(submitForm)}
          className="bg-darkPurple text-lightPurple"
        />
      </div>
    </form>
  );
};

export default ContactForm;
