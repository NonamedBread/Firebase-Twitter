import React, { useEffect, useState } from "react";

import { dbService } from "fbase";
import Tweet from "components/Tweets";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService.onSnapshot(
      dbService.query(
        dbService.collection(dbService.firestore, "tweets"),
        dbService.where("del", "==", "N")
      ),
      (snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(tweetArray);
      }
    );
  }, []);

  return (
    <div style={{ width: "30vw" }}>
      <div className="container">
        <TweetFactory userObj={userObj} />
      </div>
      <div style={{ marginTop: 30 }}>
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
