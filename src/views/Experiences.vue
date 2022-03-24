<template>
    <section class="experience-detail">
        <h2>{{experience.name}}</h2>
        <div class="experience-detail__content">
            <img :src="require(`@/assets/${experience.image}`)" :alt="experience.name">
            <p>{{experience.description}}</p>
        </div>
    </section>
</template>

<script>
import store from '@/store.js';
    export default {
        props: {
            id: {
                type: Number,
                required: true,
            },
            experienceSlug: {
                type: String,
                required: true
            }
        },
        computed: {
            destination(){
                return store.destinations.find(destination => destination.id === this.id);
            },
            experience() {
                return this.destination.experiences.find(experience => experience.slug === this.experienceSlug);
            }
        }
    }
</script>

<style scoped>
 .experience-detail{
     padding: 20px;
 }
 .experience-detail__content{
     display:flex;
     justify-content: flex-start;
     align-items: flex-start;
 }
 .experience-detail__content img{
     width: 40%;
     margin-right: 15px;
 }
 .experience-detail__content p{
     text-align:left;
     margin: 0;
 }
</style>