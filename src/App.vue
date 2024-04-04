<template>
  <div id="app">
    <Nav/>

    <router-view></router-view>

    <Footer/>
  </div>
</template>

<script>
import Nav from './components/fixed/Nav.vue'
import Footer from './components/fixed/Footer.vue'
export default {
  name: 'App',
  components: {
    Nav,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
