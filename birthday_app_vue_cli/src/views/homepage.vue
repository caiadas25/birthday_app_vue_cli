<template>
<div>
  <h1>{{getHeadline()}}</h1>
  <!--Create a v-for for the "person" component to display more than one when applicable-->
  <person v-if="this.firstFriendHasEmptyParsedDate()"
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
      return this.firstFriendHasEmptyParsedDate() ? 'Next birthday:' : 'No more birthdays this year :(';
    },

    //meaning that there are no more birthdays this year.
    async firstFriendHasEmptyParsedDate(){
      //await this.$store.dispatch('obtainData');
      //above line causes infinite loop
      let dateInMilisecondsOfNextFriend = this.friends[0].birthdaysInMiliseconds;
      //86400000 is the number of ms in a day. Thus, if the value is larger than -86400000, it means the current day is a birthday day.
      return (dateInMilisecondsOfNextFriend >= -86400000) ? true : false;
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
