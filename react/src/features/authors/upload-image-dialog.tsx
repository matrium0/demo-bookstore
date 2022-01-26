import React, {ChangeEvent, memo, useRef, useState} from 'react';
import {Dialog} from '@mui/material';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Cropper} from 'react-cropper';

interface UploadImageDialogProps {
  show: boolean,
  closeImageUploadDialog: (image?: Blob) => void
}

interface UploadImageDialogState {
  imageUrl?: string;
  blob?: Blob;
}

const UploadImageDialog = (props: UploadImageDialogProps) => {
  const [state, setState] = useState<UploadImageDialogState>({});
  const cropperRef = useRef<HTMLImageElement>(null);
  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    console.log(cropper.getCroppedCanvas().toDataURL());

    cropper.getCroppedCanvas().toBlob((blob: Blob) => {
      setState({...state, blob});
    })
  };
  // cropperHiddenElement.cropper.getCroppedCanvas().toBlob(
  //   (blob: Blob) => {
  //     this.imageBlob = blob;

  function acceptFileAndCloseDialog() {
    return undefined;
  }

  function handleFileUpload(event: ChangeEvent) {
    console.log("handleFileUpload")

    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList != null) {
      const file = fileList[0];
      // this.feedback = '';

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (ev: any) => {
          if (ev.target.result.length > 5000000) {
            console.log('file is to big, cancelling');
            //TODO feedback
            // this.feedback = 'Fehler! Die Datei darf nicht über 4MB haben';C
            return;
          }
          setState({imageUrl: ev.target.result})

          // this.imageUrl = ev.target.result;
          // setTimeout(() => this.createCropper(), 0);
        };
      }
    }
  }

  function dismissDialog() {
    console.log("dismissDialog");
    props.closeImageUploadDialog(undefined)
  }

  function closeDialogAndReturnImageUrl() {
    console.log("closeDialogAndReturnImageUrl");
    props.closeImageUploadDialog(state.blob);
  }

  return (
    <Dialog onClose={() => dismissDialog()} open={props.show}>
      <div className="mx-4 my-3" style={{minWidth: 300, minHeight: 300}}>
        <div className="d-flex align-items-center justify-content-between">
          <h2>Upload foto</h2>
          <FontAwesomeIcon icon={faTimes} size={'2x'}/>
        </div>

        <input type="file" name="file" onChange={(event) => handleFileUpload(event)} className="mt-4"/>

        <Cropper
          src={state.imageUrl}
          style={{height: 400, width: "100%"}}
          cropend={onCrop}
          ref={cropperRef}
          // Cropper.js options
          aspectRatio={0.875}
          viewMode={2}
          minCropBoxHeight={50}
          minCropBoxWidth={43.5}
          checkCrossOrigin={false}
          checkOrientation={false}
        />

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
