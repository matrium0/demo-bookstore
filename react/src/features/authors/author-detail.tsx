import 'react-quill/dist/quill.snow.css';
import "./author-detail.scss";
import React, {memo, useContext, useEffect, useState} from 'react';
import {Author} from '@local/mock-backend/author/Author';
import {EnrichedAuthor} from '@local/mock-backend/author/EnrichedAuthor';
import {Book} from '@local/mock-backend/book/Book';
import {Paper} from '@mui/material';
import LoadingIndicatorWrapper from '../../shared/loading-indicator-wrapper';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {findAuthorById} from '@local/mock-backend/author/author-mock-data';
import sanitize from 'sanitize-html';
import {findBooksOfAuthor} from '@local/mock-backend/book/book-mock-data';
import {GlobalMessageContext} from '../../shared/GlobalMessageContext';
import {enrichWithCalculatedFields} from '@local/mock-backend/author/author-util';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner';

interface AuthorDetailState {
  author?: EnrichedAuthor,
  imageUrl?: string
  loading: boolean
  books?: Book[];
  booksLoading: boolean
}

const AuthorDetail = () => {
  console.log("AuthorDetail");
  const [state, setState] = useState<AuthorDetailState>({author: {}, loading: true, booksLoading: true});
  const {id} = useParams();
  const globalMessageContext = useContext(GlobalMessageContext);
  const navigate = useNavigate();
  useEffect(() => {
    const authorId = Number(id);
    loadAuthor();
    loadBooksOfAuthor();

    function loadAuthor() {
      console.log("loadAuthor");
      setState(oldState => ({...oldState, author: {}, loading: true}));

      const defaultOptions = {
        allowedTags: ['b', 'i', 'em', 'strong', 'h1', 'h2', 'h3', 'h4', 'h5'],
      };

      findAuthorById(authorId).subscribe(
        {
          next: (a: Author) => {
            console.log("findAuthorById SUCCESS", a);
            const valid = sanitize(a.note || "", defaultOptions);
            if (!valid) {
              throw new Error("invalid html");
            }
            const imageUrl = URL.createObjectURL(a.foto!);
            setState(oldState => ({...oldState, loading: false, author: enrichWithCalculatedFields(a), imageUrl}));
          },
          error: (error: any) => {
            console.log("findAuthorById ERROR", error);
            globalMessageContext.setMessage({message: "Error loading author", severity: "danger"});
          }
        });
    }

    function loadBooksOfAuthor() {
      console.log("loadBooksOfAuthor");
      setState(oldState => ({...oldState, booksLoading: true}));
      findBooksOfAuthor(authorId).subscribe({
        next: (books: Book[]) => {
          console.log("loadBooksOfAuthor SUCCESS", books);
          setState(oldState => ({...oldState, booksLoading: false, books}));
        },
        error: (error: any) => {
          console.log("loadBooksOfAuthor ERROR", error);
          globalMessageContext.setMessage({message: "Error loading books", severity: "danger"});
        }
      });
    }
  }, []);

  function navigateBackToList() {
    console.log("navigateBackToList");
    navigate("/author");
  }

  function navigateToEditPage() {
    console.log("navigateToEditPage");
    navigate(id!.toString());
  }

  return (
    <div className="comp-wrapper">
      <Paper elevation={8} className="app-col">
        <div className="p-2 ms-lg-3 title-row d-flex flex-wrap align-items-center justify-content-between">
          <div className="d-flex align-items-center flex-wrap">
            <h1>Author {state.author?.firstname} {state.author?.lastname}</h1>
          </div>
        </div>
        <LoadingIndicatorWrapper loading={state.loading}>
          <div style={{borderTop: "2px solid gray"}}>
            <div className="row mx-1 mx-lg-2" style={{minHeight: 400}}>
              <div className="col-md-8">
                {state.author?.penName &&
                  <div className="author-detail__label mt-3"><strong>{state.author?.firstname + " " + state.author?.lastname}</strong> is a pen name
                    of <strong>{state.author?.fullRealName}</strong></div>}
                <div className="mt-3">
                  <span className="author-detail__label">Born {state.author?.birthdate?.toFormat("dd.LL.yyyy")} in {state.author?.placeOfBirth}</span>
                  {<span className="author-detail__label">&nbsp;&nbsp;(Age {state.author?.age})</span>}
                  {state.author?.dateOfDeath && <span className="author-detail__label">&nbsp;&nbsp;(Age {state.author?.age})</span>}
                </div>
                {state.author?.dateOfDeath && <div>
                  <span className="author-detail__label">Died {state.author?.dateOfDeath?.toFormat("dd.LL.yyyy")} in {state.author?.placeOfBirth}</span>
                  {<span className="author-detail__label">&nbsp;&nbsp;(Age {state.author?.age})</span>}
                </div>}
                {state.author?.website &&
                  <div className="mt-3 author-detail__label">Homepage: <a href={state.author?.website}>{state.author?.website}</a></div>
                }
                <div className="author-detail__label">Genre: {state.author?.genre}</div>
                <div className="mt-3 author-detail__note" dangerouslySetInnerHTML={{__html: (state.author?.note || "")}}/>
              </div>
              <div className="col-md-4 d-flex flex-column align-items-center justify-content-start">
                <div className="foto-wrapper">
                  <img src={state.imageUrl} className="author-foto-img" alt="Foto of the Author"/>
                </div>
                <div className="mt-4">
                  <h2>Books written by {state.author?.firstname + " " + state.author?.lastname}</h2>
                  {state.booksLoading && <div className="ms-5 mt-3">
                    <FontAwesomeIcon icon={faSpinner} size={'3x'} className="fa-spin"/>
                  </div>}
                  {!state.booksLoading && state.books?.length === 0 && <div className="ms-4">
                    No books from {state.author?.firstname + " " + state.author?.lastname} saved - you can add some in the&nbsp;
                    <NavLink to="/library">Library</NavLink>
                  </div>}
                  {(!state.booksLoading) && <ul>
                    {state.books?.map(b => <li key={b.id}><NavLink to={"/library/edit/" + b.id}>{b.title}</NavLink></li>)}
                  </ul>}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 px-4 px-lg-5 mb-3 d-flex align-items-center justify-content-between ">
              <button onClick={() => navigateBackToList()} className="btn btn-secondary btn-lg">
                &nbsp;back&nbsp;
              </button>
              <button onClick={() => navigateToEditPage()} className="btn btn-warning btn-lg px-4">
                &nbsp;edit&nbsp;
              </button>
            </div>
          </div>
        </LoadingIndicatorWrapper>
      </Paper>
    </div>
  )
}

export default memo(AuthorDetail);
