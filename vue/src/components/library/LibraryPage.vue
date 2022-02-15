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
            <BookCard :book="book" @openDetail="openBookDetail" @statusChanged="handleStatusChanged"/>
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
import {updateStatus} from '../../../../react/src/mock-backend/user/user-book-assignment-mockservice';
import type {UserBookAssignmentStatus} from '../../../../react/src/mock-backend/user/user-book-assignment-status';
import type {EnrichedBook} from '../../../../react/src/mock-backend/util/book-utils';
import {enrichBookWithUserAssignments} from '../../../../react/src/mock-backend/util/book-utils';
import LoadingIndicatorOverlayWrapper from '@/components/shared/LoadingIndicatorOverlayWrapper.vue';
import {findAllBooks} from '../../../../react/src/mock-backend/book/book-mock-data';
import {applicationContext} from "@/ApplicationContext";
import BookCard from '@/components/library/BookCard.vue';

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
      filterBooks("", "HIDE_YOUR_BOOKS");
      console.log("findAllBooks SUCCESS", books);
    }
  });
}

function filter(searchTerm: string) {
  filterBooks(searchTerm.toLowerCase(), showAllSelectFilter.value);
}

function handleSelectAllChange(value: "HIDE_YOUR_BOOKS" | "SHOW_ALL") {
  filterBooks(filterInput.value, value);
}

function filterBooks(searchTerm: string, selectAllChange: "HIDE_YOUR_BOOKS" | "SHOW_ALL") {
  console.log("filterBooks", searchTerm, selectAllChange);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let enrichedBooks = allBooks.value.map((b: Book) => enrichBookWithUserAssignments(b, applicationContext.user!));
  if (selectAllChange === 'HIDE_YOUR_BOOKS') {
    console.log("hide");
    filteredBooks.value = enrichedBooks.filter((book: EnrichedBook) => book.assignmentStatus === "default");
  } else {
    filteredBooks.value = enrichedBooks;
  }
  filteredBooks.value = filteredBooks.value.filter(b => {
    return b.title?.toLowerCase().includes(searchTerm)
  })
}

function handleStatusChanged(event: { book: Book, status: UserBookAssignmentStatus }) {
  console.log("LibraryPage: statusChanged received", event);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  updateStatus(applicationContext.user!, event.book.id!, event.status);
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
