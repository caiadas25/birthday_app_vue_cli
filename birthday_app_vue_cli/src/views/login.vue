<template>
<div>
  <div class="login-card-wrapper">
    <div class="login-card">
      <form class="login-card-form" @submit.prevent='loginUser()'>
        <span class="login-card-title">Login</span>
        <div class="login">
          <input type="email" placeholder="login" autocomplete="on" v-model="email">
        </div>
        <div class="password">
          <input type="password" placeholder="password" autocomplete="on" v-model="password">
        </div>
        <button class="button" type="submit">Login</button>
        <div class="error">
          {{error}}
          <button v-if="error" @click="hideError()">X</button>
        </div>
      </form>

    </div>

    <div class="register-card">
      <span>Need an account? Click here to <router-link to="/register">register</router-link></span>
    </div>
  </div>
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
 @import './styles/mixins.scss';

.login-card-wrapper {
  width: 50%;
  border: 1px solid black;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  height: 400px;
}
.login{
  width: 100%;
}
.login-card {
  flex: 2;
  align-self: center;
  border-right: 1px solid black;
  height: 100%;
  display: flex;
  background: #f5f5f5;

  &-form {
    align-self: center;
    text-align: left;
    display: flex;
    flex-flow: column;
    width: 100%;
    input {
      width: 500px;
      padding: 15px;
      margin-bottom: 15px;
      margin-left: 20px;
      width: 80%;
      font-size: 25px;
    }
  }
}
.login-card-title {
  margin-left: 20px;
  font-size: 3em;
  margin-bottom: 15px;
}
.register-card {
  display: flex;
  flex: 1;
  background-color: #3369ff;
  span {
    align-self: center;
    font-size: 20px;
    color: #f5f5f5;
  }
}

.button{
  @include button;
  margin-left: 20px;
  width: 30%;
}
.error {
  margin-left: 20px;
}
</style>
