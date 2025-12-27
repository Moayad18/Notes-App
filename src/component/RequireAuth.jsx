import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const RequireAuth = ({ children }) => {
  const { isLoading, user } = useSelector((state) => state.loginAuth);
  const location = useLocation();
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
