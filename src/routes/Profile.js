import React from "react";
import { authService } from "../fbase";
import { useNavigate } from "react-router-dom";

export default () => {
  const auth = authService.getAuth();
  const navigate = useNavigate();
  const onLogOutClik = () => {
    authService.signOut(auth).then((r) => navigate("/"));
  };

  return (
    <>
      <button onClick={onLogOutClik}>Log Out</button>
    </>
  );
};
