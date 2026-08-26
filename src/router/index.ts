import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('@/components/layout/PublicLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: { title: 'Academia Spartan — Força, Foco e Resultado' },
        },
        {
          path: 'equipe',
          name: 'equipe',
          component: () => import('@/views/EquipeView.vue'),
          meta: { title: 'Equipe — Academia Spartan' },
        },
        {
          path: 'estrutura',
          name: 'estrutura',
          component: () => import('@/views/EstruturaView.vue'),
          meta: { title: 'Estrutura — Academia Spartan' },
        },
        {
          path: 'programas',
          name: 'programas',
          component: () => import('@/views/ProgramasView.vue'),
          meta: { title: 'Programas & Bodybuilding — Academia Spartan' },
        },
        {
          path: 'blog',
          name: 'blog',
          component: () => import('@/views/BlogView.vue'),
          meta: { title: 'Blog — Academia Spartan' },
        },
        {
          path: 'blog/:slug',
          name: 'blog-post',
          component: () => import('@/views/BlogPostView.vue'),
          meta: { title: 'Artigo — Academia Spartan' },
        },
        {
          path: 'contato',
          name: 'contato',
          component: () => import('@/views/ContatoView.vue'),
          meta: { title: 'Contato — Academia Spartan' },
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/LoginView.vue'),
          meta: { title: 'Login — Academia Spartan' },
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('@/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('@/admin/DashboardView.vue'),
          meta: { title: 'Dashboard — Admin' },
        },
        {
          path: 'posts',
          name: 'admin-posts',
          component: () => import('@/admin/PostsManager.vue'),
          meta: { title: 'Posts — Admin' },
        },
        {
          path: 'equipe',
          name: 'admin-equipe',
          component: () => import('@/admin/EquipeManager.vue'),
          meta: { title: 'Equipe — Admin' },
        },
        {
          path: 'depoimentos',
          name: 'admin-depoimentos',
          component: () => import('@/admin/DepoimentosManager.vue'),
          meta: { title: 'Depoimentos — Admin' },
        },
        {
          path: 'programas',
          name: 'admin-programas',
          component: () => import('@/admin/ProgramasManager.vue'),
          meta: { title: 'Programas — Admin' },
        },
        {
          path: 'config',
          name: 'admin-config',
          component: () => import('@/admin/ConfigManager.vue'),
          meta: { title: 'Configurações — Admin' },
        },
        {
          path: 'mensagens',
          name: 'admin-mensagens',
          component: () => import('@/admin/MensagensView.vue'),
          meta: { title: 'Mensagens — Admin' },
        },
        {
          path: 'usuarios',
          name: 'admin-usuarios',
          component: () => import('@/admin/UsuariosManager.vue'),
          meta: { title: 'Usuários — Admin', requiresAdmin: true },
        },
        {
          path: 'financas',
          name: 'admin-financas',
          component: () => import('@/admin/FinancasView.vue'),
          meta: { title: 'Finanças — Admin', requiresAdmin: true },
        },
        {
          path: 'erp',
          name: 'admin-erp',
          component: () => import('@/admin/ErpView.vue'),
          meta: { title: 'ERP — Admin', requiresAdmin: true },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return { name: 'admin-dashboard' }
  }
  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'admin-dashboard' }
  }
  return true
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  if (title) document.title = title
})

export default router
