<template>
  <div class="navbar-wrapper">
    <div v-for="(item, index) in newNavItemsIfLoggedIn()"
         :key="index"
         class="navbar-item">
      <router-link :class="$route.path === item.path ? 'highlighted' : ''" 
                    class="fill-div" 
                    :to="item.path">
        {{item.title}}
      </router-link>
    </div>
    <logoutButton class="navbar-item"/>
  </div>
</template>
<script>
import logoutButton from '../components/logoutButton';
import { mapState } from 'vuex'

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
      'navItems',
      'loggedInStatus'
    ]),
  },

  methods: {
    newNavItemsIfLoggedIn() {
      if (this.loggedInStatus) {
      let newNavItems = [
          {
            path: "/",
            title: "Homepage"
          },
          {
            path: "/catalog",
            title: "Catalog"
          },
          {
            path: "/addPerson",
            title: "Add Person"
          }
        ]
        return newNavItems;
      } else {
        return this.navItems;
      }
    }
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
