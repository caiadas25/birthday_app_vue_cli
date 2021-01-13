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
  <div id="error">
    {{error}}
    <button v-if="error" @click="hideError()">X</button>
  </div>
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
    loginUser: function(e) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You are logged in as ${user.email}`);
            this.$router.push('/')

          },
          err => {
            this.error = 'Invalid Username or Password';
          }
        )
    },
    hideError() {
      this.error = '';
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
