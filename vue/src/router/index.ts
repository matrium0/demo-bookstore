import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthorList from '../components/authors/AuthorList.vue'
import AuthorEdit from '../components/authors/AuthorEdit.vue'
import AuthorDetail from '../components/authors/AuthorDetail.vue'

//TODO test lazy routing / code splitting later
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/home', name: 'home', component: HomeView},

    {path: "/author", name: 'author-list', component: AuthorList},
    {path: "/author/:id", name: 'author-detail', component: AuthorDetail},
    {path: "/author/edit/:id", name: 'author-edit', component: AuthorEdit},

    {path: '/your-books', name: 'your-books', component: () => import('../components/books/BooksPage.vue')},
    {path: '/library', name: 'library', component: () => import('../components/library/LibraryPage.vue')},
    {path: '/library/edit/id', name: 'library-edit', component: () => import('../components/library/LibraryPage.vue')},

    // TODO LAZY LOADING?
    // {path: '/your-books', name: 'your-books', component: () => import('../components/books/BooksPage.vue')},
    // {
    //   path: '/library', name: 'library', component: () => import('../components/library/LibraryPage.vue'), children: [
    //     {path: "/", component: AuthorList}
    //   ]
    // },
  ]
})

export default router

// <Route path="/library" element={<Library/>}/>
// <Route path="/library/edit/:id" element={<BookEdit/>}/>
// </Route>
