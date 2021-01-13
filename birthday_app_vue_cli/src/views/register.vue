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
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert('User added with and logged in with success!')
            this.$router.push('/')
            .then(this.$store.dispatch('createUser'))
          },
          err => {
            alert(err.message)
        }
      )
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
