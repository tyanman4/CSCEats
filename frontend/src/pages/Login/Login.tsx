import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import appApi from "../../api/appApi";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


export const Login: React.FC = () => {

    const navigate = useNavigate();
    const { login, logout, isAuthenticated } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/restaurants")
        }
    }, [isAuthenticated]);


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
        }
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
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
                    <div><a
                        href="restaurants"
                        onClick={() => logout()}
                    >ゲストとして利用する</a></div>
                </div>
            </div>
        </>
    );
};
