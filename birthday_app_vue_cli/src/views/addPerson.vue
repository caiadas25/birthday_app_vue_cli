<template>
  <div>
    <span class="headline">Nova pessoa</span>
      <FormulateForm class="form-addPerson" @submit="addPerson()">
          <FormulateInput validation="required" type="text" v-model="newPerson.name" label="Name" placeholder="Name"/>
          <FormulateInput type="text" v-model="newPerson.photo" label="URL" placeholder="URL" />
          <FormulateInput 
            type="select" 
            :options="this.formValues.birthDays" 
            label="Dia"
            validation="required" 
            v-model="newPerson.birthDay"
            placeholder="Dia"/>
          <FormulateInput type="select" 
            :options="this.formValues.birthMonths" 
            label="Mês"
            validation="required" 
            label-class="my-label-class"
            v-model="newPerson.birthMonth"
            placeholder="Mês"/>
            <FormulateInput class="button" type="submit"/>
            <router-link to="/" class="cancel-btn">Back</router-link>
      </FormulateForm>
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
      .then(this.$store.dispatch('getUserSpecificDataAction'))
      .then(this.$router.push('/'))
    },
  },
  data () {
    return {
      formValues: {
        birthDays: this.generateDays(31),
        birthMonths: this.generateMonths(12),
        newPerson: {
          name: '',
          birthDay: '',
          birthMonth: '',
          photo: '',
          userId: ''
        }
      },
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
<style lang="scss">
 @import './styles/mixins.scss';
 @import './styles/colors.scss';
 @import './styles/formulate.scss';

.headline {
  margin-left: 20px;
  font-size: 3em;
  margin-bottom: 15px;
}
.form-addPerson {
  display: flex;
  width: 50%;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
}

.my-label-class{
  color: blue;
}
</style>
