<script setup lang="ts">
import {setGlobalMessage} from '@/components/shared/GlobalMessageService';

function setDummyMessage() {
  console.log("setting dummy message");
  setGlobalMessage("info", "a bright new message of medium length")
}

</script>

<template>
  <div class="app-col">
    <div class="title-row-wrapper">
      <div class="title-row">
        <h1>Home</h1>
      </div>
    </div>
    <div class="pb-3">
      <p class="mx-2 mx-lg-5 mt-0 mt-3 fs-5">
        Welcome to our <strong>Demo Bookstore</strong>. This is a just a frontend demonstration with no backend or persistent database.
        Feel free to edit, add or delete anything you like - the data is kept in <strong>your browsers memory</strong> only and will not be
        shared with others.
        If you leave the page all changes are lost!
        <br>
        <br>
        So don't be scared - go crazy :)
      </p>
      <button @click="setDummyMessage()" class="btn btn-secondary ms-5">create dummy message</button>
    </div>
  </div>
</template>
