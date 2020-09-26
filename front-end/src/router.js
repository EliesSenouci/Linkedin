import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

Vue.use(Router);

let router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'timeline',
			component: () => import('./views/Timeline.vue'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('./views/Login.vue')
		},
		{
			path: '/signup',
			name: 'signup',
			component: () => import('./views/Signup.vue')
		},
		{
			path: '/profile',
			name: 'profile',
			component: () => import('./views/Profile.vue'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/establishments',
			name: 'Establishments',
			component: () => import('./views/Establishments.vue'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/admin',
			name: 'admin',
			component: () => import('./views/Admin.vue'),
			meta: {
				requiresAuth: true,
				is_admin : true

			}
		},
		{
			path: '/messaging',
			name: 'messaging',
			component: () => import('./views/Messaging'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/user/:id',
			name: 'user',
			component: () => import('./views/UserPage'),
			meta: {
				requiresAuth: true
			}
		}
	]
});
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (store.getters.isLoggedIn && !store.getters.isBanned) {
			next();
			return
		}
		next('/login')
	} else {
		next()
	}
})
export default router
