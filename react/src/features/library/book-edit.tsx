import React, {memo, useState} from 'react';
import LuxonAdapter from '@date-io/luxon';
import {LocalizationProvider} from '@mui/lab';
import {Paper} from '@mui/material';
import LoadingIndicatorWrapper from '../../shared/loading-indicator-wrapper';
import {EnrichedBook} from '../../mock-backend/util/book-utils';

interface BookEditState {
  loading: boolean;
  book: EnrichedBook,

  showDeleteDialog: boolean
}

const BookEdit = () => {
  const [state, setState] = useState<BookEditState>({loading: true, book: {}, showDeleteDialog: true});

  function openDeleteDialog() {
    //TODO open delete dialog
  }

  return (
    <LocalizationProvider dateAdapter={LuxonAdapter}>
      <div className="comp-wrapper">
        <Paper elevation={8} className="app-col">
          <div className="title-row">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <h1>
                {/*{!state.author.id && !state.loading && "New Author"}*/}
                {/*{state.author.id && state.author?.firstname + " " + state.author?.lastname}*/}
              </h1>
            </div>
            <button onClick={() => openDeleteDialog()} className="btn btn-danger btn-lg me-4">delete</button>
          </div>
          <LoadingIndicatorWrapper loading={state.loading}>
            <div className="pb-3">
              <div className="row mx-3 gx-0 gx-lg-5">
                <div className="col-lg-6 pt-2">
                  <h2 className="mb-2">Personal Data</h2>
                </div>
              </div>
            </div>
          </LoadingIndicatorWrapper>
        </Paper>
      </div>
    </LocalizationProvider>
  )
}

export default memo(BookEdit);
