import React, {useEffect, useState} from 'react';
import {findAllAuthors} from '@local/mock-backend/author/author-mock-data';
import Author from '@local/mock-backend/author/Author';
import {EnrichedAuthor} from '@local/mock-backend/author/EnrichedAuthor';
import AuthorTable from './author-table';
import {enrichWithCalculatedFields} from '@local/mock-backend/author/author-util';

const defaultState: { authors: EnrichedAuthor[] } = {
  authors: []
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

    findAllAuthors().subscribe(
        {
          next: (results: Author[]) => {
            console.log("findAllAuthors SUCCESS", results);
            const enrichedAuthors = results.map(a => enrichWithCalculatedFields(a));
            setAuthorListState({authors: enrichedAuthors});
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
