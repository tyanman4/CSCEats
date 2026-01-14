import { useState } from "react";
import { Header } from "../../components/Header/Header";
import appApi from "../../api/appApi";
import "../../styles/_form.scss";

export const InquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);


    if (!formData.subject || !formData.message) {
      setMessage("件名と内容を入力してください。");
      return;
    }

    if (formData.subject.length < 2) {
      setMessage("件名は2文字以上で入力してください。");
      return;
    }

    if (formData.message.length < 10) {
      setMessage("内容は10文字以上で入力してください。");
      return;
    }

    try {
      setIsSending(true);

      await appApi.post("/inquiries", formData);

      setIsSuccess(true);
      setMessage("お問い合わせを送信しました。");
      setFormData({ subject: "", message: "" });

    } catch (error) {
      console.error(error);
      setMessage("送信に失敗しました。時間を置いて再度お試しください。");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Header />
      <div className="form-page-container">
        <h2 className="form-title">お問い合わせ</h2>
        <p className="form-description">
          ご不明点やご要望があればお気軽にお問い合わせください
        </p>

        {message && (
          <p className={`form-message ${isSuccess ? "success" : ""}`}>
            {message}
          </p>
        )}

        <form className="inquiry-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="subject">件名：</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">内容：</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="form-button"
          >
            {isSending ? "送信中..." : "送信"}
          </button>
        </form>
      </div>
    </>
  );
};
