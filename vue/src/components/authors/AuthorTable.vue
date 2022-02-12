<template>
  <div class="table-wrapper">
    <q-table
      :rows="authors"
      :columns="columns"
      row-key="id"
      no-data-label="No authors found"
      @row-click="onRowClick"
    >
      <template v-slot:body-cell-penName="props">
        <q-td :props="props">
          <div v-if="props.row.penName" class="my-table-details">
            <font-awesome-icon icon="check" style="font-size: 1.5rem"/>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-gender="props">
        <q-td :props="props" class="gender-col">
          <GenderIcon :gender="props.row.gender" show-label/>
        </q-td>
      </template>
      <template v-slot:bottom-row>
        <!-- intentionally empty-->
      </template>
      <template v-slot:bottom>
        <!-- intentionally empty-->
      </template>
      <template v-slot:no-data>
        <!-- intentionally empty-->
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import type {EnrichedAuthor} from '../../../../react/src/mock-backend/author/EnrichedAuthor';
import type {DateTime} from 'luxon';
import GenderIcon from '@/components/shared/GenderIcon.vue';
import {onMounted, onUnmounted, ref} from 'vue';
import {debounce} from 'debounce';

onMounted(() => {
  window.addEventListener("resize", debouncedSetShowedColumnsBasedOnScreenSize(false));
});
onUnmounted(() => {
  window.removeEventListener("resize", debouncedSetShowedColumnsBasedOnScreenSize(false));
});

defineProps<{
  authors: EnrichedAuthor[]
}>()
const emit = defineEmits(['authorSelect'])

const debouncedSetShowedColumnsBasedOnScreenSize = (immediate: boolean) => debounce(setShowedColumnsBasedOnScreenSize, 150, immediate);

function setShowedColumnsBasedOnScreenSize() {
  console.log("setShowedColumnsBasedOnScreenSize");
  if (window.innerWidth >= 992) {
    columns.value = allColumns.filter(col => ['firstname', 'lastname', 'gender', 'penName', 'birthdate', 'age', 'dateOfDeath'].includes(col.name));
  } else if (window.innerWidth >= 576) {
    columns.value = allColumns.filter(col => ['firstname', 'lastname', 'birthdate', 'gender'].includes(col.name));
  } else {
    columns.value = allColumns.filter(col => ['firstname', 'lastname'].includes(col.name));
  }
}

function getDateOfDeathIfPresent(author: EnrichedAuthor): string {
  if (author?.dateOfDeath) {
    return author.dateOfDeath?.toFormat("dd.LL.yyyy") + " in " + author.placeOfBirth;
  } else {
    return "";
  }
}

function onRowClick(evt: PointerEvent, row: EnrichedAuthor) {
  console.log('clicked on', evt, row)
  emit('authorSelect', row);
}

const allColumns = [
  {
    name: 'firstname',
    label: 'FIRSTNAME',
    align: 'start',
    field: 'firstname',
    sortable: true
  },
  {name: 'lastname', align: 'start', label: 'LASTNAME', field: 'lastname', sortable: true},
  {name: 'gender', label: 'GENDER', field: 'gender', sortable: true},
  {name: 'penName', label: 'PEN NAME', field: 'penName', sortable: true},
  {
    name: 'birthdate', label: 'BIRTHDATE', sortable: true,
    field: (row: EnrichedAuthor) => row.birthdate?.toFormat("dd.LL.yyyy") + " in " + row.placeOfBirth,
    sort: (a: DateTime, b: DateTime, rowA: EnrichedAuthor, rowB: EnrichedAuthor) => dateCompare(rowA.birthdate, rowB.birthdate)
  },
  {name: 'age', label: 'AGE', sortable: true, field: (row: EnrichedAuthor) => row.age},
  {
    name: 'dateOfDeath',
    label: 'DATE OF DEATH',
    field: (row: EnrichedAuthor) => getDateOfDeathIfPresent(row),
    sortable: true,
    sort: (a: DateTime, b: DateTime, rowA: EnrichedAuthor, rowB: EnrichedAuthor) => dateCompare(rowA.dateOfDeath, rowB.dateOfDeath)
  },
];

const columns = ref(allColumns); // initially all columns are displayed
setShowedColumnsBasedOnScreenSize();

function dateCompare(a: DateTime | undefined, b: DateTime | undefined) {
  if (!a) {
    return -1;
  }
  if (!b) {
    return 1;
  }
  return (a.toMillis() - b.toMillis());
}
</script>


<style scoped lang="scss">
.gender-col {
  display: flex;
  align-items: center;
}

</style>
