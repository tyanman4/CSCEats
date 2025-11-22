import styles from "./Header.module.scss";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Header: React.FC = () => {

  const { logout, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.header}>
      <h3 className={styles.title}>CSCEats</h3>
      {isAuthenticated && <button onClick={logout}>ログアウト</button>}
      {isAuthenticated ? <p>ようこそ、{user?.name}さん</p> : <p>ゲストとして利用中</p>}
      {location.pathname !== "/login" && <button onClick={() => navigate("/login")}>ログインページへ</button>}
      {location.pathname !== "/mypage" && isAuthenticated && <button onClick={() => navigate("/mypage")}>マイページへ</button>}
    </div>
  );
};
