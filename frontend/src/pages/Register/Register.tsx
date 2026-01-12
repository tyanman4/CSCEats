import { useState } from "react";
import { Header } from "../../components/Header/Header";
import appApi from "../../api/appApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password_re: "",
    introduction: ""
  });

  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // 入力が変更されたとき
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const passwordRegex = /^[\x21-\x7E]{4,}$/;
  //空白や全角英数字は不可
  const usernameRegex = /^[a-zA-Z0-9ぁ-んァ-ヶ一-龠々・ー_-]{2,}$/;

  // フォーム送信時
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.password) {
      setMessage("ユーザ名とパスワードを入力してください。");
      return;
    }

    if (!usernameRegex.test(formData.name)) {
      setMessage("ユーザ名は2文字以上で、使用できない文字を含めないでください。");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setMessage("パスワードは4文字以上で、英数字・記号（半角）を使用してください。");
      return;
    }

    if (formData.password !== formData.password_re) {
      setMessage("パスワードが確認用パスワードと異なります。");
      return;
    }

    try {
      setIsSending(true);
      const response = await appApi.post("/save", formData);
      if (response.status === 200) {
        login(response.data.token);
        navigate("/restaurants")
      } else {
        setMessage("登録に失敗しました。");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 409) {
          setMessage("そのユーザ名は既に存在します。");
        } else {
          setMessage("登録に失敗しました。")
        }
      } else {
        setMessage("サーバに接続できません。");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Header />
      <div className="register-page form-page-container">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">新規登録</h2>
          <p
            className="form-description"
          >
            あなたの”美味しい”を共有しよう！
          </p>
          {message && (
            <p className="form-message">{message}</p>
          )}

          <div className="form-group">
            <label htmlFor="name">ユーザ名（必須）：</label>
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
            <label htmlFor="password">パスワード（必須）：</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_re">パスワード確認（必須）：</label>
            <input
              type="password"
              id="password_re"
              name="password_re"
              value={formData.password_re}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="introduction">自己紹介：</label>
            <input
              type="text"
              id="introduction"
              name="introduction"
              value={formData.introduction}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={isSending} className="form-button">
            {isSending ? "送信中..." : "新規登録"}
          </button>
        </form>
        <div className="auth-links">
          <div><a href="/login">ログイン</a></div>
          <div><a
            href="restaurants"
            onClick={() => logout()}
          >
            ゲストのまま利用する
          </a></div>
        </div>
      </div>
    </>
  );
};
