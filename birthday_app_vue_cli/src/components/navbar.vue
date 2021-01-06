<template>
  <div class="navbar-wrapper">
    <div class="navbar-item-wrapper">
      <logoutButton class="navbar-item"></logoutButton>
    </div>
    <div v-for="(item, index) in navItems"
         :key="index"
         class="navbar-item">
      <router-link :class="$route.path === item.path ? 'highlighted' : ''" 
                    class="fill-div" 
                    :to="item.path">
        {{item.title}}
      </router-link>
    </div>
  </div>
</template>
<script>
import logoutButton from '../components/logoutButton';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'navbar',
  data: function() {
    return {
    }
  },
  components: {
    'logoutButton': logoutButton,
  },
  computed: {
    ...mapState([
      'navItems'
    ]),
  },

  methods: {
  },

}
</script>

<style scoped>

.highlighted{
  background: #f5f5f5;
  font-weight: bolder;
}

.navbar-wrapper{
  width: 100%;
  height: fit-content;
  display: flex;
}
.navbar-item-wrapper {
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: flex-end;
}
.navbar-item {
  width: 10%;
  height: 100px;
  justify-content: center;
  align-items: center;
}

.fill-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-decoration: none;
  color: black;
  font-weight: 500;
  width: 100%;
}
</style>
