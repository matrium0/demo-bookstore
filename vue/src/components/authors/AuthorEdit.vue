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

            <div :class="{ 'mat-error': v$.firstname.$errors.length }">
              <q-input outlined v-model="author.firstname" @blur="v$.firstname.$touch" label="firstname" />
              <div class="input-errors" v-for="error of v$.firstname.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>

            <q-input outlined v-model="author.firstname" @blur="v$.firstname.$touch" label="firstname" />
            <q-input outlined v-model="author.lastname" @blur="v$.lastname.$touch" label="Lastname" class="mt-3"/>



            <!--            <q-input filled v-model="date" mask="date" :rules="['date']"  class="mt-3">-->
            <!--              <template v-slot:append>-->
            <!--                <q-icon name="event" class="cursor-pointer">-->
            <!--                  <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">-->
            <!--                    <q-date v-model="author.birthdate">-->
            <!--                      <div class="row items-center justify-end">-->
            <!--                        <q-btn v-close-popup label="Close" color="primary" flat />-->
            <!--                      </div>-->
            <!--                    </q-date>-->
            <!--                  </q-popup-proxy>-->
            <!--                </q-icon>-->
            <!--              </template>-->
            <!--            </q-input>-->
            <!--            <mat-form-field class="w-100" appearance="outline">-->
            <!--              <mat-label>firstname</mat-label>-->
            <!--              <input matInput placeholder="firstname" formControlName="firstname" required>-->
            <!--              <mat-error>input required</mat-error>-->
            <!--            </mat-form-field>-->

            <!--            <mat-form-field class="w-100" appearance="outline">-->
            <!--              <mat-label>Lastname</mat-label>-->
            <!--              <input matInput placeholder="Lastname" formControlName="lastname" required>-->
            <!--              <mat-error>input required</mat-error>-->
            <!--            </mat-form-field>-->

            <!--            <mat-form-field class="w-100" appearance="outline">-->
            <!--              <mat-label>Birthdate</mat-label>-->
            <!--              <input matInput [matDatepicker]="birthdatePicker" formControlName="birthdate">-->
            <!--              <mat-datepicker-toggle matSuffix [for]="birthdatePicker"></mat-datepicker-toggle>-->
            <!--              <mat-datepicker #birthdatePicker></mat-datepicker>-->
            <!--              <mat-error>input required</mat-error>-->
            <!--            </mat-form-field>-->
            <!--            <mat-form-field class="w-100" appearance="outline">-->
            <!--              <mat-label>Place of birth</mat-label>-->
            <!--              <input matInput placeholder="Place of birth" formControlName="placeOfBirth" required>-->
            <!--              <mat-error>input required</mat-error>-->
            <!--            </mat-form-field>-->

            <!--            <mat-form-field class="w-100" appearance="outline">-->
            <!--              <mat-label>Date of death</mat-label>-->
            <!--              <input matInput [matDatepicker]="dateOfDeathPicker" formControlName="dateOfDeath">-->
            <!--              <mat-datepicker-toggle matSuffix [for]="dateOfDeathPicker"></mat-datepicker-toggle>-->
            <!--              <mat-datepicker #dateOfDeathPicker></mat-datepicker>-->
            <!--              <mat-error>input required</mat-error>-->
            <!--            </mat-form-field>-->
            <!--            <mat-form-field class="w-100" appearance="outline">-->
            <!--              <mat-label>Place of death</mat-label>-->
            <!--              <input matInput placeholder="Place of death" formControlName="placeOfDeath">-->
            <!--              <mat-error>input required</mat-error>-->
            <!--            </mat-form-field>-->

            <!--            <mat-form-field class="w-100" appearance="outline">-->
            <!--              <mat-label>Genre</mat-label>-->
            <!--              <input matInput placeholder="Genre" formControlName="genre" required>-->
            <!--              <mat-error>input required</mat-error>-->
            <!--            </mat-form-field>-->

            <!--            <div class="row mb-4 align-items-center gender-input-row">-->
            <!--              <div class="col-auto">-->
            <!--                <span class="ms-2">Gender <span class="required-asterisk">*</span></span>-->
            <!--              </div>-->
            <!--              <div class="col-auto ps-2f">-->
            <!--                <mat-button-toggle-group formControlName="gender">-->
            <!--                  <mat-button-toggle value="MALE" class="d-flex align-items-center justify-content-center">-->
            <!--                    <app-gender-icon gender="MALE" [showLabel]="true"></app-gender-icon>-->
            <!--                  </mat-button-toggle>-->
            <!--                  <mat-button-toggle value="FEMALE" class="d-flex align-items-center justify-content-center">-->
            <!--                    <app-gender-icon gender="FEMALE" [showLabel]="true"></app-gender-icon>-->
            <!--                  </mat-button-toggle>-->
            <!--                  <mat-button-toggle value="NON_BINARY" class="d-flex align-items-center justify-content-center">-->
            <!--                    <app-gender-icon gender="NON_BINARY" [showLabel]="true"></app-gender-icon>-->
            <!--                  </mat-button-toggle>-->
            <!--                </mat-button-toggle-group>-->
            <!--              </div>-->
            <!--              <app-reactive-validation-display [control]="formGroup?.get('gender')"-->
            <!--                                               class="gender-error-label"></app-reactive-validation-display>-->
            <!--            </div>-->
            <!--            <div class="row mb-4 mb-lg-0 align-items-center">-->
            <!--              <div class="col-auto">-->
            <!--                <label for="penName" class="ms-2">Pen name</label>-->
            <!--              </div>-->
            <!--              <div class="col-auto">-->
            <!--                <mat-checkbox id="penName" formControlName="penName"></mat-checkbox>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
          <!--          <div class="col-lg-6 pt-2">-->
          <!--            <h2 class="mt-lg-0 mb-2">Notes</h2>-->
          <!--            <quill-editor [sanitize]="true" formControlName="note"></quill-editor>-->
          <!--            <div class="d-flex align-items-center mt-4 mt-lg-3">-->
          <!--              <h2 class="me-3">Foto</h2>-->
          <!--              <div v-if="displaySaveReminder" class="text-danger fw-bold">You changed the foto - don't forget to save!</div>-->
          <!--              <app-reactive-validation-display [control]="formGroup?.get('foto')"></app-reactive-validation-display>-->
          <!--            </div>-->
          <!--            <div-->
          <!--              class="foto-wrapper col-sm-7 col-md-6 col-lg-5 col-xl-4 position-relative d-flex flex-column justify-content-center align-items-center">-->
          <!--              <img v-if="imageUrl" [src]="imageUrl" class="author-foto-img" alt="Foto of the Author">-->
          <!--              <a @click="openFotoUploadDialog()" class="author-foto-change-link"-->
          <!--                 role="button">{{ formGroup.get('id')?.value ? 'change foto' : 'upload foto' }}</a>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
        <div class="row mt-3">
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

