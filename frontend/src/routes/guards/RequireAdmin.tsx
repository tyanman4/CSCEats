import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";


export const RequireAdmin: React.FC<{ children: ReactNode }> = ({ children }) => {

    const { isAuthenticated, isAdmin } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/403" replace />
    }

    return <>{children}</>;
};