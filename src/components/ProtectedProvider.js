import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedProvider = ({ children }) => {
  const { user } = UserAuth();
  if (!user?.email) {
    return (
      <>
        <Navigate to={"/"} />
      </>
    );
  } else {
    return children;
  }
};

export default ProtectedProvider;
