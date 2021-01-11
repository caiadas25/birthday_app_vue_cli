<template>
<div :class="loggedIn ? 'navbar-item' : 'hidden'">
    Logged in
    <span v-if="loggedIn">Yes</span>
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
      firebase.auth().onAuthStateChanged(user => {
        console.log(user);
          if(user) {
              this.loggedIn = true;
          } else {
              this.loggedIn = false;
          }
      })
  },

  components: {

  },
  computed: {
    ...mapState([
      'friends'
    ])
  },
  methods: {
      async logoutUser() {
          try {
            const data = await firebase.auth().signOut();
            alert('logged out');
            this.$router.push('/')
          } catch (err) {
              console.log(err)
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
