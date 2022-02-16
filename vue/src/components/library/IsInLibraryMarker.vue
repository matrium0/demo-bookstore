<template>
  <q-btn-dropdown
    split
    to="/start/pick-quasar-flavour"
    :color="status ==='default' ? 'grey-7' : 'white'"
    :text-color="status ==='default' ? 'white' : 'black'"
  >
    <template v-slot:label>
      <div v-if="status ==='default'" @click="changeStatus('want to read')" class="button-label">
        want to read
      </div>

      <div v-if="status !=='default'" type="button" class="already-chosen-button d-flex align-items-center justify-content-center">
        <span class="ms-2">{{ status }}</span>
        <font-awesome-icon v-if="status === 'want to read'" icon="bookmark" size="lg" class="mx-2 icon-want-to-read"/>
        <font-awesome-icon v-if="status === 'currently reading'" icon="book-reader" size="lg" class="mx-2 icon-currently-reading"/>
        <font-awesome-icon v-if="status === 'read'" icon="check" size="lg" class="mx-2 icon-read"/>
      </div>
    </template>
    <ul class="list-group">
      <li v-if="status !== 'want to read'"><a class="list-group-item" @click="changeStatus('want to read')">want to read</a></li>
      <li v-if="status !== 'read'"><a class="list-group-item" @click="changeStatus('read')">read</a></li>
      <li v-if="status !== 'currently reading'"><a class="list-group-item" @click="changeStatus('currently reading')">currently reading</a>
      </li>
      <li v-if="status !== 'default'"><a class="list-group-item" @click="changeStatus('default')">not interested</a></li>
    </ul>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import type {UserBookAssignmentStatus} from '../../../../react/src/mock-backend/user/user-book-assignment-status';

const props = defineProps<{
  status: UserBookAssignmentStatus
}>()
const emit = defineEmits(['statusChange'])

function changeStatus(status: UserBookAssignmentStatus) {
  emit('statusChange', status);
}
</script>

<style scoped>
li {
  cursor: pointer;
}

.button-label {
  font-family: Verdana, serif;
  font-weight: 700;
}

.already-chosen-button {
  border: none;
}
</style>
