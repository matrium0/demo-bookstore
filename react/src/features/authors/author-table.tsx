import React, {useContext, useEffect} from 'react';
import ApplicationContext from '../../shared/ApplicationContext';
import {findAllAuthors} from '@local/mock-backend/author/author-mock-data';
import Author from '@local/mock-backend/author/Author';

interface AuthorTableProps {
  authors: Author[];
  authorSelected: (author: Author) => void;
}

const AuthorTable = (props: AuthorTableProps) => {

  console.log("AuthorTable");

  const listItems = props.authors.map((author) =>
      <li>{author.firstname}</li>
  );

  return (
      <div>
        <h1>Author List</h1>
        {listItems}

      </div>
  );
};

export default AuthorTable;
