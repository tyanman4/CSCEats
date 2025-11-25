import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import appApi from "../../api/appApi";
import '../../styles/_form.scss';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


export const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, logout, isAuthenticated } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");


  // 入力が変更されたとき
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.password) {
      setMessage("ユーザ名とパスワードを入力してください。");
      return;
    }

    if (formData.name.length < 2) {
      setMessage("ユーザ名は2文字以上です。");
      return;
    }

    if (formData.password.length < 4) {
      setMessage("パスワードは4文字以上です。");
      return;
    }

    try {
      setIsSending(true);
      const res = await appApi.post("/login", formData);

      if (res.status === 200) {
        login(res.data.token);
        setMessage(res.data.redirect);
        navigate("/restaurants")
      }
    } catch (error: any) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        setMessage("ログインに失敗しました。");
      } else {
        setMessage("サーバーエラーが発生しました。");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Header />
      <div className="form-page-container">
        <h2 className="form-title">ログイン</h2>
        <p className="form-description">CSCEatsへお帰りなさい！</p>
        
        {message && (
          <p className="form-message">{message}</p>
        )}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">ユーザ名：</label>
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
            <label htmlFor="password">パスワード：</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={isSending} className="form-button">
            {isSending ? "送信中...": "ログイン"}
          </button>
        </form>
        <div className="auth-links">
          <div><a href="register">新規登録</a></div>
          <div>
            <a 
              href="restaurants" 
              onClick={() => logout()}>
                ゲストのまま利用する
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
