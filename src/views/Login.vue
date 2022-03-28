<template>
    <div class="login">
        <h1>Login</h1>
        <div class="form">
            <label for="username">UserName: </label>
            <input ref="usernameRef" v-model="username" type="text" name="username" class="input" placeholder="User Name"/>
            <button @click="login">Login</button>
        </div>
    </div>
</template>

<script>
import store from '@/store.js';
    export default {
        data() {
            return {
                username: null,
            }
        },
        methods: {
            login() {
                if(this.username){
                    store.user = this.username;
                    localStorage.setItem('vue-router', JSON.stringify({user: this.username}));
                    const redirectName = this.$route.query.name;
                    if(redirectName){
                        this.$router.push({name: redirectName});
                    }
                    else{
                        this.$router.push({name: 'user'});
                    }
                }
                else{
                    this.$refs.usernameRef.style.borderColor = "red";
                }
            }
        }
    }
</script>

<style  scoped>
.login{
    text-align: center;
    padding: 20px;
}
.form{
    width: 40%;
    padding: 10px 15px;
    margin: auto;
}
button{
    padding: 5px 10px;
    margin: 10px 0;
}
</style>