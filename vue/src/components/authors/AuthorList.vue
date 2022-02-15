<template>
  <div class="app-col">
    <div class="title-row-wrapper">
      <div class="title-row">
        <div class="d-flex align-items-center">
          <h1>Authors</h1>
          <div class="input-group ms-2 ms-lg-5">
            <input @keyup="filter(filterInput)" v-model="filterInput" autofocus class="form-control" placeholder="filter"
                   aria-label="Filter">
            <span class="input-group-text">
              <font-awesome-icon icon="filter" size="lg"/>
            </span>
          </div>
        </div>
        <button @click="navigateToNewAuthor()" class="btn btn-success btn-lg me-2 me-lg-4 mt-2 mt-lg-0">
          add Author
        </button>
      </div>
    </div>
    <div>
      <LoadingIndicatorOverlayWrapper :show-overlay="authorsLoading" spinner-size="5x">
        <div style="height: 300px">
          <AuthorTable @authorSelect="onAuthorSelected" :authors="filteredAuthors"></AuthorTable>
        </div>
      </LoadingIndicatorOverlayWrapper>
    </div>
  </div>

</template>

<script setup lang="ts">
import type {Author} from '../../../../react/src/mock-backend/author/Author';
import type {EnrichedAuthor} from '../../../../react/src/mock-backend/author/EnrichedAuthor';
import {findAllAuthors} from '../../../../react/src/mock-backend/author/author-mock-data';
import router from '@/router';
import {enrichWithCalculatedFields} from '../../../../react/src/mock-backend/author/author-util';
import AuthorTable from '@/components/authors/AuthorTable.vue';
import type {Ref} from 'vue';
import {onMounted, ref} from "vue";
import LoadingIndicatorOverlayWrapper from '@/components/shared/LoadingIndicatorOverlayWrapper.vue';

const loadedAuthors: Ref<Author[]> = ref([]);
const filteredAuthors: Ref<Author[]> = ref([]);
const authorsLoading: Ref<boolean> = ref(true);

console.log("initializing AuthorList");

onMounted(() => {
  console.log(`onMounted`);
  loadAllAuthors();
})

const filterInput: Ref<string> = ref("");
const loadAllAuthors = () => {
  findAllAuthors().subscribe({
    next: (authors: Author[]) => {
      console.log("findAll SUCCESS", authors);
      authors = authors.map(a => enrichWithCalculatedFields(a));
      loadedAuthors.value = [...authors];
      filteredAuthors.value = [...authors];
      authorsLoading.value = false
      console.log("findAll SUCCESS", loadedAuthors);
    }
  });
}

const filter = (term: string) => {
  console.log("filter", term);
  filteredAuthors.value = loadedAuthors.value?.filter(a =>
    (a.firstname + " " + a.lastname).toLocaleLowerCase().includes(term) ||
    (a.lastname + " " + a.firstname).toLocaleLowerCase().includes(term)
  );
}

const onAuthorSelected = (author: EnrichedAuthor) => {
  console.log("onAuthorSelected", author);
  router.push("/author/" + author.id);
}

const navigateToNewAuthor = () => {
  console.log("navigateToNewAuthor");
  router.push("/author/edit/new");
}

</script>

<style scoped>
</style>
