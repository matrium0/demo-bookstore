import React, {ChangeEvent, useContext, useEffect, useRef, useState} from 'react';
import {Paper} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import LoadingIndicatorWrapper from '../../shared/loading-indicator-wrapper';
import BookCard from '../yourBooks/book-card';
import {Book} from '@local/mock-backend/book/Book';
import ApplicationContext from '../../shared/ApplicationContext';
import {enrichBookWithUserAssignments, EnrichedBook} from '../../util/book-utils';
import {findBooksForUser} from '@local/mock-backend/book/book-mock-data';

interface LibraryState {
  loading: boolean,
  books: EnrichedBook[],
  filteredBooks: EnrichedBook[],
  searchTerm: string
  handleSelectAll: "exclude your books" | "show all books";
}

const Library = () => {
  const applicationContextRef = useRef(useContext(ApplicationContext));
  const [state, setState] = useState<LibraryState>({
    loading: true,
    books: [],
    filteredBooks: [],
    searchTerm: "",
    handleSelectAll: "exclude your books"
  })

  useEffect(() => {
    console.log("useEffect running - should never rerun, since the dependencies-array is empty - loading books");
    findBooksForUser(applicationContextRef.current.user!).subscribe(
      {
        next: (results: Book[]) => {
          console.log("findBooksForUser SUCCESS", results);
          const books = results.map(b => enrichBookWithUserAssignments(b, applicationContextRef.current.user!));
          setState({
            ...state,
            loading: false,
            books,
            filteredBooks: [...books]
          });
        },
        error: (error: any) => {
          console.log("findBooksForUser ERROR", error);
          setState({...state, loading: false})
        }
      });
  }, []); // runs exactly once, because the deps array is empty, therefor it will never be re-evaluated#

  function handleFilterKeyup(event: ChangeEvent<HTMLInputElement>) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredBooks = state.books.filter((b: EnrichedBook) => b.title.toLocaleLowerCase().includes(searchTerm));
    setState({...state, filteredBooks, searchTerm})
  }

  function handleSelectAllChange(e: any) {
    console.log("handleselectallchange", e);
    console.log("handleselectallchange", e.target.value);
  }

  return (
    <div className="comp-wrapper">
      <Paper elevation={8} className="app-col">
        <div className="title-row">
          <div className="d-flex align-items-center justify-content-start flex-wrap">
            <h1 className="me-2 me-lg-5">Library</h1>
            <div className="input-group me-2 me-lg-5 my-2 my-lg-0" style={{width: 260}}>
              <input value={state.searchTerm} onChange={(e) => handleFilterKeyup(e)} className="form-control" placeholder="type to filter"
                     aria-label="Filter"/>
              <span className="input-group-text"><FontAwesomeIcon icon={faFilter} size={'lg'}/></span>
            </div>
            <div className="input-group" style={{width: 260}}>
              <select onChange={(e) => handleSelectAllChange(e)} className="form-select" aria-label="exclude your
              books or show all">
                <option>exclude your books</option>
                <option>show all books</option>
              </select>
            </div>
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
    ;
};

export default Library;
