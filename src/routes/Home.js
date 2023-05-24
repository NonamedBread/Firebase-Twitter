import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const getNtweets = async () => {
    const dbTweets = await dbService.getDocs(
      dbService.collection(dbService.firestore, "tweets")
    );
    dbTweets.forEach((doc) => {
      const tweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setTweets((prev) => [tweetObj, ...prev]);
    });
  };

  useEffect(() => {
    getNtweets();
  }, []);

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
  console.log(tweets);
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
