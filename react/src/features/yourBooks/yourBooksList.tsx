import React from 'react';
import {Paper} from '@mui/material';
import {faFilter, faInfo} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {NavLink} from 'react-router-dom';

const YourBooks = () => {
  return (
      <div className="comp-wrapper">
        <Paper elevation={8} className="app-col">
          <div className="p-2 ms-lg-3 title-row d-flex flex-wrap align-items-center justify-content-between">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex align-items-center">
                <h1>Your&nbsp;Books</h1>
                <div className="input-group ms-2 ms-lg-5">
                  <input className="form-control" placeholder="type to filter" aria-label="Filter"/>
                  <span className="input-group-text"><FontAwesomeIcon icon={faFilter} size={'lg'}/></span>
                </div>
              </div>
            </div>
            <div className="ms-2 me-4 add-more-books-label">
              <FontAwesomeIcon icon={faInfo}/>
              You can find more books in our <NavLink to="/library">Library</NavLink>
            </div>
          </div>
          <div className="pb-3" style={{borderTop: "2px solid gray"}}>
            <p className="mx-2 mx-lg-5 mt-0 mt-3 fs-5">
              tstestetse
            </p>
          </div>
        </Paper>
      </div>
  );
};

export default YourBooks;
