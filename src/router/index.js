import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      children: [
        {
          path: '/admin/properties',
          name: 'admin-properties',
          component: () => import('../views/admin/AdminView.vue'),
        },
        {
          path: '/admin/properties/create',
          name: 'new-property',
          component: () => import('../views/admin/NewPropertyView.vue'),
        },
        {
          path: '/admin/properties/edit/:id',
          name: 'edit-property',
          component: () => import('../views/admin/EditPropertyView.vue'),
        },
      ]
    },
  ]
})

export default router
