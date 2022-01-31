import React, {memo} from 'react';
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from '@mui/material';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import GenderDisplay from '../../shared/GenderDisplay';
import {useWindowSize} from '../../util/window-resize.hook';
import {EnrichedAuthor} from '../../mock-backend/author/EnrichedAuthor';

interface AuthorTableProps {
  authors: EnrichedAuthor[];
  authorSelected: (author: EnrichedAuthor) => void;
}

const AuthorTable = (props: AuthorTableProps) => {
  const [order, setOrder] = React.useState<"asc" | "desc">('asc');
  const [orderBy, setOrderBy] = React.useState('lastname');
  const [width] = useWindowSize();

  console.log("AuthorTable", props);

  const createSortHandler = (property: string) => (event: any) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  console.log("AuthorTable");
  const columns = [
    {field: 'firstname', headerName: 'FIRSTNAME', alwaysShow: true},
    {field: 'lastname', headerName: 'LASTNAME', alwaysShow: true},
    {field: 'gender', headerName: 'GENDER', alwaysShow: false},
    {field: 'penName', headerName: 'PEN NAME', alwaysShow: false},
    {field: 'birthdate', headerName: 'BIRTHDATE', alwaysShow: false},
    {field: 'age', headerName: 'AGE', alwaysShow: false},
    {field: 'dateOfDeath', headerName: 'DATE OF DEATH', alwaysShow: false}
  ];

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

  function handleRowSelected(author: EnrichedAuthor) {
    props.authorSelected(author);
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(h =>
              <TableCell key={h.field} sx={{display: ((!h.alwaysShow && width <= 800) ? "none" : "table-cell")}}>
                <TableSortLabel active={orderBy === h.field} direction={order}
                                onClick={createSortHandler(h.field)}>
                  <Box component="span" sx={{display: "box"}}>
                    {h.headerName}
                  </Box>
                </TableSortLabel>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.authors.slice().sort(getComparator(order, orderBy)).map((a: EnrichedAuthor) => (
            <TableRow
              onClick={() => handleRowSelected(a)}
              key={a.id}
              sx={{'td , th': {fontSize: 12}, '&:last-child td, &:last-child th': {border: 0}}}
              className="selectable-table-row"
            >
              <TableCell component="td" scope="row">{a.firstname}</TableCell>
              <TableCell component="td" scope="row">{a.lastname}</TableCell>
              <TableCell component="td" scope="row" sx={{display: ((width <= 800) ? "none" : "table-cell")}}><GenderDisplay
                gender={a.gender!}/></TableCell>
              <TableCell component="td" scope="row" sx={{display: ((width <= 800) ? "none" : "table-cell")}}>{a.penName ?
                <FontAwesomeIcon icon={faCheck} size={'lg'}/> : ""}</TableCell>
              <TableCell component="td" scope="row"
                         sx={{display: ((width <= 800) ? "none" : "table-cell")}}>{a.birthdate?.toFormat("dd.LL.yyyy")} in {a.placeOfBirth}</TableCell>
              <TableCell component="td" scope="row" sx={{display: ((width <= 800) ? "none" : "table-cell")}}>{a.age}</TableCell>
              <TableCell component="td" scope="row" sx={{display: ((width <= 800) ? "none" : "table-cell")}}>
                {a.dateOfDeath ? (a.dateOfDeath?.toFormat("dd.LL.yyyy") + " in " + a.placeOfDeath) : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(AuthorTable);
