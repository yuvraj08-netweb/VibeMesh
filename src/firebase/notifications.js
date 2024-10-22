
import { messaging } from "./config";
import { getToken } from "firebase/messaging";

export const requestNotificationPermission = async () => {
  if (Notification.permission === "default") {
    const permission = await Notification.requestPermission();
    console.log("Notification Permission:", permission);
    return permission;
  } else {
    console.log(`Permission already ${Notification.permission}`);
  }
};

export const generateToken = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey:
      import.meta.env.VITE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log("FCM Token:", token);
    } else {
      console.error("No token received");
    }
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};
