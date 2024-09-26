/* eslint-disable react/prop-types */
const GroupCard = ({ groupName, groupAvatar }) => {
    return (
      <>
        <div className="card flex items-center h-[50px]">
          <div className="imgContianer w-[50px]">
            <img src={groupAvatar} alt="profilePhoto" className="w-[50px] h-[50px]  rounded-[100%] border"/>
          </div>
          <div className="friendInfo ml-3">
            <div className="fName mb-1">
              <h4 className="text-xl font-normal">{groupName}</h4>
            </div>
            <div className="lastMessage text-xs text-[#ffffff81]">
              <p>`UserName` :- Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default GroupCard;
  