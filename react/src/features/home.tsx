import React, {useContext} from 'react';
import {GlobalMessageContext} from '../shared/GlobalMessageContext';

const Home = () => {
  const globalMessageContext = useContext(GlobalMessageContext);
  console.log("Home");

  function setDummyMessage() {
    console.log("settingy dummy message");
    //TODO add default values for optional fields
    //TODO use undefined instead of null so that no value has to be set
    globalMessageContext.setMessage({message: "a bright new message of medium length", severity: "info"})
  }

  function clearMessage() {
    console.log("clearMessage");
    globalMessageContext.setMessage({message: "", severity: "info"})
  }

  return (
      <div>
        <h1>Home</h1>
        <button onClick={() => setDummyMessage()}>set dummy message</button>
        <button onClick={() => clearMessage()}>clear message</button>
      </div>
  );
};

export default Home;
