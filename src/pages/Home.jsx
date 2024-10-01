import { useSelector } from "react-redux";
import Button from "../components/Common/Button";
import ContactForm from "../components/Forms/ContactForm";
import { useEffect, useState } from "react";
import PageLoader from "../components/Common/PageLoader";

const Home = () => {
  const { isUser, userDetails, loading} = useSelector((state) => state.user);
  const [navOpen, setNavOpen] = useState(false);

  const toggleNavOpen = () => {
    setNavOpen(!navOpen);
  }

  useEffect(() => { }, [isUser, userDetails]);

  return (
    <>
    { !loading ?
    <>
      <div className="navContainer bg-darkPurple py-2 text-lightPurple">
        <nav className="container w-[85%] mx-auto flex justify-between items-center">
          <div className="navLeft">
            <div className="brandLogo max-w-[200px]">
              <img
                src="../../public/assets/logo(s)/VibeMesh-Light.png"
                alt="brandLogo"
                className="w-full"
              />
            </div>
          </div>
          <div className="navCenter sm:block hidden">
            <ul className="flex gap-3">
              <li>
                <Button
                  btnText={"About"}
                  scrollTo="About"
                  className="border-none p-0 "
                />
              </li>
              <li>
                <Button
                  btnText={"Contact"}
                  scrollTo="Contact"
                  className="border-none p-0"
                />
              </li>
            </ul>
          </div>
          <div className="navRight sm:block hidden">
            {!isUser ? (
              <>
                <div className="btnContainer flex gap-5">
                  <Button btnText="Log In" path="/login" />
                  <Button btnText="Sign Up" path="signup" />
                </div>
              </>
            ) : (
              <>
                <div className="userLoggedIn flex items-center gap-2">
                  <div className="userPP">
                    <img
                      src={userDetails.avatar}
                      alt=""
                      className="w-[40px] rounded-[100%]"
                    />
                  </div>
                  <div className="userName">{userDetails.fullName}</div>
                  <div className="chatAreaBtn">
                    <Button
                      btnText={
                        <>
                          Chat &nbsp;
                          <i className="fa-solid fa-chart-area"></i>
                        </>
                      }
                      path="/userArea"
                      className="border-none"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mobileNavToggler sm:hidden block">
            <Button
              btnText={
                <>
                  <i className="fa-solid fa-bars"></i>
                </>
              }
              className="!text-[#fff]"
              btnFun={toggleNavOpen}
            />
          </div>
        </nav>

        {
          navOpen ?
            <div data-aos="fade-right" className="mobileNav fixed left-0 top-0 min-w-[300px] min-h-full bg-darkPurple z-20">
              <div className="w-full text-center mt-10">
                <h2 className="text-3xl">VibeMesh.</h2>
              </div>
              <div className="navLinks mt-10 p-3 flex items-center justify-center">
                <ul className="flex flex-col gap-10">
                  <li>
                    {!isUser ? (
                      ""
                    ) : (
                      <>
                        <div className="userLoggedIn flex flex-col tems-center gap-2">
                          <div className="userInfo flex items-center gap-4">
                            <div className="userPP">
                              <img
                                src={userDetails.avatar}
                                alt=""
                                className="w-[40px] rounded-[100%]"
                              />
                            </div>
                            <div className="userName">{userDetails.fullName}</div>

                          </div>
                        </div>
                      </>
                    )}
                  </li>
                  <li>
                    <Button
                      btnText={"About"}
                      scrollTo="About"
                      className="border-none p-0 "
                    />
                  </li>
                  <li>
                    <Button
                      btnText={"Contact"}
                      scrollTo="Contact"
                      className="border-none p-0"
                    />
                  </li>
                  <li>
                    {!isUser ? (
                      <>
                        <div className="btnContainer flex gap-5">
                          <Button btnText="Log In" path="/login" />
                          <Button btnText="Sign Up" path="signup" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="userLoggedIn flex flex-col tems-center gap-2">

                          <div className="chatAreaBtn">
                            <Button
                              btnText={
                                <>
                                  Go To Chats &nbsp;
                                  <i className="fa-solid fa-chart-area"></i>
                                </>
                              }
                              path="/userArea"
                              className="border-none"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                </ul>
              </div>
            </div>
            : ""
        }
      </div>

      <section className="HeroSection mt-20 min-h-[85vh] flex items-center">
        <div className="container w-[85%] mx-auto flex md:flex-row flex-col justify-center ">
          <div
            className="heroLeft md:w-[50%] flex items-center justify-center"
            data-aos="fade-up"
          >
            <div className="heroInfo w-[80%] mx-auto">
              <div className="upperInfo">
                <span className="text-sm font-semibold">Welcome To</span>
                <h1 className="lg:text-[72px] md:text-[50px] text-4xl font-bold !text-darkPurple my-3">
                  VibeMesh
                </h1>
                <p className="text-sm font-semibold break-words">
                  Weaving seamless connections, one vibe at a time.
                </p>
              </div>
              <div className="lowerInfo max-w-[450px] md:mb-0 mb-16">
                <p className="mt-8 mb-5">
                  Join VibeMesh and experience chat redefined—simple, secure,
                  and built for meaningful conversations.
                </p>
                <Button btnText={"Learn More!"} scrollTo="About" />
              </div>
            </div>
          </div>
          <div
            className="heroRight md:w-[50%] md:block hidden"
            data-aos="fade-left"
          >
            <div className="heroImgContainer">
              <img src="../../public/assets/svg/landing.svg" alt="illustration" />
            </div>
          </div>
        </div>
      </section>

      <section
        className="AboutSection min-h-[100vh] bg-lightPurple flex  items-center md:p-0 py-20"
        id="About"
      >
        <div className="container mx-auto  flex  md:flex-row flex-col items-center">
          <div className="aboutLeft md:w-[50%]">
            <div className="aboutImage w-[80%] m-auto" data-aos="flip-up">
              <img
                src="../../public/assets/svg/about.svg"
                alt="illustration"
                className="w-full"
              />
            </div>
          </div>
          <div className="aboutRight md:w-[50%] md:mt-0 mt-20">
            <div
              className="aboutInfo w-[80%] md:m-0 mx-auto  !text-[#fff]"
              data-aos="fade-down"
            >
              <h1 className="text-4xl font-bold">About Us</h1>
              <p className="my-10 ">
                At VibeMesh, we believe in the power of connection. Our chat
                platform is designed to make conversations seamless, intuitive,
                and fun. Whether you`re catching up with friends, collaborating
                with colleagues, or building new communities, VibeMesh offers a
                secure and vibrant space to share ideas and stay in touch. With
                easy-to-use features, personalized settings, and a focus on user
                privacy, we aim to create an engaging experience where every
                interaction counts. Join the vibe and mesh with the world!
              </p>
              <Button
                btnText={"Get Started!"}
                path={"/signup"}
                className="!text-[#fff]"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="ContactSection min-h-[100vh] flex items-center justify-center"
        id="Contact"
      >
        <div
          className="container mx-auto flex items-center"
          data-aos="zoom-in-down"
        >
          <div className="contactLeft md:w-1/2 w-full flex items-center justify-center">
            <div className="contactInfo w-[80%] mx-auto">
              <h1 className="text-4xl !text-darkPurple font-bold mb-10">
                Contact Us
              </h1>
              <ContactForm />
            </div>
          </div>
          <div className="contactRight  w-1/2 md:block hidden">
            <div className="contactImg w-[80%] mx-auto">
              <img
                src="../../public/assets/svg/contact.svg"
                alt="illustration"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="Footer bg-darkPurple !text-lightPurple">
        <div className="container mx-auto justify-between items-center p-5 py-20 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 text-center">
          <div className="footerLeftOne">
            <div className="footerImg max-w-[300px] mx-auto">
              <img
                src="../../public/assets/logo(s)/VibeMesh-Light.png"
                alt="brandLogo"
                className="w-full"
              />
            </div>
          </div>
          <div className="footerCenterTwo md:mt-0 mt-10">
            <h3 className="mb-8 border-b-2 max-w-max mx-auto">Usefull Links</h3>
            <ul>
              <li>
                <Button
                  btnText={"LogIn"}
                  path={"/login"}
                  className="border-none p-0 "
                />
              </li>
              <li>
                <Button
                  btnText={"SignUp"}
                  path={"/signup"}
                  className="border-none p-0 "
                />
              </li>
            </ul>
          </div>
          <div className="footerCenterThree lg:mt-0 mt-10">
            <h3 className="mb-8 border-b-2 max-w-max mx-auto">Page Links</h3>
            <ul>
              <li>
                <Button
                  btnText={"About"}
                  scrollTo="About"
                  className="border-none p-0 "
                />
              </li>
              <li>
                <Button
                  btnText={"Contact"}
                  scrollTo="Contact"
                  className="border-none p-0"
                />
              </li>
            </ul>
          </div>
          <div className="footerRight lg:h-full lg:mt-0 mt-10">
            <h3 className="mb-8 border-b-2 max-w-max mx-auto">Socials</h3>
            <div className="socialIcons flex justify-center gap-5">
              <div className="socialIcon">
                <i className="fa fa-facebook"></i>
              </div>
              <div className="socialIcon">
                <i className="fa fa-instagram"> </i>
              </div>
              <div className="socialIcon">
                <i className="fa fa-telegram"></i>
              </div>
              <div className="socialIcon">
                <i className="fa fa-x"> </i>
              </div>
              <div className="socialIcon">
                <i className="fa fa-youtube"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </> : <PageLoader/>
    }
    </>
  );
};

export default Home;
