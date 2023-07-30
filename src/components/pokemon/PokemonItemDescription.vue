<template>
  <div class="pokemon-item-description">
    <hr />
    <span class="title">{{ $t('pokemon.descriptionFunFacts') }}</span>
    <ul>
      <li v-for="text in flavorTexts" :key="text">{{ text }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PokemonItemDescription',
  props: {
    flavorTexts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-item-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: $min-width-fourth-break) {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
  }

  hr {
    width: 100%;
    background-color: var(--variant-background-color);
    border-color: var(--variant-background-color);
    box-shadow: var(--main-box-shadow);
    height: 1rem;
  }

  .title {
    font-size: 2rem;
    margin: 1rem 0;

    @media (min-width: $min-width-fourth-break) {
      font-size: 2.5rem;
    }
  }

  ul {
    padding: 0;
    margin: 0 1rem;
    background-color: var(--cards-background-color);
    padding: 0 1rem;
    border-radius: 2rem;
    border: 0.2rem solid var(--secondary-border-color);
    box-shadow: var(--main-box-shadow);

    @media (min-width: $min-width-second-break) {
      margin: 0 2rem;
      padding: 1rem 2rem;
    }

    @media (min-width: $min-width-third-break) {
      margin: 0 3rem;
      padding: 1rem 3rem;
    }

    li {
      list-style: none;
      text-align: center;
      margin: 0.5rem 0;
      color: var(--main-text-color);
      font-family: 'Kanit';

      @media (min-width: $min-width-second-break) {
        margin: 1rem 0;
      }

      @media (min-width: $min-width-third-break) {
        margin: 1.5rem 0;
      }

      @media (min-width: $min-width-fourth-break) {
        grid-column-start: 1;
        font-size: 1.5rem;
      }
    }
  }
}
</style>
