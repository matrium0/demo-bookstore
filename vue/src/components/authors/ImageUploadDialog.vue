<template>
  opened: {{ opened }}
  <q-dialog :model-value=opened>
    <q-card class="my-card" style="min-width: 280px">
      <div class="mx-4 my-3">
        <div class="d-flex align-items-center justify-content-between">
          <h2>Upload foto</h2>
          <font-awesome-icon icon="times" size="2x"/>
        </div>

        <div class="row d-flex justify-content-center align-items-center">
          <input type="file" @change="onFileUpload($event)" accept="image/jpeg, image/png" class="form-control">
          <div class="text-danger font-weight-bold ml-3" style="font-size: 1.1em">{{ feedback }}</div>
        </div>
        <div class="row justify-content-center cropper-wrapper mt-3">
          <img v-if="imageUrl" id="image" :src="imageUrl" alt="image" style="max-width: 100%">
        </div>
        <div class="row mt-3">
          <div class="col p-0 d-flex justify-content-between">
            <button @click="dismissDialog()" class="btn btn-secondary btn-lg">Cancel</button>
            <button v-if="croppedImageReady" @click="closeDialogAndReturnImageUrl()" class="btn btn-primary btn-lg">
              &nbsp;OK&nbsp;
            </button>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type {Ref} from 'vue';
import {ref} from 'vue';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import Options = Cropper.Options;

defineProps<{
  opened: boolean
}>()
const emit = defineEmits(['closeDialog'])

const fileInput: Ref<any> = ref(null); //TODO Type?
const imageUrl: Ref<string | null> = ref(null);
const croppedImageReady: Ref<boolean> = ref(false);
const imageBlob: Ref<Blob | null> = ref(null);

const feedback: Ref<string | null> = ref(null);

const cropper: Ref<Cropper | null> = ref(null);


const cropperOptions: Options = {
  aspectRatio: 0.875,
  viewMode: 2,
  minCropBoxHeight: 50,
  minCropBoxWidth: 43.5,
  checkCrossOrigin: false,
  checkOrientation: false,
  cropend: () => cropImage(),
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function cropImage(): void {
  croppedImageReady.value = false;
  const cropperHiddenElement: any = document.querySelector('.cropper-hidden');
  if (cropperHiddenElement) {
    cropperHiddenElement.cropper.getCroppedCanvas().toBlob(
      (blob: Blob) => {
        imageBlob.value = blob;
        croppedImageReady.value = true;
        //TODO why?
        // this.changeDetectorRef.detectChanges();
      },
      'image/jpeg',
      0.8
    );
  }
}

function onFileUpload(event: Event): void {
  const element = event.currentTarget as HTMLInputElement;
  const fileList: FileList | null = element.files;
  if (fileList != null) {
    const file = fileList[0];
    feedback.value = '';

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (ev: any) => {
        if (ev.target.result.length > 5000000) {
          console.log('file is to big, cancelling');
          feedback.value = 'Fehler! Die Datei darf nicht über 4MB haben';
          return;
        }
        imageUrl.value = ev.target.result;
        setTimeout(() => createCropper(), 0);
      };
    }
  }
}

function createCropper(): void {
  const imageElement: any = document.getElementById('image') as HTMLInputElement;
  if (imageElement) {
    if (cropper.value) {
      cropper.value.destroy();
    }
    cropper.value = new Cropper(imageElement, cropperOptions);
    setTimeout(() => cropImage(), 0);
  }
}

function closeDialogAndReturnImageUrl(): void {
  emit('closeDialog', imageBlob.value);
}

function dismissDialog(): void {
  emit('closeDialog', null);
}

</script>

<style scoped>

</style>
