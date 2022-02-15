<template>
  <div class="book-card mat-elevation-z8 h-100 d-flex flex-column align-items-center position-relative py-1">
    <div class="book-foto-wrapper">
      <img :src="imageUrl" class="book-image" alt="Foto of the Author">
    </div>
    <div v-if="book?.series" class="series">Book {{ book?.numberWithinSeries }} of
      <span>{{ book?.series }}</span>
      <!--      //TODO confirmation dialog-->
      <!--      <span appConfirmation confirmTitle="{{book?.series}}" cancelButtonText="go back" [hideConfirmButton]="true"-->
      <!--            confirmMessage="Got me :)<br /><br />In a <u>real application</u> this could display the series with all it's books.<br/>This feature is not part of the demo though and therefore <strong>not implemented</strong> - sorry!"-->
      <!--            class="btn-link cursor-pointer"-->
      <!--      >{{book?.series}}</span>-->
    </div>
    <div class="title">{{ book?.title }}</div>
    <div class="subtitle">{{ book?.subtitle }}</div>

    <div class="author">by
      <router-link to="/author/{{book?.authorId}}">
        {{ book?.authorFullName }}
      </router-link>
    </div>
    <div class="first-published">first published {{ book?.firstPublished?.toFormat("dd.LL.yyyy") }}</div>

    //TODO library marker
    <!--    <app-is-in-library-marker [status]="book?.assignmentStatus" (statusChange)="statusChange($event)" class="isinlibrary-button"></app-is-in-library-marker>-->
    <div @click="openDetails()" class="show-details-link btn-link cursor-pointer">open details</div>
  </div>
</template>

<script setup lang="ts">
import type {Ref} from 'vue';
import {onMounted, ref} from "vue";
import type {EnrichedBook} from '../../../../react/src/mock-backend/util/book-utils';
import type {UserBookAssignmentStatus} from '../../../../react/src/mock-backend/user/user-book-assignment-status';
import {createImageUrlFromBlob} from '@/util/ImageService';
import {setGlobalMessage} from '@/components/shared/GlobalMessageService';

const imageUrl: Ref<string | undefined> = ref(undefined);
// ngOnInit(): void {
//   if (!this.book) {
//   throw new Error("BookCardComponent requires book as Input to work");
// }
// this.imageUrl = this.imageService.createImageUrlFromBlob(this.book.image!);
// }
const emit = defineEmits(['openDetail', 'statusChanged'])

const props = defineProps<{
  book: EnrichedBook
}>()
onMounted(() => {
  console.log(`onMounted BookCard`, props.book);
  imageUrl.value = createImageUrlFromBlob(props.book.image);
})

function openDetails() {
  emit('openDetail', props.book);
}

function statusChange(status: UserBookAssignmentStatus) {
  const originalStatus = props.book.assignmentStatus;
  emit('statusChanged', {book: props.book, status});

  if (originalStatus === "default") {
    setGlobalMessage("info", "Book is added to \"Your Books\"")
  }
}
</script>

<style scoped>
.book-card {
  border: 2px solid gray;
  border-radius: 10px;

}

.author, .author * {
  font-size: 1rem;
}

.title {
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  line-height: 1.4rem;
}

.subtitle {
  font-size: 1.2rem;
  text-align: center;
}

.book-image {
  height: 100px;
}

.first-published {
  color: #656565;
  font-size: 0.8rem
}

.isinlibrary-button {
  position: absolute;
  bottom: 14px;
}

.show-details-link {
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  bottom: 3px;
}

a, .btn-link {
  color: #0d6efd;
}
</style>
