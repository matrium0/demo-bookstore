<template>
  opened: {{ opened }}
  <q-dialog :model-value=opened>
    <q-card class="my-card" style="min-width: 280px">
      <div class="mx-4 my-3">
        <div class="d-flex align-items-center justify-content-between">
          <h2>Upload foto</h2>
          <font-awesome-icon icon="times" size="2x"/>
        </div>

        <input type="file" name="file" class="mt-4 w-100" @change="handleFileUpload"/>
        <vueCropper
          ref="cropper"
          :img="imageUrl"
        ></vueCropper>

        <img :src="imageUrl">
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type {Ref} from 'vue';
import {ref} from 'vue';

defineProps<{
  opened: boolean
}>()
const imageUrl: Ref<string | null> = ref(null)
const cropper = ref(null);

function handleFileUpload(event: any) { //TODO correct type?
  console.log("handleFileUpload", event)

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
          return;
        }
        imageUrl.value = ev.target.result;
        console.log("imageUrl", imageUrl.value);
        setTimeout(() => onCrop(), 100);
      };
    }
  }
}

const onCrop = () => {
  console.log("onCrop");
  // //TODO implement
  // const cr: any = cropper;
  // // const cr: any = imageElement?.cropper;
  // console.log(cr.getCroppedCanvas().toDataURL());

  //TODo return blob to authorEdit
  // cropper.getCroppedCanvas().toBlob((blob: Blob) => {
  //   setState({...state, blob});
  // })
};
</script>

<style scoped>

</style>
