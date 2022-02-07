import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'home', component: HomeView},
    {path: '/articles', name: 'articles', component: () => import('../components/articles/ArticlesPage.vue')},
    {path: '/books', name: 'books', component: () => import('../components/books/BooksPage.vue')},
    {path: '/library', name: 'library', component: () => import('../components/library/LibraryPage.vue')},
  ]
})

export default router
