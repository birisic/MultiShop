import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import articles from './modules/articles'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        users: users,
        articles: articles
    }
})