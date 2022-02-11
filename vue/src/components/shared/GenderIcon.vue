<template>
  <div v-if="gender === 'MALE'" class="d-flex align-items-center">
    <font-awesome-icon icon="mars" style="font-size: 1.5rem"/>
    <span v-if="showLabel" class="gender-label">Male</span>
  </div>
  <div v-if="gender === 'FEMALE'" class="d-flex align-items-center">
    <font-awesome-icon icon="venus" style="font-size: 1.5rem"/>
    <span v-if="showLabel" class="gender-label">Female</span>
  </div>
  <div v-if="gender === 'NON_BINARY'" class="d-flex align-items-center">
    <font-awesome-icon icon="transgenderAlt" style="font-size: 1.5rem"/>
    <span v-if="showLabel" class="gender-label">Non-binary</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  gender: "MALE" | "FEMALE" | "NON_BINARY",
  showLabel: boolean
}>()
</script>

<style scoped lang="scss">
.gender-label {
  display: inline;

  @media (max-width: 500px) {
    display: none;
  }
}

.svg-inline--fa {
  margin-left: 5px;
  padding: 10px;
}
</style>
