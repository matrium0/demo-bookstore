import {NavLink} from 'react-router-dom';
import {EnrichedBook} from '../../mock-backend/util/book-utils';
import React, {memo, useState} from 'react';
import "./book-card.scss";
import {Link} from '@mui/material';
import ConfirmationDialog from '../../shared/confirmation-dialog';
import BookDetailDialog from './book-detail-dialog';

interface BookCardProps {
  book: EnrichedBook;
}

const BookCard = (props: BookCardProps) => {
  const [state, setState] = useState({
    showSeriesDialog: false,
    showBookDetailDialog: false
  })
  const imageUrl = URL.createObjectURL(props.book.image!);

  function openSeriesDialog() {
    setState({showSeriesDialog: true, showBookDetailDialog: false});
  }

  function dismissSeriesDialog() {
    setState({showSeriesDialog: false, showBookDetailDialog: false});
  }

  function openBookDetailDialog() {
    setState({showSeriesDialog: false, showBookDetailDialog: true});
  }

  function dismissBookDetailDialog() {
    setState({showSeriesDialog: false, showBookDetailDialog: false});
  }

  return (
    <div className="book-card mat-elevation-z8 h-100 d-flex flex-column align-items-center position-relative py-1">
      <div className="book-foto-wrapper">
        <img src={imageUrl} className="book-detail-image" alt="Foto of the Author"/>
      </div>
      {props.book.series && <div>Book {props.book.numberWithinSeries} of
        <Link className="ms-1 series" onClick={() => openSeriesDialog()}>{props.book.series}</Link>
      </div>
      }
      <div className="title">{props.book.title}</div>
      <div className="subtitle">{props.book.subtitle}</div>
      <div className="author">by <NavLink to={"/author/" + props.book.authorId}>{props.book.authorFullName}</NavLink></div>
      <div className="first-published">first published {props.book.firstPublished?.toFormat("dd.LL.yyyy")}</div>

      {/*TODO add library marker feature here*/}
      {/*<app-is-in-library-marker [status]="book.assignmentStatus" (statusChange)="statusChange($event)" className="isinlibrary-button"></app-is-in-library-marker>*/}
      <div onClick={() => openBookDetailDialog()} className="show-details-link btn-link cursor-pointer">open details</div>

      <ConfirmationDialog show={state.showSeriesDialog} title={props.book.series!} confirmButtonType="danger"
                          dismissDialog={() => dismissSeriesDialog()} cancelButtonText="go back"
                          message="Got me :)<br /><br />In a <u>real application</u> this could display the series with all it's books.<br/>This feature is not part of the demo though and therefore <strong>not implemented</strong> - sorry!"
      />
      <BookDetailDialog book={props.book} show={state.showBookDetailDialog} dismissDialog={() => dismissBookDetailDialog()}/>
    </div>
  )
}

export default memo(BookCard);



