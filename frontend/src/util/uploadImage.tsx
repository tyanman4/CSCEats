import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const uploadImage = async (
  file: File,
  status: "pending" | "approved" | "rejected",
  restaurantId: number,
  type: "request" | "approved"
) => {
  const idPrefix = type === "request" ? "r_" : "a_";

  const fileRef = ref(
    storage,
    `restaurants/${status}/${idPrefix}${restaurantId}/${Date.now()}_${file.name}`
  );

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return url;
};
