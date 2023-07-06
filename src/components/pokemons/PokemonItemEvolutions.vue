<template>
  <CenteredColumn class="pokemon-item-evolutions">
    <span class="title">Evolutions</span>
    <div class="card">
      <CenteredColumn class="evolution">
        <transition name="fade" mode="out-in">
          <span :key="evolutions[evolution].species">
            {{ evolutions[evolution].species }}
          </span>
        </transition>
        <div
          class="screen"
          :style="{ backgroundImage: `url(${evolutions[evolution].image})` }"
        ></div>
      </CenteredColumn>
      <div class="buttons">
        <BaseChevron
          :onClickHandler="getPreviousEvolution"
          direction="left"
          :disabled="!evolution"
        />
        <BaseChevron
          :onClickHandler="getNextEvolution"
          direction="right"
          :disabled="evolutions.length - 1 === evolution"
        />
      </div>
    </div>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '@components/ui/CenteredColumn.vue';
import BaseChevron from '@components/ui/BaseChevron.vue';
import { getPokemonEvolutions } from '@api/evolutions.js';

export default {
  name: 'PokemonItemEvolutions',
  props: {
    pokemonId: {
      type: Number,
      required: true,
    },
    pokemonName: {
      type: String,
      required: true,
    },
  },
  components: { CenteredColumn, BaseChevron },
  data() {
    return {
      evolutions: [{ species: '', image: '' }],
      evolution: 0,
    };
  },
  async created() {
    this.evolutions = await getPokemonEvolutions(this.pokemonId);
    this.evolution = this.evolutions.findIndex(
      (evolution) => evolution?.species === this.pokemonName.toLowerCase()
    );
  },
  methods: {
    getPreviousEvolution() {
      this.evolution = this.evolution - 1;
    },
    getNextEvolution() {
      this.evolution = this.evolution + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.pokemon-item-evolutions {
  margin: 1rem 0;

  @media (min-width: $min-width-fourth-break) {
    margin: 0;
  }

  .title {
    font-size: 2rem;

    @media (min-width: $min-width-fourth-break) {
      display: none;
    }
  }

  .card {
    margin-top: 1rem;
    background-color: var(--cards-background-color);
    border-radius: 1rem;
    border: 0.2rem solid var(--main-border-color);
    min-width: 10rem;
    box-shadow: var(--main-box-shadow);

    @media (min-width: $min-width-fourth-break) {
      margin-top: 0;
      width: 80%;
      margin-right: 3rem;
      border-radius: 5rem;
    }

    .screen {
      margin: 1rem 0;
      width: 6rem;
      height: 6rem;
      transition: background-image 0.6s;

      @media (min-width: $min-width-fourth-break) {
        border-radius: 3rem;
      }
    }

    .evolution span {
      margin-top: 1rem;
    }
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
