import React, {ChangeEvent, useContext, useEffect, useRef, useState} from 'react';
import {Paper} from '@mui/material';
import {faFilter, faInfo} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {NavLink} from 'react-router-dom';
import ApplicationContext from '../../shared/ApplicationContext';
import BookCard from './book-card';
import {enrichBookWithUserAssignments, EnrichedBook} from '../../mock-backend/util/book-utils';
import LoadingIndicatorWrapper from '../../shared/loading-indicator-wrapper';
import {findBooksForUser} from '../../mock-backend/book/book-mock-data';
import {Book} from '../../mock-backend/book/Book';

interface YourBooksListState {
  loading: boolean,
  books: EnrichedBook[],
  filteredBooks: EnrichedBook[],
  searchTerm: string
}

const YourBooksList = () => {
  const applicationContextRef = useRef(useContext(ApplicationContext));
  const [state, setState] = useState<YourBooksListState>({loading: true, books: [], filteredBooks: [], searchTerm: ""})

  useEffect(() => {
    console.log("useEffect running - should never rerun, since the dependencies-array is empty - loading books");
    findBooksForUser(applicationContextRef.current.user!).subscribe(
      {
        next: (results: Book[]) => {
          console.log("findBooksForUser SUCCESS", results);
          const books = results.map(b => enrichBookWithUserAssignments(b, applicationContextRef.current.user!));
          setState({
            loading: false,
            searchTerm: "",
            books,
            filteredBooks: [...books]
          });
        },
        error: (error: any) => {
          console.log("findBooksForUser ERROR", error);
          setState({loading: false, searchTerm: "", books: [], filteredBooks: []})
        }
      });
  }, []); // runs exactly once, because the deps array is empty, therefor it will never be re-evaluated#

  function handleFilterKeyup(event: ChangeEvent<HTMLInputElement>) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredBooks = state.books.filter((b: EnrichedBook) => b.title?.toLocaleLowerCase().includes(searchTerm));
    setState({...state, filteredBooks, searchTerm})
  }

  return (
    <div className="comp-wrapper">
      <Paper elevation={8} className="app-col">
        <div className="title-row">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex align-items-center">
              <h1>Your&nbsp;Books</h1>
              <div className="input-group ms-2 ms-lg-5">
                <input value={state.searchTerm} onChange={(e) => handleFilterKeyup(e)} className="form-control" placeholder="filter"
                       aria-label="Filter"/>
                <span className="input-group-text"><FontAwesomeIcon icon={faFilter} size={'lg'}/></span>
              </div>
            </div>
          </div>
          <div className="ms-2 me-4 add-more-books-label">
            <FontAwesomeIcon icon={faInfo} className="me-1"/>
            You can find more books in our <NavLink to="/library">Library</NavLink>
          </div>
        </div>
        <div>
          <LoadingIndicatorWrapper loading={state.loading}>
            <div className="row mx-1 mx-lg-2 justify-content-around pb-4" style={{minHeight: 400}}>
              {state.filteredBooks.map((b) => (
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
