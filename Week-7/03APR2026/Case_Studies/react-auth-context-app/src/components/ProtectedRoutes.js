import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth(); // ✅ use user instead

    // ✅ show loading ONLY when loading is true
    if (loading) {
        return <p>Loading...</p>;
    }

    // ✅ check user instead of isAuthenticated
    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;