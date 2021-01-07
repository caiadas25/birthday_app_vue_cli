<template>
<div>
  <ul class="catalog-container">
    <li v-for="friend in friends" v-bind:key="friend['.key']" class="person-container-catalog">
        <div v-if="friendIdentifier === friend.name">
        <form class="edit-form">
          <div class="form-item">
            <input type="text" class="form-item-name" v-model="editedFriend.name">
          </div>
          <div class="form-item-date-container">
            <div class="form-item">
              <select class="form-item-date" v-model="editedFriend.birthDay">
                <option v-for="birthDay in birthDays" :key="birthDay">
                  {{ birthDay }}
                </option>
              </select>
            </div>
            <span class="form-item-date-span">of</span>
            <div class="form-item">
              <select class="form-item-date" v-model="editedFriend.birthMonth">
                <option v-for="birthMonth in birthMonths" :key="birthMonth">
                  {{ birthMonth }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-item-url-container">
            <label class="form-item-url-label">Photo URL: </label>
            <input type="text" class="form-item-url" v-model="editedFriend.photo">
          </div>
        </form>
          <button @click="onEditSubmit()">confirm</button>
          <button @click="onCancel(friend.name)">cancel</button>
        </div>
        <person v-else
          :birthMonth="friend.birthMonth"
          :birthDay="friend.birthDay"
          :name="friend.name"
          :photo="friend.photo"></person>
          <div v-if="!(friendIdentifier === friend.name)">
            <button @click="onEdit(friend)">Edit</button>
            <button @click="onRemove(friend.name)">Remove</button>
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

export default {
  name: 'catalog',
  data: function() {
    return {
      birthDays: this.generateDays(31),
      birthMonths: this.generateMonths(12),
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
      'friends'
    ])
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
    onRemove(friendName) {
      //finds the friend with the attribute "name" which matches the name of the friend we want to delete.
      db.collection('people').where('name', '==', friendName).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete()
          //fetches the list of friends again to display the updated list
          .then(this.$store.dispatch('obtainData'))
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
          })
          //fetches the list of friends again to display the updated list
          .then(alert('Friend successfully edited!'))
          .then(this.$store.dispatch('obtainData'))
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.person-container-catalog .person-container {
  box-shadow: none;
}
.edit-form {
  display: flex;
  height: 400px;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
.form-item-name{
  font-size: 3em;
  font-weight: 500;
  display: flex;
}
.form-item-date-container{
  display: flex;
}
.form-item-date {
  font-size: 2em;
  &-span {
    font-size: 1.5em;
  }
}

.form-item-url {
  font-size: 2em;
}

.form-item-url-container {
  display: flex;
  flex-direction: column;
}
.form-item-url-label{
  text-align: left;
}
.catalog-container {
  width: 50%;
  margin: 0 auto;
}
.person-container-catalog{
  width: 700px;
  padding: 5px;
  margin: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(186,126,126, .5);
}
</style>
