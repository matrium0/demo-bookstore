<script setup lang="ts">
import Header from '@/components/HeaderMenu.vue';
import GlobalMessage from '@/components/shared/GlobalMessage.vue';</script>

<template>
  <Header/>
  <div class="container-fluid" style="margin-top:55px;">
    <div class="row">
      <div>
        <RouterView/>
      </div>
    </div>
  </div>
  <GlobalMessage/>
</template>

<style>

</style>
