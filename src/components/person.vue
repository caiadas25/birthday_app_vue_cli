<template>
  <div class="person-container">
      <div class="person-details-container">
        <div class="person-name-element">
          {{name}}
        </div>
        <div class="person-date-element">
          {{birthDay}} of {{birthMonth}}
        </div>
        <span v-if="age">Vai fazer: {{age}}</span>
      </div>
      <img class="person-photo-element" :src=addDefaultImage(photo) alt="photo">
  </div>
</template>
<script>
import db from '../firebase/firebaseInit.js';

export default {
  name: 'person',
  computed: {
  },
  props: [
    'name',
    'birthDay',
    'birthMonth',
    'photo',
    'age'
    ],

  methods: {
    addDefaultImage(photo) {
      return !photo ? 'https://homepages.cae.wisc.edu/~ece533/images/cat.png' : photo;
    },
  },
}
</script>

<style lang="scss" scoped>
 @import './styles/colors.scss';

.person-container {
  display: flex;
  height: 400px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  color: black;
  margin: 0 auto;
  text-align: left;
  width: 700px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(186,126,126, .5);
}
.person-details-container {
  flex-direction: column;
  padding-right: 25px;
  flex: 1;
  padding-left: 50px;
}
.person-date-element {
  font-size: 2em;
}
.person-name-element {
  font-size: 3em;
  font-weight: 500;
  text-align: left;
}
.person-photo-element {
  width: 300px;
  height: 300px;
  object-fit: cover;
  flex: 1.5; 
  padding-right: 25px;
}
</style>
