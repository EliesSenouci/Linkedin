<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<v-toolbar-title>Linkedin</v-toolbar-title>
			<v-spacer></v-spacer>
			<div v-if="isLoggedIn">
				<v-btn
					v-for="link in links"
					:key="`${link.label}-header-link`"
					text
					rounded
					:to="link.url"
				>
					{{ link.label }}
				</v-btn>
				<span v-if="isAdmin">
					<v-btn
							v-for="link in admin_links"
							:key="`${link.label}-header-link`"
							text
							rounded
							:to="link.url"
					>
						{{ link.label }}
					</v-btn>

				</span>
				<v-icon @click="logout">mdi-logout</v-icon>

			</div>
			<v-btn v-else text rounded to="/login">Login</v-btn>
		</v-app-bar>
		<v-content>
			<router-view></router-view>
		</v-content>
		<v-footer color="primary lighten-1" padless>
			<v-layout justify-center wrap>
				<v-flex primary lighten-2 py-4 text-center white--text xs12>
					{{ new Date().getFullYear() }} — <strong>Linkedin</strong>
				</v-flex>
			</v-layout>
		</v-footer>
	</v-app>
</template>

<script>
	import axios from "axios";
	import Cookies from "js-cookie";

	axios.defaults.headers.common.Authorization = Cookies.get("token");

	export default {
	name: 'App',
	computed: {
		isLoggedIn: function() {
			return this.$store.getters.isLoggedIn;
		},
		isAdmin: function() {
			return this.$store.getters.getCurrentUser.is_admin;
		}
	},
	methods: {
		logout() {
			this.$store.dispatch("logout").then(() => {
				this.$router.push("/login");
			});
		}
	},
	data() {
		return {
			links: [
				{
					label: 'Home',
					url: '/'
				},
				{
					label: 'Profile',
					url: '/profile'
				},
				{
					label: 'Establishments',
					url: '/establishments'
				},
				{
					label: 'Messaging',
					url: '/messaging'
				}
			],
			admin_links: [
				{
					label: 'Admin',
					url: '/admin'
				}
			]
		}
	}
}
</script>

