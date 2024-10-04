import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Button = ({ btnText, btnFun, path, scrollTo, className = "", disabled = false }) => {
  const handleClick = () => {
    const element = document.getElementById(scrollTo);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Link to={path}>
      <button
        onClick={btnFun ? btnFun : handleClick}
        className={`${className} px-4 py-2 border rounded-lg  text-lightPurple font-semibold`}
        disabled={disabled}
      >
        {btnText}
      </button>
    </Link>
  );
};

export default Button;
