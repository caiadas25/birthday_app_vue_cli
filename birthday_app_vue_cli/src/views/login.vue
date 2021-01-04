<template>
<div>
    <span>Hello</span>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'login',
  data: function() {
    return {

    }
  },
  components: {

  },
  computed: {
    ...mapState([
      'friends'
    ])
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
