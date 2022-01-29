import React, {ChangeEvent, useContext, useEffect, useRef, useState} from 'react';
import {Paper} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import LoadingIndicatorWrapper from '../../shared/loading-indicator-wrapper';
import BookCard from '../yourBooks/book-card';
import ApplicationContext from '../../shared/ApplicationContext';
import {enrichBookWithUserAssignments, EnrichedBook} from '../../mock-backend/util/book-utils';
import {Book} from '../../mock-backend/book/Book';
import {findAllBooks} from '../../mock-backend/book/book-mock-data';
import {findUserBookAssignmentsForUser} from '../../mock-backend/user/user-book-assignment-mockservice';

interface LibraryState {
  loading: boolean,
  books: EnrichedBook[],
  filteredBooks: EnrichedBook[],
  searchTerm: string
  selectAllFilter: "exclude your books" | "show all books";
}

const Library = () => {
  const applicationContextRef = useRef(useContext(ApplicationContext));
  const [state, setState] = useState<LibraryState>({
    loading: true,
    books: [],
    filteredBooks: [],
    searchTerm: "",
    selectAllFilter: "exclude your books"
  })

  useEffect(() => {
    console.log("useEffect running - should never rerun, since the dependencies-array is empty - loading books");
    findAllBooks().subscribe(
      {
        next: (results: Book[]) => {
          console.log("findBooksForUser SUCCESS", results);
          const books = results.map(b => enrichBookWithUserAssignments(b, applicationContextRef.current.user!));
          const filteredBooks = filter(books, "", "exclude your books");
          setState({
            ...state,
            loading: false,
            books,
            filteredBooks
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
    console.log("handleFilterKeyup", searchTerm);
    const filteredBooks = filter(state.books, searchTerm, state.selectAllFilter);
    setState({...state, searchTerm, filteredBooks});
  }

  function handleSelectAllChange(e: any) {
    const selectedOption = e.target.value;
    console.log("handleFilterKeyup", selectedOption);
    const filteredBooks = filter(state.books, state.searchTerm, e.target.value);
    setState({...state, selectAllFilter: selectedOption, filteredBooks});
  }


  function filter(books: EnrichedBook[], searchTerm: string, showAllSelectFilter: "exclude your books" | "show all books"): EnrichedBook[] {
    let allBooks = books;
    console.log("filter", searchTerm, showAllSelectFilter);
    if (showAllSelectFilter === 'exclude your books') {
      allBooks = allBooks.filter((book: EnrichedBook) => !(findUserBookAssignmentsForUser(applicationContextRef.current.user!).map(b => b.bookId).includes(book.id)))
    }

    return allBooks.filter((b: EnrichedBook) => b.title.toLocaleLowerCase().includes(searchTerm));
  }

  //TODO check out route guarding

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
              <select value={state.selectAllFilter} onChange={(e) => handleSelectAllChange(e)} className="form-select" aria-label="exclude your
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
