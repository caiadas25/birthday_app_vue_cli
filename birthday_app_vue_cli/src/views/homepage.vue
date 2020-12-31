<template>
<div>
  <h1>{{getHeadline()}}</h1>
  <!--Create a v-for for the "person" component to display more than one when applicable-->
  <person v-if="this.checkIfThereAreMoreBirthdaysThisYear()"
          :birthMonth="this.getBirthMonthOfFirstFriend()"
          :birthDay="this.getBirthDayOfFirstFriend()"
          :name="this.getNameOfFirstFriend()"
          :photo="this.getPhotoOfFirstFriend()"></person>
</div>
</template>

<script>
import person from '../components/person';
import navbar from '../components/navbar';
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    'person': person,
    'navbar': navbar,
  },
  data: function() {
    return {
      persons: [
        ['hello'],
        ['goodbye']
      ],
      count: 2,
    }
  },
  created(){
  },
  props: {
  },

  name: 'homepage',

  computed: {
    ...mapGetters([
      'getData'
    ]),
    ...mapState([
      'friends'
    ]),
    ...mapActions([
    ])

  },

  methods: {
    getHeadline() {
      return this.checkIfThereAreMoreBirthdaysThisYear() ? 'Next birthday:' : 'No more birthdays this year :(';
    },

    //meaning that there are no more birthdays this year.
    checkIfThereAreMoreBirthdaysThisYear(){
      let dateInMilisecondsOfNextFriend = this.friends[0].birthdaysInMiliseconds;
      //if the first friend in the ordered list has no parsed birthday date and if the the miliseconds to the birthday of the same friend
      // is a negative number larger than -86400000 (the number of ms in a day) that means there are no more birthdays in the current year 
      return (this.friends[0].parsed.length === 0) && (dateInMilisecondsOfNextFriend <= -86400000) ? false : true;
    },

    getPhotoOfFirstFriend() {
      let friends = this.friends;
      return this.friends[0].photo;
    },
    getBirthMonthOfFirstFriend() {
      let friends = this.friends;
      for (let i = 0; i < friends.length; i++) {
        if (friends[i].birthMonth) {
            return friends[i].birthMonth;
        }
      }
    },
    getNameOfFirstFriend() {
      let friends = this.friends;
      for (let i = 0; i < friends.length; i++) {
        if (friends[i].name) {
            return friends[i].name;
        }
      }
    },
    getBirthDayOfFirstFriend() {
      let friends = this.friends;
      for (let i = 0; i < friends.length; i++) {
        if (friends[i].birthDay) {
            return friends[i].birthDay;
        }
      }
    }
  },
}
</script>

<style scoped>

h1 {
  font-size: 2em;
  margin: 20px;
}
</style>
