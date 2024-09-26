import Button from "../Common/Button"

const ChatSelected = () => {
  const imgUrl = "https://www.pngkey.com/png/full/73-730434_04-dummy-avatar.png"
  return (
    <>
      <div className="container min-h-[100%]">
        <section className="header flex justify-between items-center border-b p-3">
          <div className="infoContainer flex items-center">
            <div className="imgContainer">
              <img src={imgUrl} alt="pp" className="w-[50px] h-[50px] rounded-[100%] border"/>
            </div>
            <div className="friendName ml-4">
              <h2 className="text-xl">Yuvraj Singh</h2>
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


        <section className="fixed bottom-0 flex">
          <div className="messageInputAndSend flex">

            <input type="text" />
            <Button 
              btnText={
                <>
                  <i className="fa-solid fa-paper-plane"></i>
                </>
              }
            />
          </div>
        </section>
      </div>
    </>
  )
}

export default ChatSelected