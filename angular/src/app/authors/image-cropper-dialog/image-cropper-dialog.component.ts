import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import Cropper from 'cropperjs';
import Options = Cropper.Options;

@Component({
  selector: 'app-image-cropper-dialog',
  templateUrl: './image-cropper-dialog.component.html',
  styleUrls: ['./image-cropper-dialog.component.scss'],
})
export class ImageCropperDialogComponent {
  @ViewChild('fileInput')
  fileInputElementRef?: ElementRef;

  croppedImageReady = false;
  imageBlob?: Blob;
  imageUrl = '';
  feedback = '';

  private cropper?: Cropper;
  private cropperOptions: Options = {
    aspectRatio: 0.875,
    viewMode: 2,
    minCropBoxHeight: 50,
    minCropBoxWidth: 43.5,
    checkCrossOrigin: false,
    checkOrientation: false,
    cropend: () => this.cropImage(),
  };

  constructor(
      private changeDetectorRef: ChangeDetectorRef,
      public dialogRef: MatDialogRef<ImageCropperDialogComponent>
  ) {
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  cropImage(): void {
    this.croppedImageReady = false;
    const cropperHiddenElement: any = document.querySelector('.cropper-hidden');
    if (cropperHiddenElement) {
      cropperHiddenElement.cropper.getCroppedCanvas().toBlob(
          (blob: Blob) => {
            this.imageBlob = blob;
            this.croppedImageReady = true;
            this.changeDetectorRef.detectChanges();
          },
          'image/jpeg',
          0.8
      );
    }
  }

  onFileUpload(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList != null) {
      const file = fileList[0];
      this.feedback = '';

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (ev: any) => {
          if (ev.target.result.length > 5000000) {
            console.log('file is to big, cancelling');
            this.feedback = 'Fehler! Die Datei darf nicht über 4MB haben';
            return;
          }
          this.imageUrl = ev.target.result;
          setTimeout(() => this.createCropper(), 0);
        };
      }
    }
  }

  createCropper(): void {
    const imageElement: any = document.getElementById('image') as HTMLInputElement;
    if (imageElement) {
      if (this.cropper) {
        this.cropper.destroy();
      }
      this.cropper = new Cropper(imageElement, this.cropperOptions);
      setTimeout(() => this.cropImage(), 0);
    }
  }

  closeDialogAndReturnImageUrl(): void {
    this.dialogRef.close(this.imageBlob);
  }

  dismissDialog(): void {
    this.dialogRef.close();
  }
}
