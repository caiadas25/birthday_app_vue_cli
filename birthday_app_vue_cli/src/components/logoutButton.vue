<template>
<div :class="this.loggedInStatus ? 'navbar-item' : 'hidden'">
    Logged in
    <span v-if="this.loggedInStatus">Yes</span>
    <span v-else>No</span>
    <button @click="logoutUser">Signout</button>
</div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase';


export default {
  name: 'logoutButton',
  data: function() {
    return {
        loggedIn: false
    }
  },

  mounted() {

  },

  components: {

  },
  computed: {
    ...mapState([
      'friends',
      'loggedInStatus'
    ])
  },
  methods: {
      async logoutUser() {
          try {
            const data = await firebase.auth().signOut();
            alert('logged out');
            this.$router.push('/')
          } catch (err) {
              //console.log(err)
          }
      }
  }
}
</script>

<style lang="scss" scoped>
.navbar-item {
  display: flex;
}
.hidden {
  display: none;
}
</style>
