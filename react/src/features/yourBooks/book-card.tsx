import {NavLink} from 'react-router-dom';
import {EnrichedBook} from '../../mock-backend/util/book-utils';
import React, {memo, useState} from 'react';
import "./book-card.scss";
import {Link} from '@mui/material';
import ConfirmationDialog from '../../shared/confirmation-dialog';
import BookDetailDialog from './book-detail-dialog';
import BookCardLibraryMarker from './book-card-library-marker';
import {UserBookAssignmentStatus} from '../../mock-backend/user/user-book-assignment-status';

interface BookCardProps {
  book: EnrichedBook;
  changeStatus: (book: EnrichedBook, stat: UserBookAssignmentStatus) => void
}

const BookCard = (props: BookCardProps) => {
  const [state, setState] = useState({
    showSeriesDialog: false,
    showBookDetailDialog: false,
    book: props.book
  })
  const imageUrl = URL.createObjectURL(props.book.image!);

  function openSeriesDialog() {
    setState({...state, showSeriesDialog: true, showBookDetailDialog: false});
  }

  function dismissSeriesDialog() {
    setState({...state, showSeriesDialog: false, showBookDetailDialog: false});
  }

  function openBookDetailDialog() {
    setState({...state, showSeriesDialog: false, showBookDetailDialog: true});
  }

  function dismissBookDetailDialog() {
    setState({...state, showSeriesDialog: false, showBookDetailDialog: false});
  }

  function handleAssignmentStatusChange(stat: UserBookAssignmentStatus) {
    console.log("handleAssignmentStatusChange", props.book, stat);
    props.changeStatus(props.book, stat);
    setState({...state, book: {...state.book, assignmentStatus: stat}});
  }

  return (
    <div className="book-card mat-elevation-z8 h-100 d-flex flex-column align-items-center position-relative py-1">
      <div className="book-foto-wrapper">
        <img src={imageUrl} className="book-detail-image" alt="Foto of the Author"/>
      </div>

      {state.book.series && <div className="series">Book {state.book.numberWithinSeries} of
        <Link className="ms-1 series series-link" onClick={() => openSeriesDialog()}>{state.book.series}</Link>
      </div>
      }
      <div className="title">{state.book.title}</div>
      <div className="subtitle">{state.book.subtitle}</div>
      <div className="author">by <NavLink to={"/author/" + state.book.authorId}>{state.book.authorFullName}</NavLink></div>
      <div className="first-published">first published {state.book.firstPublished?.toFormat("dd.LL.yyyy")}</div>

      <BookCardLibraryMarker assignmentStatus={state.book.assignmentStatus!} changeStatus={stat => handleAssignmentStatusChange(stat)}/>
      <div onClick={() => openBookDetailDialog()} className="show-details-link btn-link cursor-pointer">open details</div>

      <ConfirmationDialog show={state.showSeriesDialog} title={state.book.series!} confirmButtonType="danger"
                          dismissDialog={() => dismissSeriesDialog()} cancelButtonText="go back"
                          message="Got me :)<br /><br />In a <u>real application</u> this could display the series with all it's books.<br/>This feature is not part of the demo though and therefore <strong>not implemented</strong> - sorry!"
      />
      <BookDetailDialog book={state.book} show={state.showBookDetailDialog} dismissDialog={() => dismissBookDetailDialog()}/>
    </div>
  )
}

export default memo(BookCard);



