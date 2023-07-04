<template>
  <CenteredColumn class="pokemon-item-header" ref="pokemonItemHeader">
    <img
      class="location"
      src="@assets/pokemons/location.jpg"
      :height="locationHeight"
      :width="locationWidth"
    />
    <img
      class="pokemon-image"
      :src="pokemonImage"
      alt="pokemon"
      ref="pokemonImage"
      @load="setLocationHeight"
    />
    <div class="pokemon-backdrop-filter"></div>
    <h2 class="pokemon-name">{{ pokemonName }}</h2>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';

export default {
  name: 'PokemonItemHeader',
  components: { CenteredColumn },
  data() {
    return {
      locationHeight: 0,
      locationWidth: 0,
    };
  },
  props: {
    pokemonImage: {
      type: String,
      required: true,
    },
    pokemonName: {
      type: String,
      required: true,
    },
  },
  methods: {
    setLocationHeight() {
      this.locationHeight = this.$refs.pokemonImage.offsetHeight;
      this.locationWidth = this.$refs.pokemonItemHeader.offsetWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.pokemon-item-header {
  width: 100%;

  .location {
    position: absolute;
    box-shadow: var(--main-box-shadow);
    width: 100%;
  }

  .pokemon-backdrop-filter {
    height: 2.5rem;
    width: 100%;
    z-index: 5;
    margin-top: -6rem;
    backdrop-filter: blur(1rem);

    @media (min-width: $min-width-first-break) {
      margin-top: -8rem;
      height: 4rem;
    }

    @media (min-width: $min-width-second-break) {
      margin-top: -11rem;
      height: 5rem;
    }
  }

  .pokemon-image {
    width: 20rem;
    z-index: 5;
    padding: 2rem 0;

    @media (min-width: $min-width-first-break) {
      width: 25rem;
    }

    @media (min-width: $min-width-second-break) {
      width: 30rem;
    }
  }

  .pokemon-name {
    margin-top: -2rem;
    z-index: 10;
    color: var(--variant-text-color) !important;

    @media (min-width: $min-width-first-break) {
      margin-top: -3rem;
    }

    @media (min-width: $min-width-second-break) {
      margin-top: -3.5rem;
    }
  }
}
</style>
