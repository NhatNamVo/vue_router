<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <!-- <router-link to="/brazil">Brazil</router-link>
      <router-link to="/panama">Panama</router-link>
      <router-link to="/hawaii">Hawaii</router-link>
      <router-link to="/jamaica">Jamaica</router-link> -->
      <template v-for="destination in destinations">
        <router-link :key="destination.id" :to="{name: 'destinationDetail', params: {id: destination.id}}">
          {{destination.name}}
        </router-link>
      </template>
    </div>
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
import store from '@/store.js';
export default {
  name: "App",
  components: {},
  data() {
    return {
      destinations: store.destinations,
    }
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  width: 100%;
  height: 50px;
  box-shadow: 0 5px 12px 0 #eee;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#nav a {
  text-decoration: none;
  color: black;
  margin: 0 10px;
}
#nav a.router-link-exact-active {
  color: #77fc56;
}
</style>
