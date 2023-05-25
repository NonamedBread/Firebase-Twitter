import React, { useState } from "react";
import { dbService } from "fbase";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClik = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await dbService.deleteDoc(
        dbService.doc(dbService.firestore, "tweets", `${tweetObj.id}`)
      );
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
  console.log(tweetObj.text);
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              onChange={onChange}
              required
            ></input>
            <button type="submit">Update Tweet</button>
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <div key={tweetObj.id}>
            <h4>{tweetObj.text}</h4>
            {isOwner && (
              <>
                <button onClick={onDeleteClik}>Delete Tweet</button>
                <button onClick={toggleEditing}>Edit Tweet</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Tweet;
