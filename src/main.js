import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import Home from './components/pages/Home.vue'
import Shop from './components/pages/Shop.vue'
import Login from './components/pages/Login.vue'
import Register from './components/pages/Register.vue'
import Contact from './components/pages/Contact.vue'
import Admin from './components/pages/Admin.vue'

import Cart from './components/pages/Cart.vue'
import store from "./store/store"
// import Article from './components/articles/Article.vue'
import RoleDirective from "./directives/RoleDirective.js"
// import { ValidationProvider, extend }from 'vee-validate';
// import * as rules from 'vee-validate/dist/rules';
import 'bootstrap/dist/css/bootstrap.css'
import '../public/css/style.css'



const instance = axios.create({
  baseURL: 'https://eliteshoppy-praktikumphp.000webhostapp.com/EliteShoppy-v2/'
});

Vue.prototype.$axios = instance;
Vue.prototype.$loadGenerics = function(table) {
      let that = this;

      this.$axios.get('models/api.php', { params: { table: table } })
      .then(function(result){
          that[table] = result.data;
      }).catch(function(error){
          console.log(error);
      });
}

// Object.keys(rules).forEach(rule => {
//   extend(rule, rules[rule]);
// });

var routes = [
  { path: "/", component: Home },
  { path: "/shop", component: Shop },
  // { path: "/articles/:id", component: Article },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/admin", component: Admin },
  { path: "/cart", component: Cart },
  { path: "/contact", component: Contact }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

// Vue.component("ValidationProvider", ValidationProvider)


Vue.use(VueRouter);
Vue.directive("role", RoleDirective)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  created: function() {
    let admin = [{
        firstName: "admin",
        lastName: "admin",
        email: "admin@gmail.com",
        pass: "adminadmin",
        role: "admin" 
    }]

    let users = localStorage.getItem("users");
    if(!users) {
      localStorage.setItem("users",JSON.stringify(admin));
    }
    
    let allUsers = JSON.parse(localStorage.getItem("users"))
    this.$store.commit("setUsers", allUsers  );

    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.$store.commit("changeUser", user);
      return;
    } 
    
    this.$store.commit("changeUser", undefined);
    
  },
  render: h => h(App),
}).$mount('#app')
