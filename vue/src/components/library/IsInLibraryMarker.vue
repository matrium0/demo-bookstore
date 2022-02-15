<template>
  <q-btn-dropdown
    split
    to="/start/pick-quasar-flavour"
    color="grey-7"
  >
    <template v-slot:label>
      <div v-if="status ==='default'" @click="changeStatus('want to read')" >
        want to read
      </div>

      <div v-if="status !=='default'" type="button" class="already-chosen-button d-flex align-items-center justify-content-center">

        <span class="ms-2">{{ status }}</span>
        <font-awesome-icon v-if="status === 'want to read'" icon="bookmark" class="mx-2 icon-want-to-read"/>
        <font-awesome-icon v-if="status === 'currently reading'" icon="bookReader" class="mx-2 icon-currently-reading"/>
        <font-awesome-icon v-if="status === 'read'" icon="check" class="mx-2 icon-read"/>
        <!--      <q-item v-bind="scope.itemProps">-->
        <!--        <q-item-section avatar>-->
        <!--          <q-icon :name="scope.opt.icon" />-->
        <!--        </q-item-section>-->
        <!--        <q-item-section>-->
        <!--          <q-item-label>{{ scope.opt.label }}</q-item-label>-->
        <!--          <q-item-label caption>{{ scope.opt.description }}</q-item-label>-->
        <!--        </q-item-section>-->
        <!--      </q-item>-->
      </div>
    </template>
    <!--    <div v-if="status !=='default'" type="button" class="already-chosen-button d-flex align-items-center justify-content-center">-->
    <span class="ms-2">{{ status }}</span>


    <ul>
      <li v-if="status !== 'want to read'"><a class="dropdown-item" @click="changeStatus('want to read')">want to read</a></li>
      <li v-if="status !== 'read'"><a class="dropdown-item" @click="changeStatus('read')">read</a></li>
      <li v-if="status !== 'currently reading'"><a class="dropdown-item" @click="changeStatus('currently reading')">currently reading</a>
      </li>
      <li v-if="status !== 'default'"><a class="dropdown-item" @click="changeStatus('default')">not interested</a></li>
    </ul>
    <!--    </div>-->
    <!--    <div>-->
    <!--      blalbllba-->
    <!--    </div>-->
    <!--    <div>call-->
    <!--    </div>-->
    <!--    <q-list>-->
    <!--      <q-item clickable v-close-popup>-->
    <!--        <q-item-section>-->
    <!--          <q-item-label>Photos</q-item-label>-->
    <!--        </q-item-section>-->
    <!--      </q-item>-->

    <!--      <q-item clickable v-close-popup>-->
    <!--        <q-item-section>-->
    <!--          <q-item-label>Videos</q-item-label>-->
    <!--        </q-item-section>-->
    <!--      </q-item>-->

    <!--      <q-item clickable v-close-popup>-->
    <!--        <q-item-section>-->
    <!--          <q-item-label>Articles</q-item-label>-->
    <!--        </q-item-section>-->
    <!--      </q-item>-->
    <!--    </q-list>-->
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import type {UserBookAssignmentStatus} from '../../../../react/src/mock-backend/user/user-book-assignment-status';

const props = defineProps<{
  status: UserBookAssignmentStatus
}>()
const emit = defineEmits(['statusChange'])

function changeStatus(status: UserBookAssignmentStatus) {
  // this.isMenuCollapsed = false;
  emit('statusChange', status);
}
</script>

<style scoped>
li {
  cursor: pointer;
}

</style>
