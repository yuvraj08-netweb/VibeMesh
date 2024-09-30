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
import { useDispatch } from "react-redux";
import { fetchUserData } from "./reducers/userSlice";
import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    initializeAOS();
    dispatch(fetchUserData());
  },[dispatch]);

  return (
    <div className="font-serif">
      <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<PrivateLayout />}>
          <Route path="/userArea" element={<UserArea />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
