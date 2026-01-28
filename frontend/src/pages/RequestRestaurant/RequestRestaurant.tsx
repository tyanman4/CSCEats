import { useState, useRef } from "react";
import { Header } from "../../components/Header/Header";
import { uploadImage } from "../../util/uploadImage";
import { deleteImage } from "../../util/deleteImage";
import { useAuth } from "../../contexts/AuthContext";
import { signInAnonymously } from "firebase/auth";
import { firebaseAuth } from "../../firebase";
import appApi from "../../api/appApi";
import '../../styles/_form.scss';

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export const RequestRestaurant: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    url: "",
    photos: [] as File[]
  });

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isAuthenticated } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFormData(prev => ({
      ...prev,
      photos: Array.from(e.target.files!),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.address) {
      setMessageType("error");
      setMessage("レストラン名と住所は必須です");
      return;
    }

    let imageUrls: string[] = [];

    try {
      setIsSending(true);

      const res = await appApi.post("/request-restaurants", {
        name: formData.name,
        address: formData.address,
        url: formData.url,
      });

      // firebase匿名ログイン
      if (!firebaseAuth.currentUser) {
        await signInAnonymously(firebaseAuth);
      }

      // 画像をfirebaseにアップロード
      imageUrls = await Promise.all(
        formData.photos.map(file => uploadImage(file, "pending", res.data.data.requestRestaurantId, "request"))
      );

      // 画像URLを backend に送信
      if (imageUrls.length > 0) {
        await appApi.post(`/restaurants/pending/${res.data.data.requestRestaurantId}/photos`, {
          imageUrls: imageUrls,
        });
      }

      setMessageType("success");
      setMessage("リクエストを送信しました");
      setFormData({ name: "", address: "", url: "", photos: [] });
      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch {
      await Promise.all(
        imageUrls.map(url => deleteImage(url))
      );
      setMessageType("error");
      setMessage("送信に失敗しました");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Header />
      <div className="form-page-container">
        <h2 className="form-title">レストランリクエスト</h2>
        <p className="form-description">おすすめのお店、教えてください！</p>

        {message && (
          <p className={`form-message ${messageType === "success" ? "success" : ""}`}>{message}</p>
        )}

        <form className="request-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">レストラン名（必須）：</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">住所（必須）：</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">URL:</label>
            <input
              type="text"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">レストランの写真：</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>

          <button type="submit" disabled={isSending || !isAuthenticated} className="form-button">
            {!isAuthenticated ? "ログインしてください" : isSending ? "送信中..." : "リクエストを送信"}
          </button>
        </form>
      </div>
    </>
  );
};
