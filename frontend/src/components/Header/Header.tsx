import styles from "./Header.module.scss";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import appApi from "../../api/appApi";
import { useEffect, useState } from "react";

export const Header: React.FC = () => {

  const { logout, user, isAuthenticated } = useAuth();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const [isAllRead, setIsAllRead] = useState<boolean>(true)

  useEffect((() => {
    appApi.get(`notifications/user/${user?.id}/all-read`)
      .then((r) => {
        setIsAllRead(r.data)
      })
      .catch((err) => console.error(err))
  }), [])




  return (
    <div className={styles.header}>
      <h3 className={styles.title} onClick={() => navigate("/restaurants")}>CSCEats</h3>
      <div className={styles.right}>

        {isAuthenticated ? <p>ようこそ &nbsp;<span className={`${styles.toUserDetail} ${isAllRead ? "" : styles.unreadSign}`} onClick={() => navigate(`/user-detail/${user?.id}`)}>{user?.name}</span>さん</p> : <p>ゲストとして利用中</p>}
        {isAdmin && <button className={`${styles.button} ${styles.admin}`} onClick={() => navigate("/request-restaurants")}>リクエスト承認ページ</button>}
        {isAdmin && <button className={`${styles.button} ${styles.admin}`} onClick={() => navigate("/restaurants-for-update")}>レストラン管理ページ</button>}
        {!isAuthenticated && location.pathname !== "/login" && <button className={styles.button} onClick={() => navigate("/login")}>ログイン</button>}
        {isAuthenticated && <button onClick={() => navigate("/inquiry/form")} className={styles.button}>お問い合わせ</button>}
        {isAuthenticated && <button className={styles.button} onClick={() => navigate("/restaurants/request")}>レストランのリクエスト</button>}
        {isAuthenticated && <button onClick={handleLogout} className={styles.button}>ログアウト</button>}
      </div>
    </div>
  );
};
