import styles from "./Header.module.scss";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Header: React.FC = () => {

  const { logout, user, isAuthenticated } = useAuth();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <div className={styles.header}>
      <h3 className={styles.title} onClick={() => navigate("/restaurants")}>CSCEats</h3>
      <div className={styles.right}>

        {isAuthenticated ? <p>ようこそ、{user?.name}さん</p> : <p>ゲストとして利用中</p>}
        {isAdmin && <button className={styles.button} onClick={() => navigate("/request-restaurants")}>リクエスト承認ページ</button>}
        {!isAuthenticated && location.pathname !== "/login" && <button className={styles.button} onClick={() => navigate("/login")}>ログイン</button>}
        {location.pathname !== "/mypage" && isAuthenticated && <button className={styles.button} onClick={() => navigate("/mypage")}>マイページ</button>}
        {isAuthenticated && <button onClick={logout} className={styles.button}>ログアウト</button>}
      </div>
    </div>
  );
};
