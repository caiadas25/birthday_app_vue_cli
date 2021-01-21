<template>
<div>
  <div v-if="!this.loggedInStatus">
    Please Login to see your friend's birthdays and add more!
  </div>
  <div v-if="this.userSpecificFriends.length">
    <!--v-if above only lets the template render when the state has fetched the friends from firestore-->
    <h1>{{getHeadline()}}</h1>
    <pre>{{batatas()}}</pre>
    <!--Create a v-for for the "person" component to display more than one when applicable-->
    <person v-if="this.checkIfThereAreMoreBirthdaysThisYear()"
        :birthMonth="this.getBirthMonthOfFirstFriend()"
        :birthDay="this.getBirthDayOfFirstFriend()"
        :name="this.getNameOfFirstFriend()"
        :photo="this.getPhotoOfFirstFriend()"
        :age="this.getAgeOfFirstFriend()"></person>
  </div>
</div>

</template>

<script>
import person from '../components/person';
import navbar from '../components/navbar';
import { Telegraf } from 'telegraf';
import { initialeTelegramBot } from '../telegram';
import { 
  mapState, 
  mapGetters, 
  mapActions, 
  mapMutations 
  } from 'vuex'

export default {
  components: {
    'person': person,
    'navbar': navbar,
  },
  data: function() {
    return {
    }
  },

  name: 'homepage',

  mounted(){
  },

  computed: {
    ...mapGetters([
    ]),
    ...mapState([
      'friends',
      'userSpecificFriends',
      'loggedInStatus'
    ]),
    ...mapActions([
    ]),
    ...mapMutations([
    ])
  },

  methods: {

    batatas() {
      let userSpecificFriends = this.userSpecificFriends;
      for (let i = 0; i < userSpecificFriends.length; i++) {
        if (userSpecificFriends[i].name) {
            initialeTelegramBot(userSpecificFriends[i].name)
            console.log(this.userSpecificFriends[i].name)

            return userSpecificFriends[i].name;
        }
      }
      return ;
    },

    getHeadline() {
      return this.checkIfThereAreMoreBirthdaysThisYear() ? 'Next birthday:' : 'No more birthdays this year :(';
    },

    //meaning that there are no more birthdays this year.
    checkIfThereAreMoreBirthdaysThisYear(){
      let dateInMilisecondsOfNextFriend = this.userSpecificFriends[0].birthdaysInMiliseconds;
      //if the first friend in the ordered list has no parsed birthday date and if the the miliseconds to the birthday of the same friend
      // is a negative number larger than -86400000 (the number of ms in a day) that means there are no more birthdays in the current year 
      return (this.userSpecificFriends[0].parsed.length === 0) && (dateInMilisecondsOfNextFriend <= -86400000) ? false : true;
    },
    getAgeOfFirstFriend() {
      return this.userSpecificFriends[0].age;
    },
    getPhotoOfFirstFriend() {
      return this.userSpecificFriends[0].photo;
    },
    getBirthMonthOfFirstFriend() {
      let userSpecificFriends = this.userSpecificFriends;
      for (let i = 0; i < userSpecificFriends.length; i++) {
        if (userSpecificFriends[i].birthMonth) {
            return userSpecificFriends[i].birthMonth;
        }
      }
    },
    getNameOfFirstFriend() {
      let userSpecificFriends = this.userSpecificFriends;
      for (let i = 0; i < userSpecificFriends.length; i++) {
        if (userSpecificFriends[i].name) {
            return userSpecificFriends[i].name;
        }
      }
    },
    getBirthDayOfFirstFriend() {
      let userSpecificFriends = this.userSpecificFriends;
      for (let i = 0; i < userSpecificFriends.length; i++) {
        if (userSpecificFriends[i].birthDay) {
            return userSpecificFriends[i].birthDay;
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
