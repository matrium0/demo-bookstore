import React, {memo, useState} from 'react';
import {UserBookAssignmentStatus} from '../../mock-backend/user/user-book-assignment-status';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBookmark, faBookReader, faCheck} from '@fortawesome/free-solid-svg-icons';

interface BookCardLibraryMarkerProps {
  assignmentStatus: UserBookAssignmentStatus
  changeStatus: (newStatus: UserBookAssignmentStatus) => void
}

interface BookCardLibraryMarkerState {
  isMenuCollapsed: boolean
}

const BookCardLibraryMarker = (props: BookCardLibraryMarkerProps) => {
  const [state, setState] = useState<BookCardLibraryMarkerState>({isMenuCollapsed: true})

  function changeStatus(wantToRead: UserBookAssignmentStatus) {
    props.changeStatus(wantToRead);
  }

  function toggleMenuCollapsed() {
    console.log("toggle menu" , !state.isMenuCollapsed);
    setState({isMenuCollapsed: !state.isMenuCollapsed});
  }

  return (
    <div className="btn-group mb-3">
      {props.assignmentStatus === "default" &&
        <button onClick={() => changeStatus('want to read')} type="button" className="btn btn-secondary btn-sm btn-main">
          want to read
        </button>
      }

      {props.assignmentStatus !== "default" &&
        <div className="already-chosen-button d-flex align-items-center justify-content-center">
          <span className="ms-2">{props.assignmentStatus}</span>
          {props.assignmentStatus === 'want to read' && <FontAwesomeIcon icon={faBookmark} className="mx-2 icon-want-to-read"/>}
          {props.assignmentStatus === 'currently reading' && <FontAwesomeIcon icon={faBookReader} className="mx-2 icon-currently-reading"/>}
          {props.assignmentStatus === 'read' && <FontAwesomeIcon icon={faCheck} className="mx-2 icon-read"/>}
        </div>
      }

      <button onClick={toggleMenuCollapsed} type="button" className="btn btn-secondary btn-sm dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown" aria-expanded="false">
        <span className="visually-hidden">Toggle Dropdown</span>
      </button>
      x{!!state.isMenuCollapsed}x
      <ul className={"dropdown-menu cursor-pointer " + state.isMenuCollapsed ? 'd-none' : 'd-block'}>
        {props.assignmentStatus === 'want to read' &&
          <li>< a className="dropdown-item" onClick={() => changeStatus('want to read')}>want to read</a></li>
        }
        {props.assignmentStatus === 'currently reading' &&
          <li>< a className="dropdown-item" onClick={() => changeStatus('currently reading')}>currently reading</a></li>
        }
        {props.assignmentStatus === 'default' &&
          <li>< a className="dropdown-item" onClick={() => changeStatus('default')}>not interested</a></li>
        }
      </ul>
    </div>
  );
}

export default memo(BookCardLibraryMarker);

