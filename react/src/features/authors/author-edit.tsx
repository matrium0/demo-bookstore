import {useParams} from 'react-router-dom';
import {Paper} from '@mui/material';
import LoadingIndicatorWrapper from '../../shared/loading-indicator-wrapper';
import React, {useEffect, useState} from 'react';
import Author from '@local/mock-backend/author/Author';
import {findAuthorById} from '@local/mock-backend/author/author-mock-data';

interface AuthorEditState {
  loading: boolean,
  author?: Author
}

const AuthorEdit = () => {
  const [state, setState] = useState<AuthorEditState>({loading: false});
  const {id} = useParams();

  useEffect(() => {
    function loadAuthor() {
      const authorId = Number(id);
      console.log("loadAuthor", authorId);
      setState({loading: true});

      findAuthorById(authorId).subscribe(
          {
            next: (results: Author) => {
              console.log("findAuthorById SUCCESS", results);
              setState({loading: false, author: results});
            },
            error: (error: any) => {
              console.log("findAuthorById ERROR", error);
            }
          });
    }

    return loadAuthor();
  }, [id]);


  return (
      <div className="comp-wrapper">
        <Paper elevation={8} className="app-col">
          <div className="p-2 ms-lg-3 title-row d-flex flex-wrap align-items-center justify-content-between">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex align-items-center">
                <h1>Author: {state.author?.firstname} {state.author?.lastname}</h1>
              </div>
            </div>
            <button className="btn btn-danger btn-lg me-4">delete</button>
          </div>
          <LoadingIndicatorWrapper loading={state.loading}>
            <div className="pb-3" style={{borderTop: "2px solid gray"}}>
              <div>AuthorEdit component with param: {id}</div>
            </div>
          </LoadingIndicatorWrapper>
        </Paper>
      </div>
  )
}

export default AuthorEdit;
