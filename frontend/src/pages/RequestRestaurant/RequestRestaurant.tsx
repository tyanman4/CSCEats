import { useState } from "react";
import { Header } from "../../components/Header/Header";
import appApi from "../../api/appApi";

export const RequestRestaurant: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: ""
  });

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.address) {
      setMessage("レストラン名と住所を入力してください。");
      return;
    }

    try {
      setIsSending(true);
      const response = await appApi.post("/request-restaurants", formData);

      if (response.status === 200) {
        setMessage("リクエストが送信されました。");
        setFormData({
          name: "",
          address: "",
          description: ""
        });
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
      <div style={{ padding: "160px" }}>
        <h2>レストランリクエストページ</h2>
        <p>このページでは、新しいレストランの追加を依頼できます。</p>

        {message && (
          <p style={{ marginTop: "12px", color: "#d9534f" }}>{message}</p>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <div>
            <label htmlFor="name">レストラン名：</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="address">住所：</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="description">説明：</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={isSending}>
            {isSending ? "送信中..." : "リクエストを送信"}
          </button>
        </form>
      </div>
    </>
  );
};
