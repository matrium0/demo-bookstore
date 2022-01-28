import {NavLink} from 'react-router-dom';
import {EnrichedBook} from '../../util/book-utils';
import {memo} from 'react';
import "./book-card.scss";

interface BookCardProps {
  book: EnrichedBook;
}

const BookCard = (props: BookCardProps) => {

  const imageUrl = URL.createObjectURL(props.book.image);

  function openDetails() {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="book-card mat-elevation-z8 h-100 d-flex flex-column align-items-center position-relative py-1">
      <div className="book-foto-wrapper">
        <img src={imageUrl} className="book-image" alt="Foto of the Author"/>
      </div>
      {props.book.series && <div className="series">Book {props.book.numberWithinSeries} of
        {/*TODO app confirmation dialog*/}
        {/*<span appConfirmation confirmTitle="{book.series}" cancelButtonText="go back" [hideConfirmButton]="true"*/}
        {/*confirmMessage="Got me :)<br /><br />In a <u>real application</u> this could display the series with all it's books.<br/>This feature is not part of the demo though and therefore <strong>not implemented</strong> - sorry!"*/}
        {/*className="btn-link cursor-pointer"*/}
        {/*>{book.series}</span>*/}
      </div>
      }
      <div className="title">{props.book.title}</div>
      <div className="subtitle">{props.book.subtitle}</div>
      <div className="author">by <NavLink to="/author/{book.authorId}">{props.book.authorFullName}</NavLink></div>
      <div className="first-published">first published {props.book.firstPublished?.toFormat("dd.LL.yyyy")}</div>

      {/*TODO is in library marker*/}
      {/*<app-is-in-library-marker [status]="book.assignmentStatus" (statusChange)="statusChange($event)" className="isinlibrary-button"></app-is-in-library-marker>*/}
      <div onClick={() => openDetails()} className="show-details-link btn-link cursor-pointer">open details</div>
    </div>


  )
}

export default memo(BookCard);



