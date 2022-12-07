import VueRouter from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')
const DishesView = () => import('@/views/DishesView.vue')
const MenuView = () => import('@/views/MenuView.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/dishes',
    name: 'Dishes',
    component: DishesView
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuView
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router