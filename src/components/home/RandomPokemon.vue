<template>
  <CenteredColumn>
    <h2>Random Pokemon</h2>
    <div class="pokedex">
      <div class="buttons">
        <div class="big-button">
          <div class="big-button__shine"></div>
        </div>
        <div class="screen"></div>
      </div>
    </div>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';

export default {
  name: 'RandomPokemon',
  components: { CenteredColumn },
};
</script>

<style lang="scss" scoped>
@import '@css/colors.scss';

.pokedex {
  margin: 1rem 0;
  border: 0.5rem solid $main-border-color;
  border-radius: 10px;
  box-shadow: 0.5rem 0.5rem $main-shadow-color;
  height: 40rem;
  width: 20rem;
  background-color: $secondary-background-color;
  display: flex;
  flex-direction: column;
  align-items: center;

  .big-button {
    border: 0.2rem solid $main-border-color;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    box-shadow: 0.2rem 0.2rem $main-shadow-color;
    background-color: #03fcf8;
    margin: 1rem 0;
  }

  .big-button__shine {
    background-color: #7dfffd;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    position: relative;
    top: 0.5rem;
    left: 0.5rem;
  }

  .screen {
    border-radius: 1rem;
    width: 15rem;
    height: 15rem;
    border: 0.2rem solid $main-border-color;
    background-color: $main-background-color;
  }
}
</style>
