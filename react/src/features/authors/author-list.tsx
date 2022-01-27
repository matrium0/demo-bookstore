import React, {SyntheticEvent, useEffect, useState} from 'react';
import {findAllAuthors} from '@local/mock-backend/author/author-mock-data';
import {Author}from '@local/mock-backend/author/Author';
import {EnrichedAuthor} from '@local/mock-backend/author/EnrichedAuthor';
import AuthorTable from './author-table';
import {enrichWithCalculatedFields} from '@local/mock-backend/author/author-util';
import LoadingIndicatorWrapper from '../../shared/loading-indicator-wrapper';
import {Paper} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';

interface AuthorListState {
  authors: EnrichedAuthor[],
  filteredAuthors: EnrichedAuthor[],
  authorsLoading: boolean
}

const defaultState: AuthorListState = {
  authors: [],
  filteredAuthors: [],
  authorsLoading: true
}

const AuthorList = () => {

  const navigate = useNavigate();
  const [authorListState, setAuthorListState] = useState(defaultState);

  useEffect(() => loadAllAuthors(), []);

  function handleFilterKeyup(event: SyntheticEvent) {
    const searchTerm = (event.target as HTMLInputElement).value;

    setAuthorListState(prevState => {
      return {
        ...prevState, filteredAuthors: prevState.authors.filter(a =>
          (a.firstname + " " + a.lastname).toLocaleLowerCase().includes(searchTerm) ||
          (a.lastname + " " + a.firstname).toLocaleLowerCase().includes(searchTerm)
        )
      }
    })
  }

  function handleAuthorSelected(author: EnrichedAuthor) {
    navigate("" + author.id);
  }

  function navigateToNewAuthor() {
    navigate("edit/new");
  }

  function loadAllAuthors() {
    console.log("loadAllAuthors");
    setAuthorListState({authors: [], filteredAuthors: [], authorsLoading: true});

    findAllAuthors().subscribe(
      {
        next: (results: Author[]) => {
          console.log("findAllAuthors SUCCESS", results);
          const enrichedAuthors = results.map(a => enrichWithCalculatedFields(a));
          setAuthorListState({authors: enrichedAuthors, filteredAuthors: enrichedAuthors, authorsLoading: false});
        },
        error: (error: any) => {
          console.log("findAllAuthors ERROR", error);
        }
      });
  }

  return (
    <div className="comp-wrapper">
      <Paper elevation={8} className="app-col">
        <div className="p-2 ms-lg-3 title-row d-flex flex-wrap align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex align-items-center">
              <h1>Authors</h1>
              <div className="input-group ms-2 ms-lg-5">
                <input onKeyUp={(e) => handleFilterKeyup(e)} className="form-control" placeholder="type to filter" aria-label="Filter"/>
                <span className="input-group-text"><FontAwesomeIcon icon={faFilter} size={'lg'}/></span>
              </div>
            </div>
          </div>
          <button onClick={() => navigateToNewAuthor()} className="btn btn-success btn-lg me-4">add Author</button>
        </div>
        <LoadingIndicatorWrapper loading={authorListState.authorsLoading}>
          <div className="pb-3" style={{borderTop: "2px solid gray"}}>
            <AuthorTable authors={authorListState.filteredAuthors} authorSelected={(author => handleAuthorSelected(author))}/>
          </div>
        </LoadingIndicatorWrapper>
      </Paper>
    </div>
  );
};

export default AuthorList;
