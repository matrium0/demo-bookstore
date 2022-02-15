<template>
  <div class="app-col">
    <div class="title-row-wrapper">
      <div class="title-row">
        <h1 v-if="!isLoading && !author.id">New Author</h1>
        <h1 v-if="!isLoading && author.id">
          {{ fullname }}
        </h1>
        <button v-if="author.id" @click="showUnsupportedOperationMessage()"
                class="btn btn-danger btn-lg me-2 me-lg-4">
          delete
        </button>
      </div>
    </div>

    <div>
      <LoadingIndicatorOverlayWrapper :show-overlay="isLoading" spinner-size="5x">
        <div class="row mx-3 gx-0 gx-lg-5">
          <div class="col-lg-6 pt-2">
            <h2 class="mb-2">General Data</h2>

            <div class="f-row" :class="{ 'mat-error': v$.firstname.$errors.length }">
              <q-input outlined v-model="author.firstname" @blur="v$.firstname.$touch" label="firstname"/>
              <div class="input-errors" v-for="error of v$.firstname.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>

            <div class="mt-2 f-row" :class="{ 'mat-error': v$.lastname.$errors.length }">
              <q-input outlined v-model="author.lastname" @blur="v$.lastname.$touch" label="lastname"/>
              <div class="input-errors" v-for="error of v$.lastname.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>

            <div class="mt-2 f-row" :class="{ 'mat-error': v$.birthdate.$errors.length }">
              <q-input outlined :model-value="authorBirthdate" @update:model-value="changeBirthDate" label="birthdate"/>
              <div class="input-errors" v-for="error of v$.birthdate.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
            <!-- TODO use datepicker-->

            <div class="mt-2" :class="{ 'mat-error': v$.placeOfBirth.$errors.length }">
              <q-input outlined v-model="author.placeOfBirth" @blur="v$.placeOfBirth.$touch" label="Place of birth"/>
              <div class="input-errors" v-for="error of v$.placeOfBirth.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>

            <div class="mt-2" :class="{ 'mat-error': v$.dateOfDeath.$errors.length }">
              <q-input outlined :model-value="authorDateOfDeath" @update:model-value="changeDateOfDeath" label="dateOfDeath"/>
              <div class="input-errors" v-for="error of v$.dateOfDeath.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>

            <q-input outlined v-model="author.placeOfDeath" label="Place of death" class="mt-2"/>

            <q-input outlined v-model="author.genre" label="Genre" class="mt-2"/>

            <div class="mt-3" :class="{ 'mat-error': v$.gender.$errors.length }">
              <div class="d-flex align-items-center justify-content-start">
                <div class="pe-4">Gender:</div>
                <q-btn-toggle
                  v-model="author.gender"
                  toggle-color="grey-4"
                  :options="[
                  {slot: 'male', value: 'MALE'},
                  {slot: 'female', value: 'FEMALE'},
                  {slot: 'nb', value: 'NON_BINARY'}
                ]"
                >
                  <template v-slot:male>
                    <GenderIcon :gender="'MALE'" :show-label="true"></GenderIcon>
                  </template>
                  <template v-slot:female>
                    <GenderIcon :gender="'FEMALE'" :show-label="true"></GenderIcon>
                  </template>
                  <template v-slot:nb>
                    <GenderIcon :gender="'NON_BINARY'" :show-label="true"></GenderIcon>
                  </template>
                </q-btn-toggle>
              </div>
              <div class="input-errors" v-for="error of v$.gender.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>

            <div class="d-flex align-items-center mt-2">
              <span class="me-3">Pen name</span>
              <q-checkbox v-model="author.penName"/>
            </div>

            <q-input v-if="author.penName" outlined v-model="author.fullRealName" label="Real name" class="mt-2"/>

          </div>

          <div class="col-lg-6 pt-2">
            <h2 class="mt-lg-0 mb-2">Notes</h2>
            <q-editor v-if="author" v-model="author.note" height="200px"/>

            <div class="d-flex align-items-center mt-4 mt-lg-3">
              <h2 class="me-3">Foto</h2>
              <div v-if="displaySaveReminder" class="text-danger fw-bold">You changed the foto - don't forget to save!</div>

              <div class="input-errors" v-for="error of v$.foto.$errors" :key="error.$uid">
                <div class="error-msg text-danger fw-bold">{{ error.$message }}</div>
              </div>
            </div>
            <div
              class="foto-wrapper col-sm-7 col-md-6 col-lg-5 col-xl-4 position-relative d-flex flex-column justify-content-center align-items-center">
              <img v-if="imageUrl" :src="imageUrl" class="author-foto-img" alt="Foto of the Author">
              <a @click="openUploadImageDialog = true" class="author-foto-change-link"
                 role="button">{{ author.id ? 'change foto' : 'upload foto' }}
              </a>
            </div>
          </div>
        </div>
        <div class="mt-3 pb-2">
          <div class="col-12 px-4 px-lg-5 mb-3 d-flex align-items-center justify-content-between ">
            <button @click="navigateBack()" class="btn btn-secondary btn-lg">
              cancel
            </button>
            <button @click="saveAndNavigateToDetailPage()" class="btn btn-success btn-lg px-4">
              save
            </button>
          </div>
        </div>
      </LoadingIndicatorOverlayWrapper>
    </div>
  </div>
  <ImageUploadDialog :opened="openUploadImageDialog" @closeDialog="handleCloseDialog"/>
