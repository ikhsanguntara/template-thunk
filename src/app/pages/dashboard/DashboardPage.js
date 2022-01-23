import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { logout } from "../auth/authSlice";

export const DashboardPage = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <h1>Sample Dashboard</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};
