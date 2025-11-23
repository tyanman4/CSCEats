import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import appApi from "../../api/appApi";
import styles from "./MyPage.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";



export const MyPage: React.FC = () => {

    const { user, isAuthenticated, login } = useAuth()
    const navigate = useNavigate();

    const [messageIntro, setMessageIntro] = useState("")
    const [messagePassword, setMessagePassword] = useState("")
    const [messageName, setMessageName] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        passwordForName: "",
        password: "",
        passwordRe: "",
        introduction: ""
    });

    const [introductionChanging, setIntroductionChanging] = useState(false)
    const [passwordChanging, setPasswordChanging] = useState(false)
    const [nameChanging, setNameChanging] = useState(false)

    const changing = introductionChanging || passwordChanging || nameChanging

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name ?? "",
                passwordForName: "",
                password: "",
                passwordRe: "",
                introduction: user.introduction ?? ""
            });
        }
    }, [user]);

    useEffect(() => {
        if (!changing) {
            setMessageIntro("")
            setMessagePassword("")
            setMessageName("")
        }
    }, [changing]);


    // フォーム送信時
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (formData.introduction.length > 1024) {
            setMessageIntro("自己紹介が長すぎます。");
            return;
        }

        try {
            const response = await appApi.post("/update/introduction", { introduction: formData.introduction });

            if (response.status === 200) {

                login(localStorage.token)
                setIntroductionChanging(false)

            } else {
                setMessageIntro("登録に失敗しました。");
            }
        } catch (error: any) {
            if (error.response) {
                setMessageIntro("登録に失敗しました。")
            } else {
                setMessageIntro("サーバに接続できません。");
            }

        }
    };


    const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (formData.password.length < 4) {
            setMessagePassword("パスワードは4文字以上にしてください。")
            return
        }

        if (formData.password !== formData.passwordRe) {
            setMessagePassword("パスワードが確認用パスワードと異なります。")
            return
        }

        try {
            const response = await appApi.post("/update/password", { password: formData.password })

            if (response.status === 200) {

                login(localStorage.token)
                setPasswordChanging(false)

            } else {
                setMessagePassword("登録に失敗しました。")
            }
        } catch (error: any) {
            if (error.response) {
                setMessagePassword("登録に失敗しました。")
            } else {
                setMessagePassword("サーバに接続できません。")
            }

        }
    };

    const handleSubmitName = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if (formData.name.length < 2) {
            setMessageName("ユーザ名は2文字以上にしてください。")
            return
        }
        if (formData.passwordForName.length < 4) {
            setMessageName("パスワードは4文字以上にしてください。")
            return
        }
        if (formData.name === user?.name) {
            setNameChanging(false)
            return
        }

        try {
            const response = await appApi.post("/update/name", { name: formData.name, password: formData.passwordForName })

            if (response.status === 200) {

                login(response.data.token);
                setNameChanging(false)

            } else {
                setMessageName("登録に失敗しました。")
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 409) {
                    setMessageName("そのユーザ名は既に存在します。");
                } else {
                    setMessageName("登録に失敗しました。")
                }
            } else {
                setMessageName("サーバに接続できません。");
            }
        }



    }


    // 入力が変更されたとき
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    };


    return (
        <>
            <Header />
            {isAuthenticated &&
                <div className={styles.container}>
                    {user?.role === "admin" && <p>あなたは管理者です</p>}
                    {nameChanging ?
                        <form onSubmit={handleSubmitName}>
                            <p>ユーザ名</p>
                            <div>
                                <label>新しいユーザ名</label>
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
                                    name="passwordForName"
                                    value={formData.passwordForName}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" >確定</button>
                            <button type="button" onClick={() => setNameChanging(false)}>戻る</button>
                            <p>{messageName}</p>
                        </form>
                        :
                        <div>
                            <p>ユーザ名&nbsp;{changing || <button onClick={() => setNameChanging(true)}>変更する</button>}</p>
                            <p>{user?.name}</p>
                        </div>
                    }


                    {passwordChanging ?
                        <form onSubmit={handleSubmitPassword}>
                            <p>パスワード</p>
                            <div>
                                <label>新しいパスワード</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <>　(必須)4文字以上</>
                            </div>
                            <div>
                                <label>新しいパスワード</label>
                                <input
                                    type="password"
                                    name="passwordRe"
                                    value={formData.passwordRe}
                                    onChange={handleChange}
                                />
                                <>　(確認用)</>
                            </div>

                            <button type="submit" >確定</button>
                            <button type="button" onClick={() => setPasswordChanging(false)}>戻る</button>
                            <p>{messagePassword}</p>
                        </form>
                        :
                        <div>
                            <p>パスワード&nbsp;{changing || <button onClick={() => setPasswordChanging(true)}>変更する</button>}</p>
                            <p>********</p>
                        </div>
                    }

                    {introductionChanging ?
                        <form
                            onSubmit={handleSubmit}
                        >
                            <p>自己紹介</p>
                            <div>
                                <textarea
                                    name="introduction"
                                    value={formData.introduction}
                                    onChange={handleChange}
                                />
                            </div>
                            <p>{messageIntro}</p>
                            <button type="submit" >確定</button>
                            <button type="button" onClick={() => setIntroductionChanging(false)}>戻る</button>

                        </form>
                        :
                        <div>
                            <p>自己紹介&nbsp;{changing || <button onClick={() => setIntroductionChanging(true)} >変更する</button>}</p>
                            <p>{user?.introduction}</p>

                        </div>
                    }
                    <button onClick={() => navigate(-1)}>戻る</button>
                </div>

            }

        </>
    );
};
