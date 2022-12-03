import VueRouter from 'vue-router'

const RestaurantManager = () => import('@/views/RestaurantManager.vue')
const Dishes = () => import('@/views/Dishes.vue')
const Menu = () => import('@/views/Menu.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: RestaurantManager
    },
    {
        path: '/dishes',
        name: 'Dishes',
        component: Dishes
    },
    {
        path: '/menu',
        name: 'Menu',
        component: Menu
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router