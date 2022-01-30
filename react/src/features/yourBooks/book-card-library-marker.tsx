import React, {memo, useState} from 'react';
import {UserBookAssignmentStatus} from '../../mock-backend/user/user-book-assignment-status';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBookmark, faBookReader, faCheck} from '@fortawesome/free-solid-svg-icons';
import {Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from '@mui/material';
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
  }

  function toggleMenuCollapsed() {
    console.log("toggle menu", !state.isMenuCollapsed);
    setState({isMenuCollapsed: !state.isMenuCollapsed});
  }

  return (
    <>
      <ButtonGroup ref={anchorRef} variant="contained" aria-label="split button">
        {props.assignmentStatus === "default" &&
          <button onClick={() => changeStatus('want to read')} type="button" className="btn btn-secondary btn-sm btn-main">
            want to read
          </button>
        }

        {props.assignmentStatus !== "default" &&
          <div className="already-chosen-button d-flex align-items-center justify-content-center">
            <span className="ms-2">{props.assignmentStatus}</span>
            {props.assignmentStatus === 'want to read' && <FontAwesomeIcon icon={faBookmark} className="mx-2 icon-want-to-read"/>}
            {props.assignmentStatus === 'currently reading' &&
              <FontAwesomeIcon icon={faBookReader} className="mx-2 icon-currently-reading"/>}
            {props.assignmentStatus === 'read' && <FontAwesomeIcon icon={faCheck} className="mx-2 icon-read"/>}
          </div>
        }
        {/*<Button onClick={handleClick}>{options[selectedIndex]}</Button>*/}
        <Button
          size="small"
          aria-controls={state.isMenuCollapsed ? undefined : 'split-button-menu'}
          aria-expanded={state.isMenuCollapsed ? undefined : 'true'}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={toggleMenuCollapsed}
        >
          <FontAwesomeIcon icon={faCaretDown} className=""/>
        </Button>
      </ButtonGroup>
      <Popper
        open={state.isMenuCollapsed}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => toggleMenuCollapsed()}>
                <MenuList id="split-button-menu">
                  {props.assignmentStatus === 'want to read' &&
                    <MenuItem key={1} onClick={() => changeStatus('want to read')}>want to read</MenuItem>
                  }
                  {props.assignmentStatus === 'currently reading' &&
                    <MenuItem key={1} onClick={() => changeStatus('currently reading')}>currently reading</MenuItem>
                  }
                  {props.assignmentStatus === 'default' &&
                    <MenuItem key={1} onClick={() => changeStatus('default')}>not interested</MenuItem>
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <div className="btn-group mb-3 position-relative">
        {props.assignmentStatus === "default" &&
          <button onClick={() => changeStatus('want to read')} type="button" className="btn btn-secondary btn-sm btn-main">
            want to read
          </button>
        }

        {props.assignmentStatus !== "default" &&
          <div className="already-chosen-button d-flex align-items-center justify-content-center">
            <span className="ms-2">{props.assignmentStatus}</span>
            {props.assignmentStatus === 'want to read' && <FontAwesomeIcon icon={faBookmark} className="mx-2 icon-want-to-read"/>}
            {props.assignmentStatus === 'currently reading' &&
              <FontAwesomeIcon icon={faBookReader} className="mx-2 icon-currently-reading"/>}
            {props.assignmentStatus === 'read' && <FontAwesomeIcon icon={faCheck} className="mx-2 icon-read"/>}
          </div>
        }

        <button onClick={toggleMenuCollapsed} type="button" className="btn btn-secondary btn-sm dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown" aria-expanded="false">
          <span className="visually-hidden">Toggle Dropdown</span>
        </button>

        {/*x{!!state.isMenuCollapsed}x*/}

        {/*{state.isMenuCollapsed &&*/}
        {/*<ul className={"lib-marker-dropdown-menu cursor-pointer " + state.isMenuCollapsed ? 'd-none' : 'd-block'}>*/}
        <div className="lib-marker-dropdown-menu">
          <ul className={"cursor-pointer "}>
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
      </div>
    </>
  );
}

export default memo(BookCardLibraryMarker);

