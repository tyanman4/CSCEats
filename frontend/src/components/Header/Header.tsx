import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Header: React.FC = () => {

  const { logout, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "rgba(248, 249, 250, 1)", zIndex: 1020, position: "sticky", top: 0, padding: ("8px 0px") }}>
      <h3 style={{ margin: "0" }}>CSCEats</h3>
      {isAuthenticated && <button onClick={logout}>ログアウト</button>}
      {isAuthenticated ? <p>ようこそ、{user?.name}さん</p> : <p>ゲストでログイン中</p>}
      {isAuthenticated || <button onClick={() => navigate("/login")}>ログインページへ</button>}
    </div>
  )
}