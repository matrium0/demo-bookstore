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
import {UserBookAssignmentStatus} from '../../mock-backend/user/user-book-assignment-status';
import {updateStatus} from '../../mock-backend/user/user-book-assignment-mockservice';

interface YourBooksListState {
  loading: boolean,
  books: EnrichedBook[],
  filteredBooks: EnrichedBook[],
  searchTerm: string
}

const YourBooksList = () => {
  console.log("Library");
  const applicationContextRef = useContext(ApplicationContext);
  const [state, setState] = useState<YourBooksListState>({loading: true, books: [], filteredBooks: [], searchTerm: ""})

  useEffect(() => {
    console.log("useEffect running - should never rerun, since the dependencies-array is empty - loading books");
    findBooksForUser(applicationContextRef.user!).subscribe(
      {
        next: (results: Book[]) => {
          let books = results.map(b => enrichBookWithUserAssignments(b, applicationContextRef.user!));
          books = books.filter(b => b.assignmentStatus !== "default");
          console.log("findBooksForUser SUCCESS", books);
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

  function handleAssignmentStatusChange(book: EnrichedBook, stat: UserBookAssignmentStatus) {
    console.log("YourBookList: statusChanged received", book, stat);
    updateStatus(applicationContextRef.user!, book.id!, stat);
  }

  function dismissIntroduction() {
    applicationContextRef.disableIntroductionMessage();
  }

  return (
    <div className="comp-wrapper">
      <Paper elevation={8} className="app-col">
        <div className="title-row-wrapper">
          <div className="title-row">
            <div className="d-flex align-items-center">
              <h1>Your&nbsp;Books</h1>
              <div className="input-group ms-2 ms-lg-5">
                <input value={state.searchTerm} onChange={(e) => handleFilterKeyup(e)} className="form-control" placeholder="filter"
                       aria-label="Filter"/>
                <span className="input-group-text"><FontAwesomeIcon icon={faFilter}/></span>
              </div>
            </div>
            <div className="ms-2 me-4 add-more-books-label">
              <FontAwesomeIcon icon={faInfo} className="me-1"/>
              You can find more books in our <NavLink to="/library">Library</NavLink>
            </div>
          </div>
        </div>
        <div>
          <LoadingIndicatorWrapper loading={state.loading}>
            {applicationContextRef.showIntroductionMessage &&
              <div className="alert alert-info mx-3">
                <span className="me-3">This is a collection of all books that you showed interest in (because you marked them as either "want to read", "currently reading" or "read")</span>
                <button onClick={dismissIntroduction} className="btn btn-secondary">got it</button>
             </div>
            }

            <div className="book-list pb-4 mx-3" style={{minHeight: 400}}>
              {state.filteredBooks.map((b) => (
                <div key={b.id} className="book-card-wrap">
                  <BookCard key={b.id} book={b} changeStatus={handleAssignmentStatusChange}/>
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
