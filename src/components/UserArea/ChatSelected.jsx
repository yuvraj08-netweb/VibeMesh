import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../reducers/userSlice";
import Button from "../Common/Button";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import NoMessage from "./NoMessage";

const ChatSelected = () => {
  const dispatch = useDispatch();

  const { selectedChat } = useSelector((state) => state.user);
 
  const [chat,setChat] = useState();

  const handleBack = () => {
    dispatch(setSelectedChat(null));
  };

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({behaviour:"smooth"});
  }, []);

  useEffect(()=>{
    const unsub = onSnapshot(doc(db,"chats","jgxYkqGGRliinc3FfZej"),(res)=>{
      setChat(res.data())
    })
    
    return () =>{
      unsub();
    }
  },[])
 
  console.log(chat,"chat");
  
  return (
    <>
      <div className="min-h-[100%]" data-aos="zoom-in-up">
        {/* Header Setion */}
        <section className=" fixed top-0 header w-[-webkit-fill-available] flex justify-between items-center border-b p-3 ">
          <div className="infoContainer flex items-center">
            <Button
              btnText={
                <>
                  <i className="fa fa-arrow-left"></i>
                </>
              }
              className="!text-[#fff] border-none"
              btnFun={handleBack}
            />
            <div className="imgContainer">
              <img
                src={selectedChat.avatar}
                alt="pp"
                className="w-[50px] h-[50px] rounded-[100%] border"
              />
            </div>
            <div className="friendName ml-4">
              <h2 className="text-xl">{selectedChat.fullName}</h2>
            </div>
          </div>
          <Button
            btnText={
              <>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </>
            }
            className="border-none text-3xl !py-0"
          />
        </section>

        {/* Chat Area */}
        <section className="chatArea py-20 ">
          <div className="messagesContainer max-h-[69vh] overflow-y-scroll p-5">
            <ul className="">
              <li className="">
                { 
                chat !== undefined ?
                chat.messages.map((message, index) => {
                  return <Message key={index} message={message} />;
                })
              : <NoMessage/>
              }
              </li>
            </ul>
            <div ref={endRef}></div>
          </div>
        </section>

        {/* Send Message Section */}
        <section className="fixed bottom-0 flex w-[-webkit-fill-available] p-3 border-t z-50">
          <div className="messageInputAndSend flex justify-between w-[80%] mx-auto items-center">
            <input
              type="text"
              placeholder="Type Your Message..."
              className="text-[#000] overflow-auto max-h-[100px] min-h-[50px] outline-none"
            />
            <Button
              btnText={
                <>
                  SEND
                  <i className="fa-solid fa-paper-plane"></i>
                </>
              }
              className="ml-5 flex gap-2 text-sm bg-lightPurple !text-darkPurple"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default ChatSelected;
