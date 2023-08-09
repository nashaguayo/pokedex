<template>
  <div
    class="pokemon-item-header"
    :style="{ top: `${topPosition}px` }"
    ref="pokemonItemHeader"
  >
    <img
      class="location"
      alt="pokemon location"
      :src="
        require(`@/assets/images/locations/${pokemonHabitatsBackground.get(
          habitat
        )}`)
      "
      :height="locationHeight"
      :width="locationWidth"
    />
    <div
      v-if="!image"
      class="translucent-circle"
      :style="{
        height: `${locationHeight / 4}px`,
        width: `${locationHeight / 4}px`,
        top: `${locationHeight / 10}px`,
      }"
    ></div>
    <img
      v-if="image"
      class="pokemon-image"
      :src="image"
      alt="pokemon"
      :height="locationHeight"
      @load="setLocationHeight"
    />
    <img
      v-else
      class="small-pokemon-image"
      :src="smallImage"
      alt="pokemon"
      :height="locationHeight / 3"
      @load="setLocationHeight"
    />
    <div class="pokemon-backdrop-filter"></div>

    <h2 class="pokemon-name">
      {{ capitalizeWord(name.replace('-', ' ')) }}
      <FontAwesomeIcon
        v-if="isFavorited"
        color="white"
        class="icon"
        icon="fa-solid fa-star"
        @click="removePokemonAsFavorite"
      />
      <FontAwesomeIcon
        v-else
        color="white"
        class="icon"
        icon="fa-regular fa-star"
        @click="savePokemonAsFavorite"
      />
    </h2>

    <div class="favorites-big-screen">
      <BaseButton v-if="isFavorited" :onClickHandler="removePokemonAsFavorite">
        Unfave
        <FontAwesomeIcon color="white" class="icon" icon="fa-solid fa-star" />
      </BaseButton>
      <BaseButton v-else :onClickHandler="savePokemonAsFavorite">
        Fave
        <FontAwesomeIcon color="white" class="icon" icon="fa-regular fa-star" />
      </BaseButton>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import BaseButton from '@/components/ui/BaseButton';
import { capitalizeWord } from '@/lib/helpers';
import { pokemonHabitatsBackground } from '@/constants/pokemonHabitatsBackground';
import {
  isPokemonFavorited,
  removePokemonFromFavorites,
  savePokemonAsFavorite,
} from '@/store/mutations/pokemon';

export default {
  name: 'PokemonItemHeader',
  data() {
    return {
      locationHeight: 0,
      locationWidth: 0,
      location: '',
      pokemonHabitatsBackground,
      isFavorited: false,
    };
  },
  components: {
    BaseButton,
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
    habitat: {
      type: String,
      required: true,
    },
  },
  created() {
    if (isPokemonFavorited(this.name)) {
      this.isFavorited = true;
    }
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
      this.locationHeight = this.$refs.pokemonItemHeader.offsetWidth;
      this.locationWidth = this.$refs.pokemonItemHeader.offsetWidth;
    },
    savePokemonAsFavorite() {
      savePokemonAsFavorite(this.name);
      this.isFavorited = true;
    },
    removePokemonAsFavorite() {
      removePokemonFromFavorites(this.name);
      this.isFavorited = false;
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
    transition: height 0.3s;

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
    transition: height 0.3s;

    @media (min-width: $min-width-first-break) {
      width: 25rem;
      gap: 1rem;
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
    transition: height 0.3s;

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

    .icon {
      cursor: pointer;
    }
  }

  .favorites-big-screen {
    display: none;

    @media (min-width: $min-width-fourth-break) {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2rem;
    }
  }
}
</style>
