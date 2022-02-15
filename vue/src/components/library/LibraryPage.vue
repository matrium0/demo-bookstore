<template>
  <div class="app-col">
    <div class="title-row-wrapper">
      <div class="title-row">
        <div class="d-flex flex-wrap align-items-center">
          <h1 class="me-2 me-lg-5">Library</h1>
          <div class="input-group me-2 me-lg-5 my-2 my-lg-0" style="width: 260px">
            <input @keyup="filter(filterInput)" v-model="filterInput" class="form-control" placeholder="filter by name"
                   aria-label="Filter">
            <span class="input-group-text"><font-awesome-icon icon="filter" size="lg"/></span>
          </div>
          <div class="input-group" style="width: 260px">
            <select v-model="showAllSelectFilter" @change="handleSelectAllChange(showAllSelectFilter)" class="form-select"
                    aria-label="exclude your books or show all">
              <option selected :value="'HIDE_YOUR_BOOKS'">exclude your books</option>
              <option :value="'SHOW_ALL'">show all books</option>
            </select>
          </div>
        </div>
        <button @click="navigateToNewBook()" class="btn btn-success btn-lg me-2 me-lg-4 mt-2 mt-lg-0">
          add book
        </button>
      </div>
    </div>
    <div v-if="filteredBooks">
      <LoadingIndicatorOverlayWrapper :show-overlay="!allBooks?.length" spinner-size="5x">
        <div class="row mx-1 mx-lg-2 justify-content-around pb-4" style="min-height: 300px;">
          <!-- TODO BOOK CARDS-->
          <div v-for="book of filteredBooks" :key="book.id" class="col-auto g-4 book-card-wrap">
            <div>{{book.id}}-{{book.title}}</div>
<!--            <app-book-card [book]="book" (openDetail)="openBookDetail($event)" (statusChanged)="handleStatusChanged($event)"></app-book-card>-->
          </div>
        </div>
      </LoadingIndicatorOverlayWrapper>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Ref} from 'vue';
import {onMounted, ref} from "vue";
import router from '@/router';
import type {Author} from '../../../../react/src/mock-backend/author/Author';
import type {Book} from '../../../../react/src/mock-backend/book/Book';
import LoadingIndicatorOverlayWrapper from '@/components/shared/LoadingIndicatorOverlayWrapper.vue';
import {findAllBooks} from '../../../../react/src/mock-backend/book/book-mock-data';

const filterInput: Ref<string> = ref("");
const showAllSelectFilter: Ref<"HIDE_YOUR_BOOKS" | "SHOW_ALL"> = ref("HIDE_YOUR_BOOKS");
const allBooks: Ref<Book[]> = ref([]);
const filteredBooks: Ref<Book[]> = ref([]);

onMounted(() => {
  console.log(`onMounted`);
  loadAllAuthors();
})

const loadAllAuthors = () => {
  findAllBooks().subscribe({
    next: (books: Book[]) => {
      console.log("findAllBooks SUCCESS", books);
      allBooks.value = books;
      filteredBooks.value = books;
      console.log("findAllBooks SUCCESS", books);
    }
  });
}

function filter(searchTerm: string) {
  console.log("filter", searchTerm);
  // this.filterByName$.next(searchTerm);
}

function handleSelectAllChange(value: string) {
  console.log("handleSelectAllChange", value);
  // const selectAllChange = value as ShowAllSelectTypes;
  // this.showAllSelectFilter$.next(selectAllChange);
}

const openBookDetail = (author: Author) => {
  console.log("openBookDetail", author);
  router.push("/book/" + author.id);
}

const navigateToNewBook = () => {
  console.log("navigateToNewBook");
  router.push("/book/edit/new");
}
</script>

<style scoped>

</style>
