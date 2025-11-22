import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import appApi from "../../api/appApi";
import styles from "./MyPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


export const MyPage: React.FC = () => {

    const navigate = useNavigate();
    const { user, isAuthenticated, login } = useAuth();

    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        password: "",
        password_re: "",
        introduction: ""
    });

    const [introductionChanging, setIntroductionChanging] = useState(false)

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name ?? "",
                password: "",
                password_re: "",
                introduction: user.introduction ?? ""
            });
        }
    }, [user]);


    // フォーム送信時
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (formData.introduction.length > 1024) {
            setMessage("自己紹介が長すぎます。");
            return;
        }

        try {
            const response = await appApi.post("/save/introduction", { introduction: formData.introduction });

            if (response.status === 200) {

                login(localStorage.token)
                setIntroductionChanging(false)

            } else {
                setMessage("登録に失敗しました。");
            }
        } catch (error: any) {
            if (error.response) {
                setMessage("登録に失敗しました。")
            } else {
                setMessage("サーバに接続できません。");
            }

        }
    };


    // 入力が変更されたとき
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    return (
        <>
            <Header />
            {isAuthenticated &&
                <div className={styles.container}>
                    <p>ユーザ名</p>
                    <p>{user?.name}</p>
                    <p>パスワード</p>
                    <p>********</p>

                    {introductionChanging ?
                        <form
                            onSubmit={handleSubmit}
                        >
                            <p>自己紹介</p>
                            <div>
                                <input
                                    type="text"
                                    name="introduction"
                                    value={formData.introduction}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" >確定</button>
                            {message}
                        </form>

                        :
                        <div>
                            <p>自己紹介&nbsp;<button onClick={() => setIntroductionChanging(true)} >変更する</button></p>
                            <p>{user?.introduction}</p>

                        </div>
                    }
                </div>
            }
        </>
    );
};
