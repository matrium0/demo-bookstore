import React, {memo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {Dialog} from '@mui/material';
import sanitize from 'sanitize-html';

const defaultOptions = {
  allowedTags: ['p', 'b', 'i', 'em', 'strong', 'h1', 'h2', 'h3', 'h4', 'h5'],
};

interface ConfirmationDialogProps {
  show: boolean,
  title: string,
  message: string,
  cancelButtonText: string,
  confirmButtonType: "success" | "danger" | "primary",
  confirmButtonText?: string,

  actionAfterConfirm?: () => void;
  dismissDialog: () => void
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const valid = sanitize(props.message, defaultOptions);
  if (!valid) {
    throw new Error("invalid html");
  }

  function dismissDialog() {
    props.dismissDialog();
  }

  function confirmClicked() {
    if (props.actionAfterConfirm) {
      props.actionAfterConfirm();
    }
  }

  return (
    <Dialog onClose={() => dismissDialog()} open={props.show}>
      <div className="mx-4 my-3">
        <div className="d-flex align-items-center justify-content-between">
          <h2>{props.title}</h2>
          <FontAwesomeIcon onClick={() => dismissDialog()} icon={faTimes} size={'2x'}/>
        </div>
        <div className="dialog-content mt-3">
          <div dangerouslySetInnerHTML={{__html: (props.message)}}/>
        </div>
        <div className="col d-flex align-items-center justify-content-between mt-4">
          <button className="btn btn-secondary btn-lg" onClick={() => dismissDialog()}>{props.cancelButtonText}</button>
          {props.confirmButtonText &&
            <button className={"btn btn-" + props.confirmButtonType + " btn-lg"} onClick={() => confirmClicked()}>
              {props.confirmButtonText}
            </button>
          }
        </div>
      </div>
    </Dialog>
  )
}

export default memo(ConfirmationDialog);
