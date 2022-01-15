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
      <div className="app-col mat-elevation-z8">
        <div className="p-2 ms-lg-3 title-row d-flex align-items-center">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <h1>Home</h1>
          </div>
        </div>
        <div className="pb-3" style={{borderTop: '2px solid gray'}}>
          <p className="mx-2 mx-lg-5 mt-0 mt-3 fs-5">
            Welcome to our <strong>Demo Bookstore</strong>. This is a just a frontend demonstration with no backend or persistent database.
            Feel free to edit, add or delete anything you like - the data is kept in <strong>your browsers memory</strong> only and will not
            be shared with others.
            If you leave the page all changes are lost!
            <br/>
            <br/>
            So don't be scared - go crazy :)
          </p>
          <p className="mx-2 mx-lg-5 mt-0 mt-3 fs-6">
            Since this is a playground different pages are implemented differently:
            <br/>
            LibraryComponent and YourBooksListComponent are fully "reactive" by embracing the full power of RXJS (e.g. combining streams
            with combineLatest) and
            async pipe
            <br/>
            Other smart components may store data directly or use a mix of the two.
          </p>
        </div>
      </div>
  );
};

export default Home;
