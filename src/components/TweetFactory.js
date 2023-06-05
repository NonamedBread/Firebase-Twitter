import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

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
      del: "N",
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
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          type="text"
          value={tweet}
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
        ></input>
      </div>
      <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>

      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            alt="tweet"
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};
export default TweetFactory;
