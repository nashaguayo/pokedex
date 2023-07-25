<template>
  <div
    class="pokemon-item-header"
    :style="{ top: `${topPosition}px` }"
    ref="pokemonItemHeader"
  >
    <img
      class="location"
      src="@/assets/pokemons/location.jpg"
      :height="locationHeight"
      :width="locationWidth"
    />
    <div
      v-if="!image"
      class="translucent-circle"
      :style="{
        height: `${locationHeight / 2}px`,
        width: `${locationHeight / 2}px`,
        top: `${locationHeight / 2 - locationHeight / 4}px`,
      }"
    ></div>
    <img
      v-if="image"
      class="pokemon-image"
      :src="image"
      alt="pokemon"
      ref="image"
      @load="setLocationHeight"
    />
    <img
      v-else
      class="small-pokemon-image"
      :src="smallImage"
      alt="pokemon"
      ref="image"
      @load="setLocationHeight"
    />
    <div class="pokemon-backdrop-filter"></div>
    <h2 class="pokemon-name">{{ capitalizeWord(name) }}</h2>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { capitalizeWord } from '@/lib/helpers';

export default {
  name: 'PokemonItemHeader',
  data() {
    return {
      locationHeight: 0,
      locationWidth: 0,
    };
  },
  props: {
    image: {
      type: String,
    },
    smallImage: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    topPosition: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.debouncedSetLocationHeight = debounce(this.setLocationHeight, 50);
    window.addEventListener('resize', this.debouncedSetLocationHeight);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.debouncedSetLocationHeight);
  },
  methods: {
    capitalizeWord,
    setLocationHeight() {
      this.locationHeight = this.$refs.image.offsetHeight;
      this.locationWidth = this.$refs.pokemonItemHeader.offsetWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-item-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  width: 100%;
  position: relative;

  @media (min-width: $min-width-fourth-break) {
    width: auto;
    margin-right: 3rem;
  }

  .location {
    position: absolute;
    box-shadow: var(--main-box-shadow);
    width: 100%;
    object-fit: cover;

    @media (min-width: $min-width-fourth-break) {
      border-radius: 2rem;
      border: 0.2rem solid var(--secondary-border-color);
      box-shadow: var(--main-box-shadow);
      max-width: 24rem;
    }

    @media (min-width: $min-width-fifth-break) {
      max-width: 34rem;
    }
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
    @media (min-width: $min-width-fourth-break) {
      display: none;
    }
  }

  .translucent-circle {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    z-index: 3;
  }

  .pokemon-image {
    width: 20rem;
    z-index: 5;
    padding: 2rem;

    @media (min-width: $min-width-first-break) {
      width: 25rem;
    }

    @media (min-width: $min-width-second-break) {
      width: 30rem;
    }

    @media (min-width: $min-width-fourth-break) {
      max-width: 20rem;
    }

    @media (min-width: $min-width-fifth-break) {
      max-width: 30rem;
    }
  }

  .small-pokemon-image {
    width: 10rem;
    z-index: 5;
    padding: 2rem;

    @media (min-width: $min-width-first-break) {
      width: 15rem;
    }

    @media (min-width: $min-width-fourth-break) {
      max-width: 10rem;
    }

    @media (min-width: $min-width-fifth-break) {
      max-width: 15rem;
    }
  }

  .pokemon-name {
    margin-top: -2rem;
    z-index: 10;
    color: var(--variant-text-color);
    -webkit-text-stroke-width: 0.1rem;
    -webkit-text-stroke-color: var(--variant-title-border-color);
    color: var(--variant-title-color);

    @media (min-width: $min-width-first-break) {
      margin-top: -3rem;
    }

    @media (min-width: $min-width-second-break) {
      -webkit-text-stroke-width: 0.2rem;
      margin-top: -3.5rem;
    }

    @media (min-width: $min-width-fourth-break) {
      display: none;
    }
  }
}
</style>
