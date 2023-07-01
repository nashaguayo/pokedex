<template>
  <div class="mobile-header">
    <router-link to="/">
      <img src="@assets/ui/pokeball.svg.png" alt="menu" class="menu-icon" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MobileHeader',
};
</script>

<style lang="scss" scoped>
@import '@css/colors.scss';

.mobile-header {
  background-color: $secondary-background-color;
  height: 5rem;
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  box-shadow: $main-box-shadow;

  .menu-icon {
    height: 4rem;
    margin-left: 1.5rem;
  }
}
</style>
