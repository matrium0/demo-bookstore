import React from 'react';
import {EnrichedAuthor} from '@local/mock-backend/author/EnrichedAuthor';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from '@mui/material';

interface AuthorTableProps {
  authors: EnrichedAuthor[];
  authorSelected: (author: EnrichedAuthor) => void;
}

// function descendingComparator(a: EnrichedAuthor, b:EnrichedAuthor, orderBy: keyof EnrichedAuthor) {
//   if (!a || !b) {
//     return 0;
//   }
//
//   console.log(b[orderBy]);
//
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }


const AuthorTable = (props: AuthorTableProps) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('lastname');

  const createSortHandler = (property: string) => (event: any) => { //TODO typing?
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  console.log("AuthorTable");
  const columns = [
    {field: 'firstname', headerName: 'Firstname'},
    {field: 'lastname', headerName: 'Lastname'},
    {field: 'gender', headerName: 'Gender'},
    {field: 'penName', headerName: 'Pen Name'},
    {field: 'birthdate', headerName: 'Birthdate'},
    {field: 'age', headerName: 'age'},
    {field: 'dateOfDeath', headerName: 'dateOfDeath'}
  ];

  //TODO show spinner
  function descendingComparator(a: any, b: any, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order: string, orderBy: string) { //real types
    return order === 'desc'
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  }

  return (
      <div>
        <div>Author Table Component</div>
        <div>{props.authors.length}</div>
        <div>tablecontainer</div>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map(h =>
                    <TableCell key={h.field}>
                      <TableSortLabel
                          active={orderBy === h.field}
                          direction={'asc'}
                          onClick={createSortHandler(h.field)}
                      >
                        {h.headerName}
                        {/*{orderBy === headCell.id ? (*/}
                        {/*    <Box component="span" sx={visuallyHidden}>*/}
                        {/*      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}*/}
                        {/*    </Box>*/}
                        {/*) : null}*/}
                      </TableSortLabel>
                    </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.authors.slice().sort(getComparator(order, orderBy)).map((a: EnrichedAuthor) => (
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
  )
      ;
};

export default AuthorTable;
