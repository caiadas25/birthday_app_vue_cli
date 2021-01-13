<template>
  <div>
    <h3>Nova pessoa</h3>
    <div class="form-wrapper">
      <form @submit.prevent="addPerson" class="form">
        <div class="form-item">
          <label class="form-label">Nome: </label>
          <input type="text" v-model="newPerson.name">
        </div>
        <div class="form-item">
          <label class="form-label">URL: </label>
          <input type="text" v-model="newPerson.photo">
        </div>
        <div class="form-item">
          <label class="form-label">Dia: </label>
          <select v-model="newPerson.birthDay">
            <option v-for="birthDay in birthDays" :key="birthDay">
              {{ birthDay }}
            </option>
          </select>
        </div>
        <div class="form-item">
          <label class="form-label">Mês: </label>
          <select v-model="newPerson.birthMonth">
            <option v-for="birthMonth in birthMonths" :key="birthMonth">
              {{ birthMonth }}
            </option>
          </select>
        </div>
        <div class="action-buttons">
          <button type="submit" class="submit-btn">Submeter</button>
          <router-link to="/" class="cancel-btn">Cancelar</router-link>
        </div>
        <pre>{{newPerson.userId}}</pre>
      </form>
    </div>
  </div>

</template>
<script>

import db from '../firebase/firebaseInit.js';
import { mapState } from 'vuex'
import firebase from 'firebase';

export default {
  name: 'addPerson',

  mounted() {
      firebase.auth().onAuthStateChanged(user => {
          if(user) {
              this.loggedIn = true;
              this.newPerson.userId = user.email;
              //console.log(this.newPerson.userId)
          } else {
              this.loggedIn = false;
          }
      })
  },
  methods: {
    generateDays(numberOfDays){
      return [...Array(numberOfDays + 1 ).keys()]
    },
    generateMonths(numberOfMonths){
      return  ([...Array(numberOfMonths).keys()]).map(function(num) {
          return moment().month(num).format("MMMM")
      })
    },
    async addPerson () {
      const friendProperties = {
        name: this.newPerson.name,
        birthDay: this.newPerson.birthDay,
        birthMonth: this.newPerson.birthMonth,
        photo: this.newPerson.photo,
        user: this.newPerson.userId
      }
      await db.collection("people").add(friendProperties)
      .then(this.$store.dispatch('getWholeDataAction'))
      .then(this.$router.push('/'))
    },
  },
  data () {
    return {
      birthDays: this.generateDays(31),
      birthMonths: this.generateMonths(12),
      newPerson: {
          name: '',
          birthDay: '',
          birthMonth: '',
          photo: '',
          userId: ''
      }
    }
  },
}

</script>
<style scoped>
h3 {
  font-size: 28px;
}
.form-wrapper {
  display: flex;
  justify-content: center;
}
.form {
  display: flex;
  width: 15%;
  flex-direction: column;
}
.form-label {
  display: flex;
  align-items: center;
}
.form-item {
  display: flex;
  align-items: left;
  justify-content: space-between;
  margin: 10px;
}
select, input {
  font-size: 16px;
  height: 30px;
  width: 70%;
}
button {
  height: 36px;
  background: teal;
  color: white;
  font-size: 16px;
  padding: 5px;
}
.action-buttons {
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  align-self: center;
}
</style>
