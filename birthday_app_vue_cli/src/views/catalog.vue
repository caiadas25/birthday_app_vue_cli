<template>
<div>
  <ul class="catalog-container">

    <li v-for="userSpecificFriend in userSpecificFriends" 
        v-bind:key="userSpecificFriend['.key']" 
        class="person-container-catalog">
        <div v-if="friendIdentifier === userSpecificFriend.name">
        <FormulateForm class="edit-form">
            <FormulateInput input-class="edit-form-input-name" class="edit-form-input-text" type="text" v-model="editedFriend.name"/>
            <div class="form-item-date-container">
              <FormulateInput type="select" input-class="edit-form-input-select" :options="birthDays" v-model="editedFriend.birthDay"/>
              <span class="form-item-date-span">of</span>
              <FormulateInput type="select" input-class="edit-form-input-select" :options="birthMonths" v-model="editedFriend.birthMonth"/>
            </div>
            <FormulateInput type="text" label="Photo URL" class="edit-form-input-text" v-model="editedFriend.photo"/>
        </FormulateForm>
        <div class="button-primary" @click="onEditSubmit()">Confirm</div>
        <div class="button-secondary" @click="onCancel(userSpecificFriend.name)">Cancel</div>
        </div>
        <person v-else
          :birthMonth="userSpecificFriend.birthMonth"
          :birthDay="userSpecificFriend.birthDay"
          :name="userSpecificFriend.name"
          :photo="userSpecificFriend.photo"></person>
        <div v-if="!(friendIdentifier === userSpecificFriend.name)">
          <div class="button-primary" @click="onEdit(userSpecificFriend)">Edit</div>
          <div class="button-secondary" @click="onRemove(userSpecificFriend.name)">Delete</div>
        </div>
    </li>
  </ul>
  <router-link to="/" >Back</router-link>
</div>
</template>

<script>
import person from '../components/person';
import { mapState } from 'vuex'
import db from '../firebase/firebaseInit.js';
import { generateDays, generateMonths} from '../utils';

export default {
  name: 'catalog',
  data: function() {
    return {
      birthDays: generateDays(31),
      birthMonths: generateMonths(12),
      friendIdentifier: '',
      editedFriend: {
          name: '',
          birthDay: '',
          birthMonth: '',
          photo: '',
      }
    }
  },
  components: {
    'person': person,
  },
  computed: {
    ...mapState([
      'friends',
      'userSpecificFriends'
    ])
  },
  methods: {
    onRemove(friendName) {
      //finds the friend with the attribute "name" which matches the name of the friend we want to delete.
      db.collection('people').where('name', '==', friendName).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete()
          //fetches the list of friends again to display the updated list
          .then(this.$store.dispatch('getUserSpecificDataAction'))
          .then(alert('Friend successfully removed!'))
        })
      })
    },
    //edit mode functions
    onEdit(friend) {
      this.friendIdentifier = friend.name;
      this.editedFriend.name = friend.name
      this.editedFriend.photo = friend.photo
      this.editedFriend.birthDay = friend.birthDay
      this.editedFriend.birthMonth = friend.birthMonth
      this.editedFriend.user = friend.user
    },
    onCancel() {
      this.friendIdentifier = '';
      this.editedFriend.name = '';
      this.editedFriend.photo = '';
      this.editedFriend.birthDay = '';
      this.editedFriend.birthMonth = '';
    },
    onEditSubmit() {
        db.collection('people').where('name', '==', this.friendIdentifier).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.set({
            name: this.editedFriend.name,
            photo: this.editedFriend.photo,
            birthDay: this.editedFriend.birthDay,
            birthMonth: this.editedFriend.birthMonth,
            user: this.editedFriend.user,
          })
          //fetches the list of friends again to display the updated list
          .then(console.log('Friend successfully edited!'))
          .then(this.$store.dispatch('getUserSpecificDataAction'))
        })
      })
      //resets the friend identifier to close edit mode
      this.friendIdentifier = '';
      this.$store.dispatch('getUserSpecificDataAction');
    }
  }
}
</script>

<style lang="scss">
 @import './styles/mixins.scss';
 @import './styles/colors.scss';
 @import './styles/formulate.scss';
.edit-form {
  display: flex;
  height: 400px;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
}
.form-item-date-span {
  display: flex;
  align-self: flex-end;
  line-height: 50px;
  padding: 0 5px 0 5px;
}
.edit-form-input-text {
  text-align: left;
  width: 70%;
}
.edit-form-input-select {
  font-size: 2em;
}
.edit-form-input-name {
  font-size: 3em;
  font-weight: 500;
}
.person-container-catalog .person-container {
  box-shadow: none;
}

.form-item-date-container{
  display: flex;
  width: 40%;
}

.catalog-container {
  align-items: center;
  display: flex;
  flex-direction: column;
}
.person-container-catalog{
  width: 700px;
  padding: 5px;
  margin: 20px;
  background: $card-primary;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(186,126,126, .5);
}


</style>
