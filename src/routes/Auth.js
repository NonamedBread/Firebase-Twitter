import React, { useState } from "react";
import { authService } from "../fbase";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const auth = authService.getAuth();

  const onSocialClick = async (e) => {
    const { name } = e.target;
    let provider;
    if (name === "google") {
      provider = new authService.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new authService.GithubAuthProvider();
    }
    await authService.signInWithPopup(auth, provider);
  };
  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
