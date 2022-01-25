import React, {useEffect} from 'react';
import {Paper} from '@mui/material';
import {faFilter, faInfo} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {NavLink} from 'react-router-dom';
import {findBooksForUser} from '@local/mock-backend/book/book-mock-data';
import ApplicationContext from '../../shared/ApplicationContext';

const YourBooks = () => {
  const applicationContext = React.useContext(ApplicationContext);
  useEffect(() => {
    console.log("useEffect running - should never rerun, since the dependencies-array is empty - loading books");
    findBooksForUser(applicationContext.user!).subscribe(
      {
        next: (results: any) => {
          console.log("findBooksForUser SUCCESS", results);
        },
        error: (error: any) => {
          console.log("findBooksForUser ERROR", error);
        }
      });
  }, []); // runs exactly once, because the deps array is empty, therefor it will never be re-evaluated#

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
