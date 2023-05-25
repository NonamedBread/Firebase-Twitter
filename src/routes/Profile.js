import React, { useEffect } from "react";
import { authService, dbService } from "../fbase";
import { useNavigate } from "react-router-dom";

const Profile = (userObj) => {
  const auth = authService.getAuth();
  const navigate = useNavigate();
  const onLogOutClik = () => {
    authService.signOut(auth).then((r) => navigate("/"));
  };

  const getMyTweets = async () => {
    const querySnapshot = await dbService.getDocs(
      dbService.query(
        dbService.collection(dbService.firestore, "tweets"),
        dbService.where("creatorId", "==", `${userObj.uid}`)
      )
    );
    console.log("test");
    // querySnapshot.docs.map((doc) => {
    //   console.log(doc.id, "=>", doc.data());
    // });
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClik}>Log Out</button>
    </>
  );
};
export default Profile;
