/* eslint-disable react/prop-types */

const ProfileImage = ({imgSrc,className=""}) => {
  return (
    <>
        <img 
        src={imgSrc} 
        alt="profilePhoto"
        className={`w-[40px] h-[40px] rounded-[100%] object-cover ${className}`}
        draggable="false"
        />
    </>
  )
}

export default ProfileImage