import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Tweet from "components/Tweets";

const Home = ({ userObj }) => {
  console.log(userObj);
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService.onSnapshot(
      dbService.collection(dbService.firestore, "tweets"),
      (snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(tweetArray);
      }
    );
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
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
