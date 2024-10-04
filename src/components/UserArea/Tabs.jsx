import { useEffect, useState } from "react";
import FriendsCard from "./Cards/FriendsCard";
import GroupCard from "./Cards/GroupCard";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { setUserChats,setUserGroups } from "../../reducers/userSlice";

const Tabs = () => {
  const [openTab, setOpenTab] = useState("chat");
  const {userDetails,} = useSelector(state=>state.user)
  const[chats,setChats] = useState([])
  const [groups,setGroups] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "UsersChat", userDetails.id), async (res) => {
      const { chats = [], groups = [] } = res.data() || {};
  
      // Fetching user data for chats
      const chatPromises = chats.map(async (item) => {
        const userDocRef = doc(db, "Users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);
        const user = userDocSnap.data();
        return { ...item, user };
      });
  
      // Fetching user data for groups (if necessary)
      const groupPromises = groups.map(async (group) => {
        const groupDocRef = doc(db, "Groups", group.groupId); // Assuming you have a "Groups" collection
        const groupDocSnap = await getDoc(groupDocRef);
        const groupData = groupDocSnap.data();
  
        return { ...group, groupData };
      });
  
      // Resolve all promises
      const chatData = await Promise.all(chatPromises);
      const groupData = await Promise.all(groupPromises);
  
      // Dispatch user chats and groups separately, or merge as needed
      dispatch(setUserChats(chatData));
      dispatch(setUserGroups(groupData))
      // Optionally sort and set the combined data by updatedAt
      setChats(chatData);
      setGroups(groupData);
    });
  
    return () => {
      unSub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails.id]);
  

  const switchTab = (tab) => {
    setOpenTab(tab);
  };
  
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          {/* Tabs For Switching Between Single Chat And Group Chat */}
          <ul
            className="flex list-none flex-wrap flex-row border-b"
            role="tablist"
          >
            {/* Single Chat */}
            <li className="flex-auto text-center border-r">
              <a
                className={
                  "text-lg font-bold uppercase py-3 shadow-lg rounded block leading-normal " +
                  (openTab === "chat" ? `text-[#b6b4eb]` : ` text-[#7c7c7c]`)
                }
                onClick={(e) => {
                  e.preventDefault();
                  switchTab("chat");
                }}
                data-toggle="tab"
                href="#singleChat"
                role="tablist"
              >
                <i className="fa fa-user"></i>
              </a>
            </li>
            {/* Group Chat */}
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-lg font-bold uppercase py-3 shadow-lg rounded block leading-normal " +
                  (openTab === "group" ? `text-[#b6b4eb]` : ` text-[#7c7c7c]`)
                }
                onClick={(e) => {
                  e.preventDefault();
                  switchTab("group");
                }}
                data-toggle="tab"
                href="#groupChat"
                role="tablist"
              >
                <i className="fa fa-users"></i>
              </a>
            </li>
          </ul>

          {/* Actual Content To Show In The Tabs */}
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {/* Content For Single Chat */}
                <div
                  className={openTab === "chat" ? "block" : "hidden"}
                  id="singleChat"
                >
                  {/* display all available chats */}
                  <div className="friendsCol">
                    {
                      chats.length>0 ?
                      
                      chats.map((chat)=>{
                          
                          return (
                            <FriendsCard 
                            friend = {chat}
                            key={chat.chatId}
                          />
                          )
                        })
                      
                       : (
                        <p className="text-[#fff]">No Friends To Show</p>
                      )
                    }
                  </div>
                </div>
                {/* Content For The Group Chat */}
                <div
                  className={openTab === "group" ? "block" : "hidden"}
                  id="groupChat"
                >
                   {
                      groups.length>0 ?
                      
                      groups.map((group,idx)=>{
                          
                          return (
                              <GroupCard 
                                groupInfo={group}
                                key={idx}
                              />
                          )
                        })
                      
                       : (
                        <p className="text-[#fff]">No Groups Created Or Joined</p>
                      )
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
