import React, {memo} from 'react';
import {Paper} from '@mui/material';

const Home = () => {

  return (
    <div className="comp-wrapper">
      <Paper elevation={8} className="app-col">
        <div className="title-row-wrapper">
          <div className="title-row">
            <div className="d-flex align-items-center justify-content-start flex-wrap">
              <h1 className="me-2 me-lg-5">Home</h1>
            </div>
          </div>
        </div>
        <div className="pb-3">
          <p className="mx-2 mx-lg-5 mt-0 mt-3 fs-5">
            Welcome to our <strong>Demo Bookstore</strong>. This is a just a frontend demonstration with no backend or persistent
            database.
            Feel free to edit, add or delete anything you like - the data is kept in <strong>your browsers memory</strong> only and will
            not
            be shared with others.
            If you leave the page all changes are lost!
            <br/>
            <br/>
            So don't be scared - go crazy :)
          </p>
          <p className="mx-2 mx-lg-5 mt-0 mt-3 fs-6">
          </p>
        </div>
      </Paper>
    </div>
  );
};

export default memo(Home);
