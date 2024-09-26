import { useState } from "react";

const Tabs = () => {
  const [openTab, setOpenTab] = useState("chat");
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
            {/* Tabs For Switching Between Single Chat And Group Chat */}
          <ul className="flex list-none flex-wrap flex-row border-b" role="tablist">
            {/* Single Chat */}
            <li className="flex-auto text-center border-r">
              <a className={ "text-lg font-bold uppercase py-3 shadow-lg rounded block leading-normal " +
                  (openTab === "chat" ? `text-[#b6b4eb]` : ` text-[#7c7c7c]`)
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab("chat");
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
              <a className={"text-lg font-bold uppercase py-3 shadow-lg rounded block leading-normal " +
                  (openTab === "group" ? `text-[#b6b4eb]` : ` text-[#7c7c7c]`)
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab("group");
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
                <div className={openTab === "chat" ? "block" : "hidden"} id="singleChat">
                  {/* display all available chats */}
                  <div className="friendsCol">
                    <p>No Friends To Show</p>
                  </div>
                </div>
                {/* Content For The Group Chat */}
                <div className={openTab === "group" ? "block" : "hidden"} id="groupChat">
                  <p>No Groups To Show</p>
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
