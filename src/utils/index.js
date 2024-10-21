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

export const formatTimestamp = (timestamp) => {
  // Create a new Date object from the timestamp
  const date = new Date(timestamp);

  // Get the hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM or PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format the hours and minutes (add leading zero if needed)
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}


