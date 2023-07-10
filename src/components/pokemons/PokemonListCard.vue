<template>
  <div
    class="pokemon-list-card"
    :class="{ 'shrink-animation': wasClicked }"
    @click="showPokemonInfo"
    @animationend="wasClicked = false"
  >
    <img :src="image" alt="pokemon front default" class="screen" />
    <span>{{ image === silouette ? '???' : name }}</span>
  </div>
</template>

<script>
import silouette from '@assets/pokemons/silouette.png';

export default {
  name: 'PokemonListCard',
  data() {
    return {
      wasClicked: false,
      silouette,
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
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

  .screen {
    background: var(--screen-background-gradient);
    background-size: cover;
    border-radius: 0.5rem;
    margin-bottom: 0.3rem;
    border: 0.15rem solid var(--main-border-color);
    width: 6.25rem;
    height: 6.25rem;
  }

  span {
    color: var(--secondary-text-color);
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
