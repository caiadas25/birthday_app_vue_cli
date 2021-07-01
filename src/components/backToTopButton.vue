<template>
<div>
  <div v-if="backToTopButtonShow" class="arrow-wrapper" @click="scrollToTop()">
    <span class="arrow arrow-top"></span>
  </div>
</div>
</template>
<script>

export default {
  name: 'backToTopButton',
  data: function() {
    return {
      backToTopButtonShow: false,
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll)
  },
  methods: {
    handleScroll() {
        let rootElement = document.documentElement;
        let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
        if ((rootElement.scrollTop / scrollTotal) > 0.20) {
            this.backToTopButtonShow = true;
        } else {
            this.backToTopButtonShow = false;
        }
    },
    scrollToTop() {
      window.scrollTo(0,0);
    }
}
}

</script>

<style lang="scss" scoped>
 @import './styles/colors.scss';

.arrow-wrapper {
  background: $card-primary;
  position: fixed;
  border-radius: 50%;
  bottom: 50px;
  right: 50px;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .25s;
    &:active {
    background: darken($card-primary, 20%);
    transition: 0;
  }
}
.arrow {
  display: inline-block;
  width: 25px;
  height: 25px;
  border-top: 5px solid $button-primary;
  border-right: 5px solid $button-primary;
}

.arrow-top {
  transform: rotate(-45deg);
}

</style>
