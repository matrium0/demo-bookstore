<template>
  <div class="rounded">
    <div class="overlay-base" :class="{ 'overlay-backdrop': true }">
      <div class="icon-wrapper d-flex align-items-center justify-content-center">
        <font-awesome-icon icon="spinner" :size="spinnerSize" class="fa-spin"/>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  showOverlay: boolean,
  spinnerSize: string //TODO find out how to use default setting
  // spinnerSize: {
  //   type: string,
  //   default: '3x'
  // },
}>()
</script>

<style scoped>
.overlay-base {
  background: transparent;
  transition: background 0.4s linear;
}

.overlay-base.overlay-backdrop {
  opacity: 1;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  pointer-events: none;
}

.icon-wrapper {
  position: absolute;
  top: 250px;
  left: 0;
  right: 0;
  pointer-events: none;
}

</style>
