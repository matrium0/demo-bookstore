import React, {memo, useState} from 'react';
import {UserBookAssignmentStatus} from '../../mock-backend/user/user-book-assignment-status';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBookmark, faBookReader, faCheck} from '@fortawesome/free-solid-svg-icons';
import {ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from '@mui/material';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons/faCaretDown';

interface BookCardLibraryMarkerProps {
  assignmentStatus: UserBookAssignmentStatus
  changeStatus: (newStatus: UserBookAssignmentStatus) => void
}

interface BookCardLibraryMarkerState {
  isMenuCollapsed: boolean
}

const BookCardLibraryMarker = (props: BookCardLibraryMarkerProps) => {
  const [state, setState] = useState<BookCardLibraryMarkerState>({isMenuCollapsed: true})
  const anchorRef = React.useRef(null);

  function changeStatus(wantToRead: UserBookAssignmentStatus) {
    props.changeStatus(wantToRead);
    toggleMenuCollapsed();
  }

  function toggleMenuCollapsed() {
    console.log("toggle menu", !state.isMenuCollapsed);
    setState({isMenuCollapsed: !state.isMenuCollapsed});
  }

  return (
    <>
      <ButtonGroup ref={anchorRef} variant="contained" aria-label="split button" className="library-marker-button-group">
        {props.assignmentStatus === "default" &&
          <button onClick={() => changeStatus('want to read')} type="button" className="btn btn-secondary btn-sm btn-main btn-split-left">
            want to read
          </button>
        }
        {props.assignmentStatus !== "default" &&
          <div className="already-chosen-button btn-split-left d-flex align-items-center justify-content-center">
            <span className="ms-2">{props.assignmentStatus}</span>
            {props.assignmentStatus === 'want to read' && <FontAwesomeIcon icon={faBookmark} className="mx-2 icon-want-to-read"/>}
            {props.assignmentStatus === 'currently reading' &&
              <FontAwesomeIcon icon={faBookReader} className="mx-2 icon-currently-reading"/>}
            {props.assignmentStatus === 'read' && <FontAwesomeIcon icon={faCheck} className="mx-2 icon-read"/>}
          </div>
        }
        <button onClick={toggleMenuCollapsed} type="button" className="btn btn-secondary btn-sm btn-split-right"
                data-bs-toggle="dropdown" aria-expanded="false">
          <FontAwesomeIcon icon={faCaretDown} className=""/>
        </button>
      </ButtonGroup>
      <Popper
        open={state.isMenuCollapsed} anchorEl={anchorRef.current} role={undefined} transition disablePortal
        style={{zIndex: 100}}
      >
        {({TransitionProps, placement}) => (
          <Grow {...TransitionProps} style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}>
            <Paper>
              <ClickAwayListener onClickAway={() => setState({isMenuCollapsed: true})}>
                <MenuList id="split-button-menu">
                  {props.assignmentStatus !== 'want to read' &&
                    <MenuItem key={1} onClick={() => changeStatus('want to read')}>want to read</MenuItem>
                  }
                  {props.assignmentStatus !== 'read' &&
                    <MenuItem key={2} onClick={() => changeStatus('read')}>read</MenuItem>
                  }
                  {props.assignmentStatus !== 'currently reading' &&
                    <MenuItem key={3} onClick={() => changeStatus('currently reading')}>currently reading</MenuItem>
                  }
                  {props.assignmentStatus !== 'default' &&
                    <MenuItem key={4} onClick={() => changeStatus('default')}>not interested</MenuItem>
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default memo(BookCardLibraryMarker);

