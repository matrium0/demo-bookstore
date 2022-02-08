<template>
  <header class="navbar fixed-top navbar-expand-md navbar-light shadow p-0">
    <a routerLink="/home" class="navbar-brand d-flex align-items-center ms-0 ms-md-3 me-0">
      <img src="../assets/demo-bookstore-gold-48px.png" class="logo-image" alt="logo">
      <img src="../assets/vuejs-gold-18px.png" class="logo-image-appendix-small" alt="logo appendix">
    </a>
    <!--    <button class="navbar-toggler me-2" (click)="isMenuCollapsed=!isMenuCollapsed" type="button" aria-expanded="false" aria-label="Toggle navigation">-->
    <button class="navbar-toggler me-2" type="button" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="navbarNav" class="navbar-collapse justify-content-between align-items-center mt-1">
      <!--      (click)="isMenuCollapsed=true" [hidden]="isMenuCollapsed">-->
      <ul class="navbar-nav w-100 ms-0 ms-lg-2">
        <li class="nav-item">
          <a routerLink="/home" routerLinkActive="active" class="nav-link">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a routerLink="/your-books" routerLinkActive="active" class="nav-link">
            Your Books
          </a>
        </li>
        <li class="nav-item">
          <a routerLink="/library" routerLinkActive="active" class="nav-link">
            Library
          </a>
        </li>
        <li class="nav-item">
          <a routerLink="/author" routerLinkActive="active" class="nav-link">
            Authors
          </a>
        </li>
        <li class="d-md-none mb-2 logout-link-mobile">
          <!--            TODO USER SERVICE-->
          <!--          <button (click)="handleLogoutClick()" class="btn btn-link btn-lg link-dark fs-5 text-decoration-none">log-->
          <!--            out <span class="fw-bold">"{{(userService.authentication$ | async)}}"</span></button>-->
        </li>
      </ul>
      <!--      <div class="btn-group me-3 d-none d-lg-block" dropdown>-->
      <!--        <div id="button-basic" dropdownToggle class="cursor-pointer" type="button" aria-controls="dropdown-basic">-->
      <!--          <fa-icon [icon]="iconUserCircle"></fa-icon>-->
      <!--        </div>-->
      <!--        <div id="dropdown-basic" *dropdownMenu class="dropdown-menu dropdown-menu-right"-->
      <!--             role="menu" aria-labelledby="button-basic">-->
      <!--          <div class="d-flex flex-column align-items-center fs-4 mx-3">-->
      <!--            <div>logged in as</div>-->
      <!--&lt;!&ndash;            TODO USER SERVICE&ndash;&gt;-->
      <!--&lt;!&ndash;            <div class="fw-bold">"{{(userService.authentication$ | async)}}"</div>&ndash;&gt;-->
      <!--            <button (click)="handleLogoutClick()" class="btn btn-secondary my-2">log out</button>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </header>

</template>

<script>
import './Header.scss';

export default {}
</script>

<style scoped>

</style>
