import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const uploadImage = async (file: File, status: string, restaurantId: number) => {
  const fileRef = ref(
    storage,
    `restaurants/${status}/${restaurantId}/${Date.now()}_${file.name}`
  );

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return url; // ← これを backend に送る
};
