import React, { useState, useEffect } from "react";

const timeUrl = "https://www.reddit.com/r/dadjokes/top.json?t=day&limit=1";

const DadJokes = () => {
  const [joke, setJoke] = useState({});

  const getJoke = () => {
    fetch(timeUrl)
      .then(response => response.json())
      .then(json => setJoke(json.data.children[0].data))
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    getJoke();
  }, []);

  return joke.title ? (
    <div>
      <p>{joke.title}</p>
      <p>{joke.selftext}</p>
    </div>
  ) : (
    <></>
  );
};

export default DadJokes;
