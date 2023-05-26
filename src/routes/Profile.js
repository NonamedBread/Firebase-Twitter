import React, { useEffect, useState } from "react";
import { authService, dbService } from "../fbase";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const auth = authService.getAuth();
  const navigate = useNavigate();
  const onLogOutClik = () => {
    authService.signOut(auth).then((r) => navigate("/"));
  };

  const onChange = (e) => {
    const { value } = e.target;
    setNewDisplayName(value);
  };

  const getMyTweets = async () => {
    const querySnapshot = await dbService.getDocs(
      dbService.query(
        dbService.collection(dbService.firestore, "tweets"),
        dbService.where("creatorId", "==", `${userObj.uid}`),
        dbService.orderBy("createdAt", "desc")
      )
    );
    querySnapshot.docs.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      console.log(userObj.updateProfile);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        ></input>
        <input type="submit" value="Update profile"></input>
      </form>
      <button onClick={onLogOutClik}>Log Out</button>
    </>
  );
};
export default Profile;
