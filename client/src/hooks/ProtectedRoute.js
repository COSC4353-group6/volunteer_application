import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { VolunteerContext } from "../Context";

export default function ProtectedRoute({ children }) {
  const userInfo = {
    name: "Blackflame",
    isAdmin: "true",
  };
  
  //   const { state } = useContext(Store);
  //   const { userInfo } = state;
  return userInfo ? children : <Navigate to="/signin" />;
}
