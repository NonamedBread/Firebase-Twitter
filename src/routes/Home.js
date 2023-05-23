import React, { useState } from "react";

const Home = () => {
  const [tweet, SetTweet] = useState("");
  const onSubmit = (e) => {
    e.preventDeafault();
  };
  const onChange = (e) => {
    const { value } = e.target;
    SetTweet(value);
    console.log(tweet);
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={tweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        ></input>
        <input type="submit" placeholder="Tweet"></input>
      </form>
    </div>
  );
};
export default Home;