</template>

<script setup lang="ts">
import type {ComputedRef, Ref, UnwrapNestedRefs} from 'vue';
import {computed, onMounted, reactive, ref} from 'vue';
import {createImageUrlFromBlob} from '@/util/ImageService';
import {enrichWithCalculatedFields} from '../../../../react/src/mock-backend/author/author-util';
import {createOrUpdateAuthor, findAuthorById} from '../../../../react/src/mock-backend/author/author-mock-data';
import {findBooksOfAuthor} from '../../../../react/src/mock-backend/book/book-mock-data';
import type {Author} from '../../../../react/src/mock-backend/author/Author';
import type {Book} from '../../../../react/src/mock-backend/book/Book';
import router from '@/router';
import LoadingIndicatorOverlayWrapper from '@/components/shared/LoadingIndicatorOverlayWrapper.vue';
import useVuelidate from '@vuelidate/core';
import {minLength, required} from '@vuelidate/validators';
import {DateTime} from 'luxon';
import ImageUploadDialog from '@/components/authors/ImageUploadDialog.vue';
import GenderIcon from '@/components/shared/GenderIcon.vue';

const author: UnwrapNestedRefs<Author> = reactive({});
const authorBirthdate: Ref<string | null> = ref(null);
const authorDateOfDeath: Ref<string | null> = ref(null);

const isLoading = ref(true);
const isBooksLoading = ref(true);
const displaySaveReminder = ref(false);
const books: Ref<Book[]> = ref([]);
const imageUrl: Ref<string | undefined> = ref(undefined);
const fullname: ComputedRef<string> = computed((): string => `${author.firstname} ${author.lastname}`);
const openUploadImageDialog = ref(false)

const minLengthTwo = minLength(2);
const validationRules = {
  firstname: {required, minLengthTwo},
  lastname: {required},
  gender: {required},
  birthdate: {required},
  placeOfBirth: {required},
  foto: {required},
  dateOfDeath: {},
}

const v$ = useVuelidate(validationRules, author);

onMounted(() => {
  const id = router.currentRoute.value.params.id
  console.log(`onMounted`, id);

  if (id !== "new") {
    loadAuthor(Number(id));
    loadBooksForAuthor(Number(id));
  } else {
    isLoading.value = false;
    author.penName = false;
    author.note = "";
  }
})

