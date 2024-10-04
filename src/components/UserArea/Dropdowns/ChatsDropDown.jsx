import { useState, useRef, useEffect } from 'react';
import Button from '../../Common/Button';

const ChatsDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

const handleView = () =>{

}

const handleClearChat = () =>{

}

  return (
    <div className="relative" ref={menuRef}>
      <Button
        btnText={
          <>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </>
        }
        className="border-none text-3xl !py-0"
        btnFun={toggleMenu} // Accepts a function as a parameter
      />

      {isOpen && (
        <div className="absolute text-sm -left-36 min-w-[150px] mt-2 bg-[white] rounded shadow-lg text-[black]">
          <ul className="py-2">
            <li>
            <Button
                    btnText={
                        <>
                        <i className='fa fa-eye'></i>
                        <span className='ml-3'>View User</span>
                        </>
                    }
                    className='border-none'
                    btnFun={handleView}
                />
            </li>
            <li>
                <Button
                    btnText={
                        <>
                        <i className='fa fa-user-minus'></i>
                        <span className='ml-3'>Remove User</span>
                        </>
                    }
                    className='border-none'
                    btnFun={handleClearChat}
                />
            </li>
           
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatsDropDown;
