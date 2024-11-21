import { createRouter, createWebHistory } from 'vue-router'
import logPage from '@/pages/logPage.vue'
import userPage from '@/pages/userPage.vue'
import bookPage from '@/pages/bookPage.vue'
import emprestimoPage from '@/pages/emprestimoPage.vue'


const routes = [
  {
    path: '/',
    name: 'logPage',
    component: logPage
  },
  {
    path: '/usuarios',
    name: 'userPage',
    component: userPage
  },
  {
    path: '/livros',
    name: 'bookPage',
    component: bookPage
  },
  {
    path: '/emprestimos',
    name: 'emprestimoPage',
    component: emprestimoPage
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
