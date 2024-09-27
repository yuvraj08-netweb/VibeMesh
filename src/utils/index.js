import { auth } from "../firebase/config";

// Helper function to wrap onAuthStateChanged in a Promise
export const getAuthUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("No user is logged in"));
      }
      unsubscribe(); // Clean up the listener
    });
  });
};