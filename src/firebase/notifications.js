import { doc, updateDoc } from "firebase/firestore";
import { db, messaging } from "./config";
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

export const generateToken = async (userID) => {
  try {
    const registration = await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey:
        "BDtLUw5583Y5Mnhgs9ZbohBxNA1HMY2EjYoqwkNzKZqUdbFuflUfOwoNg12HePZfNx_2eF-fmcdjiqia70WtbZQ",
      serviceWorkerRegistration: registration,
    });

    if (token) {

      const userIdRef = doc(db, "Users", userID);

      await updateDoc(userIdRef, {
        FCM_Token: token,
      });  

      console.log("FCM Token:", token);
    } else {
      console.error("No token received");
    }
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};
