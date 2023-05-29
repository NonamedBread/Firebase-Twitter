import Tweet from "./Tweets";
import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentURL = "";
    if (attachment !== "") {
      const fileRef = storageService.ref(
        storageService.getStorage(),
        `${userObj.uid}/${uuidv4()}`
      );

      const response = await storageService.uploadString(
        fileRef,
        attachment,
        "data_url"
      );

      attachmentURL = await storageService.getDownloadURL(
        storageService.ref(storageService.getStorage(), fileRef)
      );
    }
    const tweetObj = {
      text: tweet,
      createdAt: dbService.serverTimestamp(),
      creatorId: userObj.uid,
      attachmentURL,
    };

    try {
      await dbService.addDoc(
        dbService.collection(dbService.firestore, "tweets"),
        tweetObj
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
  const onClearAttachment = () => setAttachment("");
  return (
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
  );
};
export default TweetFactory;
