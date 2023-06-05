import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser, faBarChart } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav style={{ width: "8vw", paddingRight: "8vw" }}>
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <li>
        <Link to="/">
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          <span style={{ marginTop: 10 }}>
            {/* {userObj.displayName
              ? `${userObj.displayName}의 Profile`
              : "Profile"} */}
          </span>
        </Link>
      </li>
      <li>
        <Link to="/statistics">
          <FontAwesomeIcon icon={faBarChart} color={"#04AAFF"} size="2x" />
        </Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
