import { messaging } from "./config";
import { getToken, onMessage } from "firebase/messaging";

export const requestNotificationPermission = async () => {
  if (Notification.permission === "default") {
    const permission = await Notification.requestPermission();
    console.log("Notification Permission:", permission);
    return permission;
  } else {
    console.log(`Permission already ${Notification.permission}`);
  }
};

export const generateToken = async (userId) => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BMAxrzuChYr-iTnm-wY-x_u_wLlrQbuAI5rAwMVfF1YydAURvL3vpRWQb-eRCzcJJ9RtJCv3okP44v6yYzTNpQo",
    });
    if (token) {
      console.log("FCM Token:", token);
    } else {
      console.error("No token received");
      console.log(userId);
    }
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

export const listenToMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);
    const { title, body } = payload.notification;
    new Notification(title, { body });
  });
};
