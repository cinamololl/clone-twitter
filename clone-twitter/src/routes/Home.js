import { dbService, collect, addD, getD } from "fBase";
import React,{ useEffect, useState } from "react";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const getTweets = async() => {
    const dbTweets = await getD(collect(dbService, 'tweets'));
    dbTweets.forEach(document => {
      const tweetObject = {
        ...document.data(),
        id: document.id,
      }
      setTweets(prev => [document.data(), ...prev]);
    })
  }
  useEffect(() => {
    getTweets(tweets);
  })
  const onSubmit = async(event) => {
    event.preventDefault();
    try {
      const docRef = await addD(collect(dbService, 'tweets'),{
        text:tweet,
        createdAt:Date.now(),
        createId: docRef.uid,
      });
      console.log("Document written with ID :", docRef.uid)
    } catch(error) {
      console.error("Error adding document:",error);
    }
    setTweet("");
  };
  const onChange = (event) => {
    const{target:{value},} = event;
    setTweet(value);
  }
  return(<>
  <div>
    <form onSubmit={onSubmit}>
      <input value={tweet} onChange={onChange} type="text" placeholder="what's your mind?" maxLength={120}/>
      <input type="submit" value="tweet" />
    </form>
    <div>
      {tweets.map((tweet) => 
      <div key={tweet.id}>
        <h4>{tweet.text}</h4>
      </div>)}
    </div>
  </div>
  </>);
}
export default Home;