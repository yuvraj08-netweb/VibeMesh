import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

async function Upload(imageUpload) {
  if (imageUpload == null) return;

  const imageRef = ref(storage, `images/${imageUpload.name}`);

  try {
    // Upload the image
    const snapshot = await uploadBytes(imageRef, imageUpload);

    // Get the download URL
    const url = await getDownloadURL(snapshot.ref);

    console.log(url);  // Log the URL if you want to check it
    return url;  // Return the URL after getting it
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;  // Optionally handle or throw errors
  }
}

export default Upload;
