import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import appApi from "../../api/appApi";
import styles from "./Register.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


export const Register: React.FC = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        introduction: ""
    });
    const { login } = useAuth();

    const [message, setMessage] = useState("");

    // 入力が変更されたとき
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // フォーム送信時
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || !formData.password) {
            setMessage("ユーザ名とパスワードを入力してください。");
            return;
        }

        if (formData.name.length < 2) {
            setMessage("ユーザ名は2文字以上にしてください。");
            return;
        }

        if (formData.password.length < 4) {
            setMessage("パスワードは4文字以上にしてください。");
            return;
        }

        try {
            const response = await appApi.post("/save", formData);

            if (response.status === 200) {
                login(response.data.token);
                navigate(response.data.redirect)

            } else {
                setMessage("登録に失敗しました。");
            }
        } catch (error) {
            console.error(error);
            setMessage("サーバーエラーが発生しました。");
        }
    };

    return (
        <>
            <Header />
            <div>
                <form
                    onSubmit={handleSubmit}
                >
                    <h2>新規登録</h2>

                    <div>
                        <label>ユーザ名</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}

                        />
                        <>　(必須)2文字以上</>
                    </div>

                    <div>
                        <label>パスワード</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <>　(必須)4文字以上</>
                    </div>

                    <div>
                        <label>自己紹介</label>
                        <input
                            type="text"
                            name="introduction"
                            value={formData.introduction}
                            onChange={handleChange}
                        />
                        <>　(任意)</>
                    </div>

                    <button
                        type="submit"
                    >
                        新規登録
                    </button>

                    {message && (
                        <p>{message}</p>
                    )}
                </form>
            </div>
        </>
    );
};
