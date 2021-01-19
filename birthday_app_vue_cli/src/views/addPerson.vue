<template>
  <div>
    <span class="headline">Nova pessoa</span>
      <FormulateForm class="form-addPerson" v-model="formValues.newPerson" @submit="addPerson()">
          <FormulateInput type="text" name="name" label="Name" placeholder="Name" validation="required"/>
          <FormulateInput type="text" name="photo" label="URL" placeholder="URL"/>
          <FormulateInput 
            type="select" 
            :options="this.formValues.birthDays" 
            label="Dia"
            name="birthDay"
            placeholder="Dia"
            validation="required"/>
          <FormulateInput type="select" 
            :options="this.formValues.birthMonths" 
            label="Mês"
            name="birthMonth"
            placeholder="Mês"
            validation="required" />
          <FormulateInput type="select" 
            :options="this.formValues.birthYears" 
            label="Ano de Nascimento"
            name="birthYear"
            placeholder="Ano"/>
            <FormulateInput class="button" type="submit"/>
      </FormulateForm>
  </div>
</template>
<script>

import db from '../firebase/firebaseInit.js';
import { mapState } from 'vuex'
import firebase from 'firebase';
import { generateDays, generateMonths, generateYears } from '../utils';

export default {
  name: 'addPerson',

  mounted() {
      firebase.auth().onAuthStateChanged(user => {
          if(user) {
              this.loggedIn = true;
              this.formValues.newPerson.userId = user.email;
          } else {
              this.loggedIn = false;
          }
      })
  },
  methods: {
    async addPerson () {
      const friendProperties = {
        name: this.formValues.newPerson.name,
        birthDay: this.formValues.newPerson.birthDay,
        birthMonth: this.formValues.newPerson.birthMonth,
        photo: this.formValues.newPerson.photo,
        user: this.formValues.newPerson.userId,
        birthYear: this.formValues.newPerson.birthYear
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
        birthDays: generateDays(31),
        birthMonths: generateMonths(12),
        birthYears: generateYears(50),
        newPerson: {
          name: '',
          birthDay: '',
          birthMonth: '',
          photo: '',
          userId: '',
          birthYear: ''
        }
      },
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
  margin-top: 50px;
}
.form-addPerson {
  background: $card-primary;
  display: flex;
  width: 25%;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  padding: 25px;
  margin-top: 50px;
  border-radius: 10px;
}
</style>
