<template>
  <div class="home">
    <template v-for="destination in destinations">
      <div class="home-item" :key="destination.id">
        <router-link :to="{name: 'destinationDetail', params:{id: destination.id}}">
          <h2>{{destination.name}}</h2>
        </router-link>
          <router-link :to="{name: 'destinationDetail', params:{id: destination.id}}">
            <img :src="require(`@/assets/${destination.image}`)" :alt="destination.name"/>
          </router-link>
      </div>
    </template>
  </div>
</template>

<script>
import store from "@/store.js";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      destinations: store.destinations,
    }
  }
};
</script>


<style scope>
  .home{
    display: flex;
    padding: 20px;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .home-item{
    width: 42%;
    margin: calc((100% - 2*42%)/4);
  }
  img{
    width: 100%;
  }
  @media screen and (min-width: 992px){
    .home-item{
      width: 23%;
      margin: calc((100% - 4*23%)/8);
    }
  }
</style>
