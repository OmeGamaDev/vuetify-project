import { createRouter, createWebHistory } from 'vue-router'

// 🧩 Importa tus vistas (ajusta los nombres según tus archivos)
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

// ============================================
// 🔒 Definición de rutas
// ============================================
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }
]

// ============================================
// ⚙️ Creación del router
// ============================================
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// ============================================
// 🧩 Guardia de navegación (control de acceso)
// ============================================
router.beforeEach((to, from, next) => {
  // Revisa si la ruta requiere autenticación
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // Verifica si hay sesión activa (token o user)
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  if (requiresAuth && !token) {
    console.warn('⚠️ Acceso denegado. Redirigiendo a login.')
    next('/login')
  } else {
    next()
  }
})

export default router
