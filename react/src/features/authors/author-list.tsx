import React, {useEffect, useState} from 'react';
import {findAllAuthors} from '@local/mock-backend/author/author-mock-data';
import Author from '@local/mock-backend/author/Author';
import {EnrichedAuthor} from '@local/mock-backend/author/EnrichedAuthor';
import AuthorTable from './author-table';
import {enrichWithCalculatedFields} from '@local/mock-backend/author/author-util';
import LoadingIndicatorWrapper from '../../shared/loading-indicator-wrapper';
import {Paper} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';

interface AuthorListState {
  authors: EnrichedAuthor[],
  authorsLoading: boolean
}

const defaultState: AuthorListState = {
  authors: [],
  authorsLoading: false
}

function handleAuthorSelected(author: EnrichedAuthor) {
  console.log("handleAuthorSelected");

}

const AuthorList = () => {
  const [authorListState, setAuthorListState] = useState(defaultState);
  // const applicationContext = useContext(ApplicationContext); //TODO use this for the filter

  useEffect(() => loadAllAuthors(), []);

  function loadAllAuthors() {
    console.log("loadAllAuthors");
    setAuthorListState({authors: [], authorsLoading: true});

    findAllAuthors().subscribe(
        {
          next: (results: Author[]) => {
            console.log("findAllAuthors SUCCESS", results);
            const enrichedAuthors = results.map(a => enrichWithCalculatedFields(a));
            setAuthorListState({authors: enrichedAuthors, authorsLoading: false});
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
                  <input className="form-control" placeholder="type to filter" aria-label="Filter"/>
                  <span className="input-group-text"><FontAwesomeIcon icon={faFilter} size={'lg'}/></span>
                </div>
              </div>
            </div>
            <button className="btn btn-success btn-lg me-4">add Author</button>
          </div>
          <LoadingIndicatorWrapper loading={authorListState.authorsLoading}>
            <div className="pb-3" style={{borderTop: "2px solid gray"}}>
              <p className="mx-2 mx-lg-5 mt-0 mt-3 fs-5">
                <AuthorTable authors={authorListState.authors} authorSelected={(author => handleAuthorSelected(author))}/>
              </p>
            </div>
          </LoadingIndicatorWrapper>
        </Paper>
      </div>
  );
};

export default AuthorList;
