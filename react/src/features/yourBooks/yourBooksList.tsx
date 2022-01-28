import React, {useContext, useEffect, useRef, useState} from 'react';
import {Paper} from '@mui/material';
import {faFilter, faInfo} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {NavLink} from 'react-router-dom';
import {findBooksForUser} from '@local/mock-backend/book/book-mock-data';
import ApplicationContext from '../../shared/ApplicationContext';
import BookCard from './book-card';
import {Book} from '@local/mock-backend/book/Book';
import {enrichBookWithUserAssignments, EnrichedBook} from '../../util/book-utils';
import LoadingIndicatorWrapper from '../../shared/loading-indicator-wrapper';

interface YourBooksListState {
  loading: boolean,
  books: EnrichedBook[]
}

const YourBooksList = () => {
  const applicationContextRef = useRef(useContext(ApplicationContext));
  const [state, setState] = useState<YourBooksListState>({loading: true, books: []})

  useEffect(() => {
    console.log("useEffect running - should never rerun, since the dependencies-array is empty - loading books");
    findBooksForUser(applicationContextRef.current.user!).subscribe(
      {
        next: (results: Book[]) => {
          console.log("findBooksForUser SUCCESS", results);
          setState({loading: false, books: results.map(b => enrichBookWithUserAssignments(b, applicationContextRef.current.user!))});
        },
        error: (error: any) => {
          console.log("findBooksForUser ERROR", error);
          setState({loading: false, books: []})
        }
      });
  }, []); // runs exactly once, because the deps array is empty, therefor it will never be re-evaluated#

  return (
    <div className="comp-wrapper">
      <Paper elevation={8} className="app-col">
        <div className="title-row">
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
        <div>
          <LoadingIndicatorWrapper loading={state.loading}>
            <div className="row mx-1 mx-lg-2 justify-content-around pb-4" style={{minHeight: 400}}>
              {state.books.map((b) => (
                <div key={b.id} className="col-auto g-4 book-card-wrap">
                  <BookCard key={b.id} book={b}/>
                </div>
              ))}
            </div>
          </LoadingIndicatorWrapper>
        </div>
      </Paper>
    </div>
  )
};

export default YourBooksList;
