import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import Tweet from "components/Tweets";

const Home = ({ userObj }) => {
  console.log(userObj);
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState();

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

  console.log(tweets);
  const onSubmit = async (e) => {
    e.preventDefault();
    const fileRef = storageService.ref(
      storageService.getStorage(),
      `${userObj.uid}/${uuidv4()}`
    );
    const response = await storageService.uploadString(
      fileRef,
      attachment,
      "data_url"
    );
    const attachmentUrl = await storageService.getDownloadURL(
      storageService.ref(storageService.getStorage(), fileRef)
    );

    const tweetObj = {
      text: tweet,
      createdAt: dbService.serverTimestamp(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    try {
      await dbService.addDoc(
        dbService.collection(dbService.firestore, "tweets"),
        { tweetObj }
      );
      setTweet("");
      setAttachment("");
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    const { value } = e.target;
    setTweet(value);
  };
  const onFileChange = (e) => {
    const { files } = e.target;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (e) => {
      const {
        currentTarget: { result },
      } = e;
      setAttachment(result);
    };

    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Tweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="tweet" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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
