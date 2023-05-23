import React, { useState } from "react";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const onSubmit = (e) => {
    e.prventDeafault();
  };
  const onChange = (e) => {
    const { value } = e.target;
    setTweet(value);
  };
  console.log(tweet);
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
        ></input>
      </form>
    </div>
  );
};
export default Home;
