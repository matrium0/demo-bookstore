import React, {memo, useState} from 'react';
import {EnrichedBook} from '../../util/book-utils';
import {Dialog, Link} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {useNavigate} from 'react-router-dom';
import ConfirmationDialog from '../../shared/confirmation-dialog';

interface BookDetailDialogProps {
  book: EnrichedBook,
  show: boolean,
  dismissDialog: () => void,
}

const BookDetailDialog = (props: BookDetailDialogProps) => {
  const [state, setState] = useState({showSeriesDialog: false})
  const imageUrl = URL.createObjectURL(props.book.image!);
  const navigate = useNavigate();

  function dismissDialog() {
    props.dismissDialog();
  }

  function navigateToBookEditPage() {
    navigate("/library/edit/" + props.book.id);
  }

  function openSeriesDialog() {
    setState({showSeriesDialog: true});
  }

  function navigateToAuthorDetail() {
    //TODO need to load author
    // navigate("/author/" + props.book.id);
  }

  function dismissSeriesDialog() {
    setState({showSeriesDialog: false});
  }

  return (
    <Dialog onClose={() => dismissDialog()} open={props.show}>
      <div className="p-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <h1>{props.book.title}</h1>
            <button onClick={() => navigateToBookEditPage()} className="btn btn-warning btn-lg ms-2 ms-lg-4 me-5">edit</button>
          </div>
          <FontAwesomeIcon onClick={() => dismissDialog()} icon={faTimes} size={'2x'}/>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div>
            <div className="subtitle">{props.book.subtitle}</div>
            {props.book.series && <div className="series fs-5">Book {props.book.numberWithinSeries} of
              <Link className="ms-1 series fs-5" onClick={() => openSeriesDialog()}>{props.book.series}</Link>
            </div>
            }
            <div className="mt-2 by-label">by <Link onClick={() => navigateToAuthorDetail()}
                                                    className="by-label">{props.book.authorFullName}</Link></div>
            <div className="mt-2 first-published">first published {props.book.firstPublished?.toFormat("dd.LL.yyyy")}</div>

            <div className="description">{props.book.description}</div>
          </div>
          <div className="book-foto-wrapper ms-0 ms-md-4">
            <img src={imageUrl} alt="Foto of the Author" className="book-image"/>
          </div>
        </div>
      </div>
      <ConfirmationDialog show={state.showSeriesDialog} title={props.book.series!} confirmButtonType="danger"
                          dismissDialog={() => dismissSeriesDialog()} cancelButtonText="go back"
                          message="Got me :)<br /><br />In a <u>real application</u> this could display the series with all it's books.<br/>This feature is not part of the demo though and therefore <strong>not implemented</strong> - sorry!"
      />
    </Dialog>
  )
}

export default memo(BookDetailDialog);