function loadAuthor(id: number) {
  findAuthorById(id).subscribe({
    next: (a: Author) => {
      console.log("loadAuthor SUCCESS", a);
      isLoading.value = false;

      Object.assign(author, enrichWithCalculatedFields(a));
      imageUrl.value = createImageUrlFromBlob(author?.foto);
      authorBirthdate.value = author.birthdate?.toFormat("dd.LL.yyyy") || null;
      authorDateOfDeath.value = author.dateOfDeath?.toFormat("dd.LL.yyyy") || null;
      console.log(author, authorBirthdate.value, authorDateOfDeath.value);
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

function changeBirthDate(e: string) {
  author.birthdate = DateTime.fromFormat(e, "dd.LL.yyyy");

  console.log("changeBirthDate", e, author.birthdate);
  if (author.birthdate.isValid) {
    console.log("clearing birthdate error");
    v$.value.birthdate.$errors.splice(0, v$.value.birthdate.$errors.length);
    authorBirthdate.value = author.birthdate.toFormat("dd.LL.yyyy");
  } else {
    console.log("setting birthdate error");
    console.log(v$.value.firstname.$errors);
    console.log(v$.value.birthdate.$errors);
    v$.value.birthdate.$errors.splice(0, v$.value.birthdate.$errors.length);
    v$.value.birthdate.$errors.push({
      $uid: "wrong format",
      $message: "invalid format",
      $pending: false,
      $propertyPath: 'birthdate',
      $property: 'birthdate',
      $validator: 'required',
      $response: null,
      $params: {},
    })
  }
}

//TODO date handling needs refactoring (e.g. code duplication, etc.)
function changeDateOfDeath(e: string) {
  author.dateOfDeath = DateTime.fromFormat(e, "dd.LL.yyyy");

  console.log("changedateOfDeath", e, author.dateOfDeath);
  if (author.dateOfDeath) {
    v$.value.dateOfDeath.$errors.splice(0, v$.value.dateOfDeath.$errors.length);
    authorDateOfDeath.value = author.dateOfDeath.toFormat("dd.LL.yyyy");
  } else {
    console.log(v$.value.firstname.$errors);
    console.log(v$.value.dateOfDeath.$errors);
    v$.value.dateOfDeath.$errors.splice(0, v$.value.dateOfDeath.$errors.length);
    v$.value.dateOfDeath.$errors.push({
      $uid: "wrong format",
      $message: "invalid format",
      $pending: false,
      $propertyPath: 'dateOfDeath',
      $property: 'dateOfDeath',
      $validator: 'required',
      $response: null,
      $params: {},
    })
  }

  console.log("after parse", author.birthdate);
}

function showUnsupportedOperationMessage() {
  // TODO create global message
  // this.globalMessageService.setAlertMessage("info", "Sorry, this operation is not supported yet");
}

function navigateBack() {
  history.back();
}

async function saveAndNavigateToDetailPage() {
  console.log("saveAndNavigateToDetailPage");
  if (!author) {
    return;
  }
  const isFormCorrect = await this.v$.$validate()
  if (!isFormCorrect) {
    console.log('formgroup is not valid', this.v$);
  } else {
    createOrUpdateAuthor(author).subscribe(
      (a: Author) => {
        console.log('createOrUpdateAuthor SUCCESS', a);
        router.push("/author/" + a.id);
        //TODO global message
        // this.globalMessageService.setAlertMessage("info", "Author saved!");
      });
  }
}

function handleCloseDialog(blob: Blob | null) {
  openUploadImageDialog.value = false;

  if (blob) {
    author.foto = blob;
    imageUrl.value = createImageUrlFromBlob(blob);
  }

}

</script>

<style scoped lang="scss">
.f-row {
  min-height: 80px;
}

.gender-error-label {
  @media (max-width: 800px) {
    padding-left: 22px;
  }

  padding-left: 110px;
}
</style>
