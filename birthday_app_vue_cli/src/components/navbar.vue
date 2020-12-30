<template>
  <div class="navbar-wrapper">
    <div class="navbar-item navbar-logo">
      <router-link class="fill-div" to="/">Homepage</router-link>
    </div>
    <div class="navbar-item-wrapper">
      <div class="navbar-item">
        <router-link class="fill-div" to="/catalog">Catalog</router-link>
      </div>
      <div class="navbar-item">
        <router-link class="fill-div" to="/addPerson">Add Person</router-link>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'navbar',

  computed: {

  },

  methods: {

  },

}
</script>

<style scoped>
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
  display: flex;
  width: 20%;
  height: 100px;
  justify-content: center;
  align-items: center;
}
.navbar-item :hover {
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
