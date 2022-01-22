import React from 'react';
import {EnrichedAuthor} from '@local/mock-backend/author/EnrichedAuthor';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';

interface AuthorTableProps {
  authors: EnrichedAuthor[];
  authorSelected: (author: EnrichedAuthor) => void;
}

const AuthorTable = (props: AuthorTableProps) => {

  console.log("AuthorTable");

  const tableHeaders = ['firstname', 'lastname', 'gender', 'penName', 'birthdateWithPlace', 'age', 'dateOfDeath']; //TODO make responsive

  return (
      <div>
        <div>Author Table Component</div>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeaders.map(h => <TableCell key={h}>{h}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.authors.map((a: EnrichedAuthor) => (
                  <TableRow
                      key={a.id}
                      sx={{'&:last-child td, &:last-child th': {border: 0}}}
                  >
                    <TableCell component="th" scope="row">{a.firstname}</TableCell>
                    <TableCell component="th" scope="row">{a.lastname}</TableCell>
                    <TableCell component="th" scope="row">{a.gender}</TableCell>
                    <TableCell component="th" scope="row">{String(a.penName)}</TableCell>
                    <TableCell component="th" scope="row">{a.birthdate?.toFormat("dd.LL.yyyy")}</TableCell>
                    {/*/!*TODO birthdateWithPlace field?????*!/*/}
                    <TableCell component="th" scope="row">{a.age}</TableCell>
                    <TableCell component="th" scope="row">{a.dateOfDeath?.toFormat("dd.LL.yyyy")}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


      </div>
  );
};

export default AuthorTable;
