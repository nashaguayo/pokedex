<template>
  <div
    class="pokemon-list-card"
    :class="{ 'shrink-animation': wasClicked }"
    @click="showPokemonInfo"
    @animationend="wasClicked = false"
  >
    <span class="id">#{{ id }}</span>
    <img :src="image" alt="pokemon front default" class="screen" />
    <span class="name">{{ image === silouette ? '???' : name }}</span>
    <div class="types">
      <span
        v-for="t in types"
        :key="`type-${t}`"
        :style="{ backgroundColor: pokemonColorTypes.get(t) }"
        class="type"
      >
        {{ t }}
      </span>
    </div>
  </div>
</template>

<script>
import silouette from '@assets/pokemons/silouette.png';
import { pokemonColorTypes } from '@constants/pokemonTypesColor';

export default {
  name: 'PokemonListCard',
  data() {
    return {
      wasClicked: false,
      silouette,
      pokemonColorTypes,
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
  },
  methods: {
    showPokemonInfo() {
      this.wasClicked = true;
      this.$router.push({ name: 'pokemon', params: { id: this.name } });
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-list-card {
  background-color: var(--cards-background-color);
  box-shadow: var(--main-box-shadow);
  border: 0.15rem solid var(--main-border-color);
  border-radius: 1rem;
  padding: 0.5rem;
  width: 8rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  .id {
    margin-bottom: 0.5rem;
    font-size: 1.7rem;
  }

  .screen {
    background: var(--screen-background-gradient);
    background-size: cover;
    border-radius: 0.5rem;
    margin-bottom: 0.3rem;
    border: 0.15rem solid var(--main-border-color);
    width: 6.25rem;
    height: 6.25rem;
  }

  .types {
    display: flex;
    margin: 0.5rem 0;
    gap: 0.5rem;

    .type {
      color: var(--secondary-text-color) !important;
      font-size: 0.75rem;
      padding: 0.2rem;
      border-radius: 1rem;
      box-shadow: var(--main-box-shadow);
    }
  }
}

.shrink-animation {
  animation: shrink 0.3s;
}

@keyframes shrink {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}
</style>
