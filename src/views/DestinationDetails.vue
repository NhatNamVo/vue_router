<template>
<div>
    <section class="destination">
        <h2>{{destination.name}}</h2>
        <div class="destination-details">
            <img :src="require(`@/assets/${destination.image}`)" :alt="destination.name"/>
            <div class="destination-description">{{destination.description}}</div>
        </div>
    </section>
    <section class="experiences">
        <h2>Top experiences in {{destination.name}}</h2>
        <div class="experience__content">
            <div v-for="experience in destination.experiences" :key="experience.name" class="card" id="experience">
                <router-link :to="{name: 'experienceDetails', params: {experienceSlug: experience.slug}, hash: '#experience'}">
                    <img :src="require(`@/assets/${experience.image}`)" :alt="experience.name"/>
                    <span class="card__text">{{experience.name}}</span>
                </router-link>
            </div>
        </div>
            <router-view :key="$route.path"></router-view>
    </section>
</div>
</template>

<script>
import store from '@/store.js';
    export default {
        data() {
            return {
                destinationId: this.$route.params.id,
            }
        },
        computed: {
            
            destination() {
                console.log('////////////////////////')
                return store.destinations.find(destination => {
                    console.log('item', typeof(destination.id));
                    console.log('id', typeof(this.destinationId));
                    return destination.id == this.destinationId;
                }) || {};
            }
            
        },
        mounted() {
            this.destination;
        }
    }
</script>

<style scoped>
 .destination{
     padding: 20px;
 }
 .destination-details{
     display:flex;
     justify-content: flex-start;
     align-items: flex-start;
 }
 .destination-details img{
     width: 40%;
     margin-right: 15px;
 }
 .destination-description{
     text-align:left;
 }
.experience__content{
    display: flex;
    padding: 20px;
}
.cards img{
    width: 100%;
}
.card{
    position: relative;
    width: 23%;
    margin: calc((100% - 4*23%)/8);
}
.card__text{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
    font-size: 25px;
    font-weight: bold;
    text-decoration: none;
}
</style>