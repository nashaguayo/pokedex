<template>
  <!-- TO-DO: Create slot for this class, display flex, flex direction, align items. -->
  <div class="random-pokemon">
    <h1>Random Pokemon</h1>
    <div class="pokedex">
      <div class="buttons">
        <div class="big-button">
          <div class="big-button__shine"></div>
        </div>
        <div class="screen"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RandomPokemon',
};
</script>

<style lang="scss" scoped>
.random-pokemon {
  display: flex;
  flex-direction: column;
  align-items: center;

  .pokedex {
    margin: 1rem 0;
    border: 0.5rem solid var(--main-border-color);
    border-radius: 10px;
    box-shadow: 0.5rem 0.5rem var(--main-shadow-color);
    height: 40rem;
    width: 20rem;
    background-color: var(--secondary-background-color);
    display: flex;
    flex-direction: column;
    align-items: center;

    .big-button {
      border: 0.2rem solid var(--main-border-color);
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      box-shadow: 0.2rem 0.2rem var(--main-shadow-color);
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
      border: 0.2rem solid var(--main-border-color);
      background-color: var(--main-background-color);
    }
  }
}
</style>
