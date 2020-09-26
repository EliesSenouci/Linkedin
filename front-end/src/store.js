import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";
import Cookies from 'js-cookie'

Vue.use(Vuex);
export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        status: '',
        currentUser: {},
        token: localStorage.getItem('token') || ''
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading';
        },
        auth_success(state, payload) {
            state.status = 'success';
            state.token = payload.token;
            state.currentUser = payload.user;
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = '';
            state.token = '';
            state.currentUser = {};
        },
        updateUser(state, user) {
            state.currentUser = user
        }
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios({ url: 'http://localhost:8081/api/users/login', data: user, method: 'POST' })
                    .then(resp => {
                        let token = resp.data.token;
                        let user = resp.data.data;

                        localStorage.setItem('token', token);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                        Cookies.set('token', `Bearer ${token}`);

                        commit('auth_success', {"token": token, "user": user});
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error');
                        localStorage.removeItem('token');
                        reject(err)
                    })
            })
        },
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios({ url: 'http://localhost:8081/api/users', data: user, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        localStorage.setItem('token', token);
                        // Add the following line:
                        axios.defaults.headers.common['Authorization'] = token;
                        commit('auth_success', {token, user});
                        resolve(resp);
                    })
                    .catch(err => {
                        commit('auth_error', err);
                        localStorage.removeItem('token');
                        reject(err);
                    })
            })
        },
        subscribe({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.put("http://localhost:8081/api/users/subscribe/" + this.state.currentUser._id, {"id": payload.id}).then( resp => {
                    const user = resp.data.data;
                    commit('updateUser', user);
                    resolve(resp);
                }).catch(err => {
                    reject(err)
                });
            })
        },
        unsubscribe({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.put("http://localhost:8081/api/users/unsubscribe/" + this.state.currentUser._id, {"id": payload.id}).then( resp => {
                    const user = resp.data.data;
                    commit('updateUser', user);
                    resolve(resp);
                }).catch(err => {
                    reject(err)
                });
            })
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                commit('logout');
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
                resolve()
            })
        },
        // eslint-disable-next-line no-unused-vars
        editepost({commit}, payload) {
            let postId = payload.postId;
            let data = {"content" : payload.content};
            return new Promise((resolve, reject) => {
                axios({ url: 'https://localhost:8080/posts/' + postId, method: 'PUT', data: data})
                    // eslint-disable-next-line no-unused-vars
                    .then(resp => {
                        resolve(resp)
                    })
                    // eslint-disable-next-line no-unused-vars
                    .catch(err => {
                        reject(err);
                    })
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        isBanned: state => state.currentUser.is_banned,
        authStatus: state => state.status,
        getCurrentUser: state => state.currentUser
    }
})
