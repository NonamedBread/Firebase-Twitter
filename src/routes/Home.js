import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

const Home = (userObj) => {
  console.log(userObj);
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const getNtweets = async () => {
    const dbTweets = await dbService.getDocs(
      dbService.collection(dbService.firestore, "tweets")
    );
    const fetchedTweets = dbTweets.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTweets(fetchedTweets);
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
          text: tweet,
          createdAt: dbService.serverTimestamp(),
          creatorId: userObj.uid,
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
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.tweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
