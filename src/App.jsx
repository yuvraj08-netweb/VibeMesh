import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import initializeAOS from "./animations/aos";
import { fetchUserData } from "./reducers/userSlice";
import {
  requestNotificationPermission,
  listenToMessages,
} from "./firebase/notifications";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserArea from "./pages/UserArea";
import NotFound from "./pages/NotFound";
import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Register the service worker with ES module type
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js", { type: "module" }) // Register with module type
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  useEffect(() => {
    initializeAOS();
    dispatch(fetchUserData());

    const initNotifications = async () => {
      const permission = await requestNotificationPermission();
      if (permission === "granted") {
        listenToMessages();
        toast.success("You can now receive notifications!");
      } else if (permission === "denied") {
        toast.error("Enable notifications to receive messages.");
      }
    };

    initNotifications();
  }, [dispatch]);

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
