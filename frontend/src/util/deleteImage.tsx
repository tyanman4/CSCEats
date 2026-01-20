import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

export const deleteImage = async (url: string) => {
  const decodedPath = decodeURIComponent(
    url.split("/o/")[1].split("?")[0]
  );

  const fileRef = ref(storage, decodedPath);
  await deleteObject(fileRef);
};
