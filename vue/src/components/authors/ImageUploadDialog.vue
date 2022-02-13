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
        <vue-cropper
          ref="cropper"
          :src="imageUrl"
          alt="Source Image"
        >
        </vue-cropper>

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

function handleFileUpload(event: any) { //TODO correct type?
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
          return;
        }
        imageUrl.value = ev.target.result;
        setTimeout(() => onCrop(), 100);
      };
    }
  }
}

const onCrop = () => {
  console.log("onCrop");
  //TODO implement
  const imageElement: any = cropperRef?.current;
  const cropper: any = imageElement?.cropper;
  console.log(cropper.getCroppedCanvas().toDataURL());

  cropper.getCroppedCanvas().toBlob((blob: Blob) => {
    setState({...state, blob});
  })
};
</script>

<style scoped>

</style>
