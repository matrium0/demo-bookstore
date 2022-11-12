<template>
  <div class="app-col">
    <div class="title-row-wrapper">
      <div class="title-row">
        <h1 v-if="!isLoading">{{ fullname }}</h1>
      </div>
    </div>

    <div>
      <LoadingIndicatorOverlayWrapper :show-overlay="isLoading" spinner-size="5x">
        <div class="row mx-1 mx-lg-2" style="min-height: 400px;">
          <div class="col-md-8">
            <template v-if="author">
              <div v-if="author?.penName" class="label mt-3"><strong>{{ fullname }}</strong> is a pen name of
                <strong>{{ author.fullRealName }}</strong></div>
              <div class="mt-3">
                <span class="label">Born {{ author?.birthdate?.toFormat("dd.LL.yyyy") }} in {{ author?.placeOfBirth }}</span>
                <span v-if="!author?.dateOfDeath" class="label">&nbsp;&nbsp;(Age {{ author?.age }})</span>
              </div>
              <div v-if="author?.dateOfDeath">
                <span class="label">Died {{ author?.dateOfDeath?.toFormat("dd.LL.yyyy") }}  in {{ author?.placeOfBirth }}</span>
                <span class="label">&nbsp;&nbsp;(Age {{ author?.age }})</span>
              </div>
              <div v-if="author.website" class="mt-3 label">Homepage: <a href="{{author?.website}}">{{ author?.website }}</a></div>
              <div class="label">Genre: {{ author?.genre }}</div>
              <div v-html="author?.note" class="mt-3 note"></div>
            </template>
          </div>
          <div class="col-md-4 d-flex flex-column align-items-center justify-content-start">
            <div class="foto-wrapper">
              <font-awesome-icon v-if="!imageUrl" icon="spinner" size="3x" class="fa-spin mt-5"/>
              <img v-if="imageUrl" :src="imageUrl" class="author-foto-img" alt="Foto of the Author">
            </div>
            <div class="mt-4">
              <h2>Books written by {{ fullname }}</h2>
              <font-awesome-icon v-if="isBooksLoading" icon="spinner" size="3x" class="fa-spin mt-5 ms-3"/>
              <div v-if="!isBooksLoading && books?.length === 0" class="ms-4">
                No books from {{ fullname }} saved - you can add some in the
                <router-link to="/library">Library</router-link>
              </div>
              <ul v-if="!isBooksLoading">
                <li v-for="book of books" :key="book.id">
                  <a @click="navigateToBookEditPage(book)">
                    {{ book.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 px-4 px-lg-5 mb-3 d-flex align-items-center justify-content-between ">
            <button @click="navigateBackToList()" class="btn btn-secondary btn-lg">
              &nbsp;back&nbsp;
            </button>
            <button @click="navigateToEditPage()" class="btn btn-warning px-4">
              &nbsp;edit&nbsp;
            </button>
          </div>
        </div>
      </LoadingIndicatorOverlayWrapper>
    </div>
  </div>

</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import type {Author} from '../../../../react/src/mock-backend/author/Author';
import type {Book} from '../../../../react/src/mock-backend/book/Book';
import type {EnrichedAuthor} from '../../../../react/src/mock-backend/author/EnrichedAuthor';
import {findAuthorById} from '../../../../react/src/mock-backend/author/author-mock-data';
import {findBooksOfAuthor} from '../../../../react/src/mock-backend/book/book-mock-data';
import {enrichWithCalculatedFields} from '../../../../react/src/mock-backend/author/author-util';
import LoadingIndicatorOverlayWrapper from '@/components/shared/LoadingIndicatorOverlayWrapper.vue';
import router from '@/router';
import {createImageUrlFromBlob} from '@/util/ImageService';
import './author-detail.scss';

const isLoading = ref(true);
const isBooksLoading = ref(true);
const imageUrl = ref<string | undefined>(undefined);
const books = ref<Book[]>([]);
const author = ref<EnrichedAuthor | null>(null);
const fullname = computed<string>((): string => `${author.value?.firstname} ${author.value?.lastname}`);

onMounted(() => {
  const id = router.currentRoute.value.params.id
  console.log(`onMounted`, id);
  loadAuthor(Number(id));
  loadBooksForAuthor(Number(id));
})

function loadAuthor(id: number) {
  findAuthorById(id).subscribe({
    next: (a: Author) => {
      console.log("loadAuthor SUCCESS", a);
      isLoading.value = false;
      author.value = enrichWithCalculatedFields(a);
      imageUrl.value = createImageUrlFromBlob(author.value.foto);
    },
  });
}

function loadBooksForAuthor(id: number) {
  isBooksLoading.value = true;
  findBooksOfAuthor(id).subscribe({
    next: (b: Book[]) => {
      console.log("loadBooksForAuthor SUCCESS", b);
      isBooksLoading.value = false;
      books.value = b;
    },
  });
}

function navigateBackToList() {
  console.log("navigateBackToList");
  router.push("/author");
}

function navigateToEditPage() {
  console.log("navigateToEditPage");
  router.push("/author/edit/" + author?.value?.id);
}

function navigateToBookEditPage(book: Book) {
  console.log("navigateToBookEditPage");
  router.push("/library/edit/" + book.id);
}
</script>

<style scoped>

a {
  color: #0d6efd !important;
  cursor: pointer !important;
  text-decoration: underline !important;
}
</style>
