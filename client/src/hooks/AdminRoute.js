import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { VolunteerContext } from "../Context";

export default function AdminRoute({ children }) {
  const userInfo = {
    name: "Blackflame",
    isAdmin: "true",
  };

  // const { state } = useContext(Store);
  // const { userInfo } = state;
  return userInfo && userInfo.isAdmin === "true" ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
}
