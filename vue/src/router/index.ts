import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthorList from '../components/authors/AuthorList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'home', component: HomeView},
    {
      path: '/authors', name: 'authors', component: () => import('../components/authors/AuthorsPage.vue'), children: [
        {path: ":id", component: AuthorList}
      ]
    },
    {path: '/books', name: 'books', component: () => import('../components/books/BooksPage.vue')},
    {path: '/library', name: 'library', component: () => import('../components/library/LibraryPage.vue')},
  ]
})

export default router
