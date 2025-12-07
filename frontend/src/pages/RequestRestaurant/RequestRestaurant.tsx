import { useState, useRef } from "react";
import { Header } from "../../components/Header/Header";
import appApi from "../../api/appApi";
import '../../styles/_form.scss';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    // 合計サイズ（25MB）
    const totalSize = fileArray.reduce((acc, f) => acc + f.size, 0);
    if (totalSize > 25 * 1024 * 1024) {
      setMessage("画像の合計サイズは25MB以下にしてください");
      e.target.value = "";
      return;
    }

    for (const file of fileArray) {
      // ファイルごとの 5MB
      if (file.size > 5 * 1024 * 1024) {
        setMessage("ファイルサイズは1つにつき5MB以下にしてください");
        e.target.value = "";
        return;
      }
      // 形式チェック
      if (!allowedTypes.includes(file.type)) {
        setMessage("対応している画像形式は jpg, jpeg, png, webp のみです");
        e.target.value = "";
        return;
      }
    }

    // 問題なければ保存
    setFormData((prev) => ({
      ...prev,
      photos: fileArray,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.address) {
      setMessage("レストラン名と住所は必須です。");
      return;
    }

    try {
      setIsSending(true);
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("address", formData.address);
      formPayload.append("url", formData.url);
      formData.photos.forEach((file) =>  {
        formPayload.append("photos", file);
      });

      const response = await appApi.post("/request-restaurants", formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        setMessage("リクエストが送信されました。");
        setMessageType("success");
        setFormData({ name: "", address: "", url: "", photos: [] });
      } else {
        setMessageType("error");
        setMessage("リクエストの送信に失敗しました。");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("サーバーエラーが発生しました。");
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
          <p className={`form-message ${messageType === "success" ? "success" : "" }`}>{message}</p>
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

          <button type="submit" disabled={isSending} className="form-button">
            {isSending ? "送信中..." : "リクエストを送信"}
          </button>
        </form>
      </div>
    </>
  );
};
