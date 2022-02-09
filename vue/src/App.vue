<script setup lang="ts">
import {RouterView} from 'vue-router'
import Header from '@/components/HeaderMenu.vue';</script>

<template>
  <Header/>
  <div class="container-fluid" style="margin-top:55px;">
    <div class="row">
      <div>
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<style>

</style>
