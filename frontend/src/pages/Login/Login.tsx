import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import appApi from "../../api/appApi";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        password: "",
    });

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
            setMessage("ユーザ名は2文字以上にしてください。");
            return;
        }

        if (formData.password.length < 4) {
            setMessage("パスワードは4文字以上にしてください。");
            return;
        }

        try {
            // APIにPOST送信（appApiを使う場合）
            const response = await appApi.post("http://localhost:8080/api/login", formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                //setMessage(`ようこそ、${formData.name}さん！`);
                localStorage.setItem("token", response.data.token)
                setMessage(response.data.token);
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
                <h1>CSCEats</h1>
                <p>レストランを探してレビューを投稿しよう！</p>
                <form
                    onSubmit={handleSubmit}
                >

                    <div>
                        <label>ユーザ名</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}

                        />
                    </div>

                    <div>
                        <label>パスワード</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                    >
                        ログイン
                    </button>

                    {message && (
                        <p>{message}</p>
                    )}
                </form>
                <div>
                    <div><a href="register">新規登録</a></div>
                    <div><a href="restaurants">ゲストでログイン</a></div>
                </div>
            </div>
        </>
    );
};
