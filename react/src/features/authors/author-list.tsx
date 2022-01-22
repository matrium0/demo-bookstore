import React, {useContext, useEffect, useState} from 'react';
import ApplicationContext from '../../shared/ApplicationContext';
import {findAllAuthors} from '@local/mock-backend/author/author-mock-data';
import Author from '@local/mock-backend/author/Author';
import AuthorTable from './author-table';

const defaultState: { authors: Author[] } = {
  authors: []
}

function handleAuthorSelected(author: Author) {
  console.log("handleAuthorSelected");

}

const AuthorList = () => {
  const [authorListState, setAuthorListState] = useState(defaultState);
  const applicationContext = useContext(ApplicationContext);

  useEffect(() => loadAllAuthors(), []);

  function loadAllAuthors() {
    console.log("loadAllAuthors");

    findAllAuthors().subscribe(
        {
          next: (results: Author[]) => {
            console.log("findAllAuthors SUCCESS", results);
            setAuthorListState({authors: results});
          },
          error: (error: any) => {
            console.log("findAllAuthors ERROR", error);
          }
        });
  }


  return (
      <div>
        <h1>Author List</h1>
        <AuthorTable authors={authorListState.authors} authorSelected={(author => handleAuthorSelected(author))}/>
      </div>
  );
};

export default AuthorList;
