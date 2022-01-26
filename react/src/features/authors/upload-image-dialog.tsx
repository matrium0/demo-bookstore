import React, {memo} from 'react';
import {Dialog} from '@mui/material';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface UploadImageDialogProps {
  show: boolean,
  closeImageUploadDialog: (image: Blob | null) => void
}


const UploadImageDialog = (props: UploadImageDialogProps) => {

  function acceptFileAndOpenDialog() {
    return undefined;
  }

  function changeHandler() {
    console.log("changehandler")
  }

  function dismissDialog() {
    console.log("dismissDialog");
    props.closeImageUploadDialog(null)
  }

  function closeDialogAndReturnImageUrl() {
    console.log("closeDialogAndReturnImageUrl");
    //TODO return image
    props.closeImageUploadDialog(null)
  }

  return (
    <Dialog onClose={() => dismissDialog()} open={props.show}>
      <div className="mx-4 my-3" style={{minWidth: 300, minHeight: 300}}>
        <div className="d-flex align-items-center justify-content-between">
          <h2>Upload foto</h2>
          <FontAwesomeIcon icon={faTimes} size={'2x'}/>
        </div>

        <input type="file" name="file" onChange={changeHandler} className="mt-4"/>
        <div className="mt-3">
          <div className="col d-flex justify-content-between">
            <button onClick={() => dismissDialog()} className="btn btn-secondary btn-lg">Cancel</button>
            <button onClick={() => closeDialogAndReturnImageUrl()} className="btn btn-primary btn-lg">
              &nbsp;OK&nbsp;
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default memo(UploadImageDialog);
