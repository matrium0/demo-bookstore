<template>
  <q-dialog :model-value=show @hide="dismissDialog" >
    <q-card style="min-width: 280px" class="p-4">
      <div class="d-flex align-items-center justify-content-between dialog-content">
        <h1 class="card-title">{{ props.title }}</h1>

        <font-awesome-icon @click="dismissDialog()" icon="times" size="2x" class="dismiss-dialog cursor-pointer"/>
      </div>
      <div class="row mt-3">
        <div class="col dialog-content" v-html="props.message"></div>
      </div>
      <div class="row mt-4">
        <div class="col d-flex align-items-center justify-content-between">
          <button class="btn btn-secondary btn-lg" @click="dismissDialog">{{ props.cancelButtonText }}</button>
          <button v-if="!props.hideConfirmButton" class="btn btn-{{ props.confirmButtonType }} btn-lg" @click="confirmClicked">
            {{ props.confirmButtonText }}
          </button>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean,
  title: string,
  message: string,
  cancelButtonText: string,
  hideConfirmButton: boolean,
  confirmButtonType: "success" | "danger" | "primary",
  confirmButtonText?: string,
}>();
const emit = defineEmits(['closeDialog']);

function dismissDialog(): void {
  emit('closeDialog');
}

function confirmClicked(): void {
  emit('closeDialog');
}
</script>

<style scoped lang="scss">
.dialog-content {
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
}
</style>
