<template>
<div>
  <div class="login-card-wrapper">
    <div class="login-card">
    <FormulateForm class="login-card-form" v-model="formValues" @submit="loginUser()">
      <span class="login-card-title">Login</span>
      <FormulateInput class="input" type="email" name="email" placeholder="Email"/>
      <FormulateInput class="input" type="password" name="password" placeholder="Password" />
      <FormulateInput type="submit" name="Login"/>
      <div class="error">
        {{error}}
        <button v-if="error" @click="hideError()">X</button>
      </div>
    </FormulateForm>
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
      formValues: {
        email: '', 
        password: ''
      },
      error: '',
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
        firebase.auth().signInWithEmailAndPassword(this.formValues.email, this.formValues.password)
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
 @import './styles/colors.scss';
 @import './styles/formulate.scss';

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
  &-title {
    margin-left: 20px;
    font-size: 3em;
    margin-bottom: 15px;
  }
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

.error {
  margin-left: 20px;
}




</style>
