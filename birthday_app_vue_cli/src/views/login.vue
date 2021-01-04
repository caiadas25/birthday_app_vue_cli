<template>
<div>
  <form @submit.prevent='loginUser()'>
    <div class="login">
      <input type="email" placeholder="login" autocomplete="on" v-model="email">
    </div>
    <div class="password">
      <input type="password" placeholder="password" autocomplete="on" v-model="password">
    </div>
    <button type="submit">Login</button>
  </form>
  <div class="error" v-if="error">{{error.message}}</div>
  <span>Need an account? Click here to <router-link to="/register">register</router-link></span>
</div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase';

export default {
  name: 'login',
  data: function() {
    return {
      error: '',
      email: '',
      password: ''
    }
  },
  components: {

  },
  computed: {
    ...mapState([
      'friends'
    ])
  },
  methods: {
    loginUser() {
      try {
        const val = firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        alert('user logged In')
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
