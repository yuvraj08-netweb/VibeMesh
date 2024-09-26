import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserArea from "./pages/UserArea";
import { useEffect } from "react";
import initializeAOS from "./animations/aos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";

function App() {
  useEffect(() => {
    initializeAOS();
  }, []);

  return (
    <div className="font-serif">
      <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userArea" element={<UserArea />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
