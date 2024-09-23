import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserArea from "./pages/UserArea";
import { useEffect } from "react";
import initializeAOS from "./animations/aos";

function App() {
  useEffect(() => {
    initializeAOS();
  }, []);

  return (
    <div className="font-serif">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userArea" element={<UserArea />} />
      </Routes>
    </div>
  );
}

export default App;
