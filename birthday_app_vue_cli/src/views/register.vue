<template>
<div>
  <div v-if="error" class="error">
    {{error.message}}
  </div>
  <span class="headline">Register</span>
  <FormulateForm class="form" v-model="formValues" @submit="registerUser()">
    <FormulateInput type="email" validation="required" name="email" placeholder="Email"/>
    <FormulateInput type="password" validation="required" name="password" placeholder="Password" />
    <FormulateInput type="submit" name="Register"/>
  </FormulateForm>
</div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase';

export default {
  name: 'register',
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
    async registerUser() {
        firebase.auth().createUserWithEmailAndPassword(this.formValues.email, this.formValues.password)
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
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
