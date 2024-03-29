<template>
  <q-dialog v-if="props.book" :model-value="show" @hide="closeBookDetailDialog">
    <q-card class="my-card p-4" style="min-width: 280px">
      <div class="d-flex align-items-start align-items-md-center justify-content-start flex-column flex-md-row">
        <h1 class="book-detail-header">{{ book?.title }}</h1>
        <button @click="navigateToBookEditPage()" class="btn btn-warning ms-0 ms-md-4 me-4">edit</button>
      </div>
      <div class="d-flex flex-column flex-md-row">
        <div>
          <div class="subtitle">{{ book?.subtitle }}</div>
          <div v-if="book?.series" class="series">Book {{ book?.numberWithinSeries }} of
            <a @click="openSeriesDialog" role="button" class="series-link">{{ book?.series }}</a>
            <ConfirmationDialog :show=showSeriesDialog :title="book.series" confirmButtonType="danger" :hide-confirm-button="true"
                                @closeDialog="closeSeriesDialog" cancelButtonText="go back"
                                message="Got me :)<br /><br />In a <u>real application</u> this could display the series with all it's books.<br/>This feature is not part of the demo though and therefore <strong>not implemented</strong> - sorry!"
            />
          </div>
          <div class="mt-2 author">by
            <a @click="navigateToAuthor()"> {{ book?.authorFullName }}</a>
            <div class="mt-2 first-published">first published {{ book?.firstPublished?.toFormat("dd.LL.yyyy") }}</div>

            <div class="description" v-html="book?.description"></div>
          </div>
        </div>
        <div class="book-foto-wrapper ms-0 ms-md-4">
          <img :src="imageUrl" class="book-image" alt="Foto of the Author">
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import ConfirmationDialog from '@/components/shared/ConfirmationDialog.vue';
import type {EnrichedBook} from '../../../../react/src/mock-backend/util/book-utils';
import {onMounted, ref, toRefs} from 'vue';
import {createImageUrlFromBlob} from '@/util/ImageService';
import router from '@/router';

const showSeriesDialog = ref(false);

const props = defineProps<{
  show: boolean,
  book?: EnrichedBook | null
}>();
const emit = defineEmits(['closeDialog']);
const imageUrl = ref<string | undefined>(undefined);

const show = toRefs(props).show;

onMounted(() => {
  console.log(`onMounted BookDetailDialog - creating image from blob`, props.book);
  if (props.book) {
    imageUrl.value = createImageUrlFromBlob(props.book.image);
  }
})

function closeBookDetailDialog() {
  emit("closeDialog");
}

function navigateToBookEditPage() {
  emit("closeDialog");
  router.push("/library/edit/" + props?.book?.id);
}

function openSeriesDialog() {
  showSeriesDialog.value = true;
}

function closeSeriesDialog() {
  console.log("handle close series dialog");
  showSeriesDialog.value = false;
}

function navigateToAuthor() {
  emit("closeDialog");
  router.push("/author/" + props?.book?.authorId);
}
</script>

<style scoped lang="scss">
.subtitle {
  font-size: 1.3rem;
}

.first-published {
  color: #656565;
  font-size: 0.8rem
}

.description {
  font-size: 0.7rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
}

.book-image {
  width: 186px;
}

@media (min-width: 600px) {
  .q-dialog__inner--minimized > div {
    max-width: 900px;
  }
}

a, .btn-link, .series-link {
  color: #0d6efd !important;
  cursor: pointer !important;
  text-decoration: underline !important;
}
</style>
