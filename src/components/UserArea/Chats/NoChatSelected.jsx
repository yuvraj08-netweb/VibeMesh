const NoChatSelected = () => {
  return (
    <>
        <div className="container mx-auto flex flex-col items-center justify-center w-[80%] h-full">
            <div className="imgContainer max-w-[500px]">
                <img src="/assets/svg/noChatSelected.svg" alt="" draggable="false"/>
            </div>
            <div className="textContainer mt-10">
                <h2 className="text-4xl max-w-[500px] text-center">Select a chat to display here</h2>
            </div>
        </div>
    </>
  )
}

export default NoChatSelected