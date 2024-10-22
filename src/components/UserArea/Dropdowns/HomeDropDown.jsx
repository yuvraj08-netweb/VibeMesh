import { useState, useRef, useEffect } from "react";
import Button from "../../Common/Button";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../../reducers/userSlice";

const HomeDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () =>{
    dispatch(logOutUser());
  }

  return (
    <div className="relative" ref={menuRef}>
      <Button
        btnText={
          <>
            <i className="fa-solid fa-ellipsis"></i>
          </>
        }
        className="border-none text-3xl !py-0"
        btnFun={toggleMenu} // Accepts a function as a parameter
      />

      {isOpen && (
        <div className="absolute text-sm -left-32 min-w-[150px] mt-3 bg-[white] rounded shadow-2xl text-[black]">
          <ul className="py-2">
            <li>
              <Button
                btnText={
                  <>
                     
                    <i className="fa-brands fa-rocketchat"></i>
                    &nbsp;
                    <span className="ml-3">Chats</span>
                  </>
                }
                path="/userArea"
                className="border-none"
              />
            </li>
            <li>
              <Button
                btnText={
                  <>
                    <i className="fa fa-right-from-bracket"></i>
                    <span className="ml-3">Log out</span>
                  </>
                }
                className="border-none"
                btnFun={handleSignOut}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomeDropDown;
