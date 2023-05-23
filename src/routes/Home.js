import React, { useState } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await dbService.addDoc(
        dbService.collection(dbService.firestore, "tweets"),
        {
          tweet,
          createdAt: dbService.serverTimestamp(),
        }
      );
      setTweet("");
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    const { value } = e.target;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={tweet}
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
        ></input>
        <input type="submit" value="Tweet"></input>
      </form>
    </div>
  );
};
export default Home;
