import React from "react";
import { authService } from "../fbase";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

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
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button name="google" onClick={onSocialClick} className="authBtn">
          Continue with Google
          <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name="github" onClick={onSocialClick} className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