</template>

<script setup lang="ts">
import type {ComputedRef, Ref} from 'vue';
import {computed, onMounted, reactive, ref} from 'vue';
import {createImageUrlFromBlob} from '@/util/ImageService';
import {createOrUpdateAuthor, findAuthorById} from '../../../../react/src/mock-backend/author/author-mock-data';
import {findBooksOfAuthor} from '../../../../react/src/mock-backend/book/book-mock-data';
import type {Author} from '../../../../react/src/mock-backend/author/Author';
import type {Book} from '../../../../react/src/mock-backend/book/Book';
import router from '@/router';
import LoadingIndicatorOverlayWrapper from '@/components/shared/LoadingIndicatorOverlayWrapper.vue';
import useVuelidate from '@vuelidate/core';
import {email, minLength, required} from '@vuelidate/validators';

// const author: UnwrapNestedRefs<EnrichedAuthor | null> = reactive({});
const author: any = reactive({firstname: "x"}); //TODo remove firstname here?
const isLoading = ref(true);
const isBooksLoading = ref(true);
const displaySaveReminder = ref(false);
const books: Ref<Book[]> = ref([]);
const imageUrl: Ref<string | undefined> = ref(undefined);
const fullname: ComputedRef<string> = computed((): string => `${author.firstname} ${author.lastname}`);

const minLengthTwo = minLength(2);
const validationRules = {
  firstname: {required, minLengthTwo}, // Matches state.firstname
  lastname: {required}, // Matches state.lastName
}

const state = reactive({
  firstname: '',
})
const rules = {
  firstname: {required, email}, // Matches state.firstname
}
// const v$ = useVuelidate(rules, state);

const v$ = useVuelidate(validationRules, author);


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
      //TODO enable loading
      // Object.assign(author, enrichWithCalculatedFields(a));
      imageUrl.value = createImageUrlFromBlob(author?.foto);
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

function showUnsupportedOperationMessage() {
  // TODO create global message
  // this.globalMessageService.setAlertMessage("info", "Sorry, this operation is not supported yet");
}

function navigateBack() {
  history.back();
}

function saveAndNavigateToDetailPage() {
  console.log("saveAndNavigateToDetailPage");
  if (!author) {
    return;
  }

  //TODO validation
  // if (this.formGroup.valid) {
  //   console.log('save', this.formGroup.value);
  createOrUpdateAuthor(author).subscribe(
    (a: Author) => {
      console.log('createOrUpdateAuthor SUCCESS', a);
      router.push("/author/" + a.id);
      //TODO global message
      // this.globalMessageService.setAlertMessage("info", "Author saved!");
    });
  // } else {
  //   console.log('formgroup is not valid', this.formGroup);
  //   this.formGroup.markAllAsTouched();
  // }
}
</script>

<style scoped lang="scss">
.gender-error-label {
  @media (max-width: 800px) {
    padding-left: 22px;
  }

  padding-left: 110px;
}
</style>
