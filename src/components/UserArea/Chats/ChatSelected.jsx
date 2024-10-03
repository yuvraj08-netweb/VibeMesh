import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../../reducers/userSlice";
import Button from "../../Common/Button";
import Message from "../Messages/Message";
import { useEffect, useRef, useState } from "react";
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import NoMessage from "../Messages/NoMessage";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ChatSelected = () => {
  const schema = yup.object().shape({
    message: yup.string().min(1, "Please Provide Some Value"),
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
      message: "", // Default value for fullName
    },
  });

  const [chat, setChat] = useState([]);
 
  const endRef = useRef(null);

  const dispatch = useDispatch();

  const { selectedChat, userDetails } = useSelector((state) => state.user);
  
  const selectedUser = selectedChat.user;

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", selectedChat.chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unsub();
    };
  }, [selectedChat.chatId]);

  const handleBack = () => {
    dispatch(setSelectedChat(null));
  };

//   const handleLastMessage = async (message) =>{
//     try {
//       const userChatRef = doc(db, "UsersChat", selectedChat.user.id);
//       const userChatTwoRef = doc(db, "UsersChat", userDetails.id);

//       const newData = {lastMessage: message,updatedAt: Date.now(),}
  
//       const userChatSnapshot = await getDoc(userChatRef);
//       const userChatTwoSnapshot = await getDoc(userChatTwoRef);
      
//       console.log(userChatSnapshot,userChatTwoSnapshot,"SnapShots");
      

// // Deep clone to avoid accidental mutations
//  // Clean up any unexpected data here
//  let chatsArray = userChatSnapshot.data().chats || [];
//  let chatsArrayTwo = userChatTwoSnapshot.data().chats || [];
// // If any invalid object is present, remove it
// chatsArray = chatsArray.filter(chat => chat.chatId);
// chatsArrayTwo = chatsArrayTwo.filter(chat => chat.chatId);

// console.log(chatsArray, chatsArrayTwo, "ChatArray ONE AND TWO");
      
//       const chatIndex = chatsArray.findIndex(chat=> chat.chatId === selectedChat.chatId);
//       const chatIndexTwo = chatsArrayTwo.findIndex(chat=> chat.chatId === userDetails.chatId);
  
//       console.log(chatIndex,chatIndexTwo,"ChatIndexes");
      
//       chatsArray[chatIndex] = {...chatsArray[chatIndex], ...newData};
      
//       chatsArrayTwo[chatIndexTwo] = {...chatsArrayTwo[chatIndexTwo], ...newData};
      

//       console.log(chatsArray[chatIndex],chatsArrayTwo[chatIndexTwo]);
      
//       await updateDoc(userChatRef,{
//         chats: chatsArray,
//       })
//       // await updateDoc(userChatTwoRef,{
//       //   chats: chatsArray,
//       // })
  
//       console.log(message);
//     } catch (error) {
//       console.log(error);
      
//     }
   
    
//   }

  const handleSend = async (data) => {
    const chatsRef = collection(db, "chats");
    const newChatDocRef = doc(chatsRef, selectedChat.chatId);

    await updateDoc(newChatDocRef, {
      messages: arrayUnion({
        messageId: userDetails.id + "_" + selectedUser.id,
        createdAt: Date.now(),
        messageText: data.message,
        messageSeen: false,
      }),
    }).then(() => {
      reset();
    });

    // handleLastMessage(data.message)
  };

  useEffect(() => {
    if (chat?.messages?.length)
      endRef.current.scrollIntoView({
        top: endRef.current.scrollHeight,
        behavior: "smooth",
        // block: "end",
      });
  }, [chat.messages]);

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
                src={selectedUser.avatar}
                alt="pp"
                className="w-[50px] h-[50px] rounded-[100%] border"
              />
            </div>
            <div className="friendName ml-4">
              <h2 className="text-xl">{selectedUser.fullName}</h2>
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
        <section className="chatArea py-20">
          <div className="messagesContainer max-h-[68vh] overflow-y-scroll p-5 ">
            <ul className="">
              <li className="">
                {chat?.messages?.length > 0 ? (
                  chat?.messages?.map((message, index) => {
                    return <Message key={index} message={message} />;
                  })
                ) : (
                  <NoMessage />
                )}
              </li>
            </ul>
            <div ref={endRef}></div>
          </div>
        </section>

        {/* Send Message Section */}
        <section className="fixed bottom-0 w-[-webkit-fill-available] p-3 border-t z-50">
          <div
            className="messageInputAndSend 
             w-[-webkit-fill-available]
          "
          >
            <form className="flex justify-between items-center w-[80%] mx-auto">
              <div className="w-[80%] mx-auto">
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Type Your Message..."
                      className="text-[#000] overflow-auto max-h-[100px] min-h-[50px] outline-none"
                    />
                  )}
                />
                <p className="errorPara">{errors.emailId?.message}</p>
              </div>

              <Button
                btnText={
                  <>
                    SEND
                    <i className="fa-solid fa-paper-plane"></i>
                  </>
                }
                className="ml-5 flex gap-2 text-sm bg-lightPurple !text-darkPurple"
                btnFun={handleSubmit(handleSend)}
              />
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default ChatSelected;
