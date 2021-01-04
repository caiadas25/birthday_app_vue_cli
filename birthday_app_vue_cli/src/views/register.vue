<template>
<div>
  <div v-if="error" class="error">
    {{error.message}}
  </div>
  <form @submit.prevent="registerUser()">
    Register
    <div class="email">
      <input type="email" v-model="email" placeholder="email" autocomplete="on">
    </div>
    <div class="password">
      <input type="password" v-model="password" placeholder="password" autocomplete="on">
    </div>
    <button type="submit">Register</button>
  </form>
</div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase';

export default {
  name: 'register',
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
    async registerUser() {
      try{
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
        alert('User added with and logged in with success!')
        this.$router.push('/')
      } catch(err){
        console.log(err);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
