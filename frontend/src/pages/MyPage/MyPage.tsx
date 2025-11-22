import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import appApi from "../../api/appApi";
import styles from "./MyPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


export const MyPage: React.FC = () => {

    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

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
        setIntroductionChanging(false)
        e.preventDefault();
        // if (!formData.name || !formData.password) {
        //     setMessage("ユーザ名とパスワードを入力してください。");
        //     return;
        // }

        // if (formData.name.length < 2) {
        //     setMessage("ユーザ名は2文字以上にしてください。");
        //     return;
        // }

        // if (formData.password.length < 4) {
        //     setMessage("パスワードは4文字以上にしてください。");
        //     return;
        // }

        // if (formData.password !== formData.password_re) {
        //     setMessage("パスワードが確認用パスワードと異なります。");
        //     return;
        // }

        try {
            const response = await appApi.post("/save", formData);

            if (response.status === 200) {
                //login(response.data.token);
                //navigate(response.data.redirect)

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
