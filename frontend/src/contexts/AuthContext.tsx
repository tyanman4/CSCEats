import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import appApi from "../api/appApi";
import { useNavigate } from "react-router-dom";


type User = {
    name: string;
    introduction: string;
    role: string;
} | null; //ログアウト時はnull

type AuthContextType = {
    user: User;
    token: string | null;
    login: (token: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean
};

//コンテキスト作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(null);
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );
    //tokenが存在すればtrue
    const isAuthenticated = !!token;

    const isAdmin = user?.role === "admin"

    //プロフィール取得関数
    const fetchProfile = async (jwt: string) => {
        try {

            const res = await appApi.get("/users/me", {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            const userData: User = {
                name: res.data.name,
                introduction: res.data.introduction,
                role: res.data.role
            };
            setUser(userData);
        } catch (err) {
            console.error("プロフィール取得エラー:", err);
            logout();
        }
    };

    const login = async (jwt: string) => {
        localStorage.setItem("token", jwt);
        setToken(jwt);
        await fetchProfile(jwt);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    useEffect(() => {
        if (token) {
            fetchProfile(token);
        }
    }, [token]);

    return (
        //子孫要素はvalueを共有利用できる。
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    //Provider内で使わないとエラー
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
