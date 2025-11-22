import { useState } from "react";
import { Header } from "../../components/Header/Header";
import appApi from "../../api/appApi";
import '../../styles/_form.scss';

export const RequestRestaurant: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    image: null as File | null
  });

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
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
      formPayload.append("description", formData.description);
      if (formData.image) {
        formPayload.append("image", formData.image);
      }

      const response = await appApi.post("/request-restaurants", formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        setMessage("リクエストが送信されました。");
        setFormData({ name: "", address: "", description: "", image: null });
      } else {
        setMessage("リクエストの送信に失敗しました。");
      }
    } catch (error) {
      console.error(error);
      setMessage("サーバーエラーが発生しました。");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Header />
      <div className="form-page-container">
        <h2 className="form-title">レストランリクエストページ</h2>
        <p className="form-description">おすすめのお店、教えてください！</p>

        {message && (
          <p className="form-message">{message}</p>
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
            <label htmlFor="description">説明：</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
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
              onChange={handleFileChange}
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
