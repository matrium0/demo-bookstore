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
        </div>
        <button @click="navigateToNewBook()" class="btn btn-success btn-lg me-2 me-lg-4 mt-2 mt-lg-0">
          add book
        </button>
      </div>
    </div>
    <div v-if="filteredBooks">
      <LoadingIndicatorOverlayWrapper :show-overlay="!allBooks?.length" spinner-size="5x">
        <div class="row mx-1 mx-lg-2 justify-content-around pb-4" style="min-height: 300px;">
          <div v-for="book of filteredBooks" :key="book.id" class="col-auto g-4 book-card-wrap">
            <BookCard :book="book" @openDetail="openBookDetail" @statusChanged="handleStatusChanged"/>
          </div>
        </div>
      </LoadingIndicatorOverlayWrapper>
    </div>
  </div>
  <BookDetailDialog v-if="openDetailDialog" :book="openedBook" :show="openDetailDialog" @closeDialog="closeDetailDialog()"/>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import router from '@/router';
import type {Book} from '../../../../react/src/mock-backend/book/Book';
import {updateStatus,} from '../../../../react/src/mock-backend/user/user-book-assignment-mockservice';
import type {UserBookAssignmentStatus} from '../../../../react/src/mock-backend/user/user-book-assignment-status';
import type {EnrichedBook} from '../../../../react/src/mock-backend/util/book-utils';
import {enrichBookWithUserAssignments} from '../../../../react/src/mock-backend/util/book-utils';
import LoadingIndicatorOverlayWrapper from '@/components/shared/LoadingIndicatorOverlayWrapper.vue';
import {findAllBooks} from '../../../../react/src/mock-backend/book/book-mock-data';
import {applicationContext} from "@/ApplicationContext";
import BookCard from '@/components/library/BookCard.vue';
import BookDetailDialog from '@/components/library/BookDetailDialog.vue';

const filterInput = ref("");
const allBooks = ref<Book[]>([]);
const filteredBooks = ref<Book[]>([]);
const openDetailDialog = ref(false);
const openedBook = ref<Book | null>(null);

onMounted(() => {
  console.log(`onMounted`);
  loadAllAuthors();
})

const loadAllAuthors = () => {
  findAllBooks().subscribe({
    next: (books: Book[]) => {
      console.log("findAllBooks SUCCESS", books);
      allBooks.value = books;
      filterBooks(filterInput.value);
      console.log("findAllBooks SUCCESS", books);
    }
  });
}

function filter(searchTerm: string) {
  filterBooks(searchTerm.toLowerCase());
}

function filterBooks(searchTerm: string) {
  console.log("filterBooks", searchTerm);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let enrichedBooks = allBooks.value.map((b: Book) => enrichBookWithUserAssignments(b, applicationContext.user!));
  filteredBooks.value = enrichedBooks.filter((book: EnrichedBook) => book.assignmentStatus !== "default");
  filteredBooks.value = filteredBooks.value.filter(b => {
    return b.title?.toLowerCase().includes(searchTerm)
  })
}

function handleStatusChanged(event: { book: EnrichedBook, status: UserBookAssignmentStatus }) {
  console.log("LibraryPage: statusChanged received", event);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  updateStatus(applicationContext.user!, event.book.id!, event.status);
  event.book.assignmentStatus = event.status;
}

const openBookDetail = (book: Book) => {
  console.log("openBookDetail", book);
  openedBook.value = book;
  openDetailDialog.value = true;
}

const navigateToNewBook = () => {
  console.log("navigateToNewBook");
  router.push("/library/edit/new");
}

function closeDetailDialog() {
  console.log("closeDetailDialog");
  openedBook.value = null;
  openDetailDialog.value = false;
}
</script>

<style scoped>

</style>
