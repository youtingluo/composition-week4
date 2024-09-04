import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/todo',
      component: () => import('../views/TodoView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
