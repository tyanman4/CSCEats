import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import appApi from "../../api/appApi";
import styles from "./Login.module.scss";

export const Login: React.FC = () => {

    return (
        <>
            <Header />
            <div>
                <h1>CSCEats</h1>
                <p>レストランを探してレビューを投稿しよう！</p>
                <div>
                    <a href="signin.html">ログイン</a>
                    <a href="signup.html">新規登録</a>
                    <a href="list.html">ゲストでログイン</a>
                </div>
            </div>
        </>
    );
};
