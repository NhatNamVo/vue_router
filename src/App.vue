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
      <router-link :to="{name: 'mytour'}">Tour</router-link>
      <router-link v-if="!user" :to="{name: 'login'}">login</router-link>
      <router-link v-if="user" :to="{name: 'user'}">Dashboard</router-link>
      <a class="btn-logout" @click="logout" v-if="user">logOut</a>
    </div>
    <transition :name="transitionName" mode="out-in" appear>
      <router-view :key="$route.path"></router-view>
    </transition>
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
      user: (JSON.parse(localStorage.getItem('vue-router'))||{}).user,
      transitionName: 'slide',
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('vue-router');
      this.user = null;
      if(this.$route.path !== '/'){
        this.$router.push('/');
      }
    }
  },
  // updated() {
  //   const userAccount = JSON.parse(localStorage.getItem('vue-router'));
  //   if(userAccount) this.user = userAccount.user;
  // },
  watch: {
    // update change Nav router link when login
    '$route.path': function(newValue, oldValue) {
      if(oldValue === '/login'){
        const userAccount = JSON.parse(localStorage.getItem('vue-router'));
        if(userAccount) this.user = userAccount.user;
      }
    },
    // update transition for router view
    '$route.meta.transitionName': function(value) {
      if(value){
        this.transitionName = value;
      }
      else{
        this.transitionName = 'slide';
      }
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

.slide-enter-active, .slide-leave-active{
  transition: transform 0.3s;
  transform-origin: center top;
}
.slide-enter, .slide-leave-to {
  transform-origin: center top;
  transform: scaleY(0);
}
.btn-logout{
  cursor: pointer;
}
</style>
