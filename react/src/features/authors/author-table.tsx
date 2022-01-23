import React from 'react';
import {EnrichedAuthor} from '@local/mock-backend/author/EnrichedAuthor';
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import GenderDisplay from '../../shared/GenderDisplay';

interface AuthorTableProps {
  authors: EnrichedAuthor[];
  authorSelected: (author: EnrichedAuthor) => void;
}

const AuthorTable = (props: AuthorTableProps) => {
  const [order, setOrder] = React.useState<"asc" | "desc">('asc');
  const [orderBy, setOrderBy] = React.useState('lastname');

  const createSortHandler = (property: string) => (event: any) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  //TODO responsive designs
  console.log("AuthorTable");
  const columns = [
    {field: 'firstname', headerName: 'FIRSTNAME'},
    {field: 'lastname', headerName: 'LASTNAME'},
    {field: 'gender', headerName: 'GENDER'},
    {field: 'penName', headerName: 'PEN NAME'},
    {field: 'birthdate', headerName: 'BIRTHDATE'},
    {field: 'age', headerName: 'AGE'},
    {field: 'dateOfDeath', headerName: 'DATE OF DEATH'}
  ];

  //TODO show spinner
  function descendingComparator(a: any, b: any, field: string) {
    if (!b[field] || b[field] < a[field]) {
      return -1;
    }
    if (!a[field] || b[field] > a[field]) {
      return 1;
    }
    return 0;
  }

  function getComparator(direction: string, field: string) {
    return direction === 'desc'
        ? (a: any, b: any) => descendingComparator(a, b, field)
        : (a: any, b: any) => -descendingComparator(a, b, field);
  }

  function getSortedByLabel(ord: string) {
    return <span>{ord === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
  }

  return (
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map(h =>
                  <TableCell key={h.field}>
                    <TableSortLabel active={orderBy === h.field} direction={order}
                                    onClick={createSortHandler(h.field)}>
                      {h.headerName}
                      {orderBy === h.field ? (
                          <Box component="span" sx={visuallyHidden}>
                            {getSortedByLabel(order)}
                          </Box>
                      ) : null}
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
                  <TableCell component="th" scope="row"><GenderDisplay gender={a.gender}/></TableCell>
                  <TableCell component="th" scope="row">{a.penName ? <FontAwesomeIcon icon={faCheck} size={'lg'}/> : ""}</TableCell>
                  <TableCell component="th" scope="row">{a.birthdate?.toFormat("dd.LL.yyyy")} in {a.placeOfBirth}</TableCell>
                  <TableCell component="th" scope="row">{a.age}</TableCell>
                  <TableCell component="th"
                             scope="row">{a.dateOfDeath ? (a.dateOfDeath?.toFormat("dd.LL.yyyy") + " in " + a.placeOfDeath) : ""}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default AuthorTable;
