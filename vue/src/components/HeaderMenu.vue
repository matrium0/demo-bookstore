<script>
import './Header.scss';
import {applicationContext} from "@/ApplicationContext";

const handleLogoutClick = () => {
  console.log("handleLogoutClick()");
};
export default {


  data() {
    return {
      isMenuCollapsed: true,
      isLogoutDialogOpened: false,
      applicationContext,
      handleLogoutClick
    }
  }
}
</script>
<template>
  <header class="navbar fixed-top navbar-expand-md navbar-light shadow p-0">
    <router-link to="/home" class="navbar-brand d-flex align-items-center ms-0 ms-md-3 me-0">
      <img src="../assets/demo-bookstore-gold-48px.png" class="logo-image" alt="logo">
      <img src="../assets/vuejs-gold-18px.png" class="logo-image-appendix-small" alt="logo appendix">
    </router-link>
    <button @click="isMenuCollapsed=!isMenuCollapsed" class="navbar-toggler me-2" type="button" aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="navbarNav" class="navbar-collapse justify-content-between align-items-center mt-1"
         @click="isMenuCollapsed=true" v-show="!isMenuCollapsed">
      <ul class="navbar-nav w-100 ms-0 ms-lg-2">
        <li class="nav-item">
          <router-link to="/home" routerLinkActive="active" class="nav-link">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/your-books" routerLinkActive="active" class="nav-link">
            Your Books
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/library" routerLinkActive="active" class="nav-link">
            Library
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/author" routerLinkActive="active" class="nav-link">
            Authors
          </router-link>
        </li>
        <li class="d-md-none mb-2 logout-link-mobile">
          <button @click="handleLogoutClick()" class="btn btn-link btn-lg link-dark fs-5 text-decoration-none">log
            out <span class="fw-bold">"{{ applicationContext.user }}"</span></button>
        </li>
      </ul>
    </div>
    <div class="btn-group me-3 d-none d-lg-block" data-bs-dropdown>
      <div @click="isLogoutDialogOpened = !isLogoutDialogOpened" id="button-basic" data-bs-dropdownToggle class="cursor-pointer"
           type="button" aria-controls="dropdown-basic">
        <font-awesome-icon icon="user-circle" style="font-size: 2.5rem"/>
      </div>
      <div id="dropdown-basic" data-bs-dropdownMenu class="dropdown-menu dropdown-menu-right"
           role="menu" aria-labelledby="button-basic" v-bind:class="{ show: isLogoutDialogOpened }">
        <div class="d-flex flex-column align-items-center fs-4 mx-3">
          <div>logged in as</div>
          <div class="fw-bold">"{{ applicationContext.user }}"</div>
          <button @click="handleLogoutClick()" class="btn btn-secondary my-2">log out</button>
        </div>
      </div>
    </div>
  </header>
</template>
<style>
.dropdown-menu {
  inset: 100% 0 auto auto;
}
</style>
