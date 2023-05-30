import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClik = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await dbService.deleteDoc(
        dbService.doc(dbService.firestore, "tweets", `${tweetObj.id}`)
      );
      if (tweetObj.attachmentURL) {
        await storageService.deleteObject(
          storageService.ref(
            storageService.getStorage(),
            tweetObj.attachmentURL
          )
        );
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(tweetObj, newTweet);
    await dbService.updateDoc(
      dbService.doc(dbService.firestore, "tweets", `${tweetObj.id}`),
      {
        text: newTweet,
      }
    );
    setEditing(false);
  };
  const onChange = (e) => {
    const { value } = e.target;
    setNewTweet(value);
  };
  return (
    <div className="tweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container tweetEdit">
            <input
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              onChange={onChange}
              required
              autoFocus
              className="formInput"
            ></input>
            <input type="submit" value="Update Tweet" className="formBtn" />
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <div key={tweetObj.id}>
            <h4>{tweetObj.text}</h4>
            {tweetObj.attachmentURL && (
              <img src={tweetObj.attachmentURL} alt="tweet"></img>
            )}
            {isOwner && (
              <div className="tweet__actions">
                <span onClick={onDeleteClik}>
                  {" "}
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                  {" "}
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Tweet;
