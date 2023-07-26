<template>
  <div class="pokemon-item-evolutions">
    <span class="title">Evolutions</span>
    <div class="card">
      <span v-if="!evolutions.length" class="no-evolutions">
        No evolutions found for this pokemon!
      </span>
      <template v-else>
        <div class="evolution">
          <transition name="fade" mode="out-in">
            <span :key="species">
              {{ species }}
            </span>
          </transition>
          <router-link :to="`/pokemons/${species}`">
            <div
              class="screen"
              :style="{
                backgroundImage: image ? `url(${image})` : 'none',
              }"
            ></div>
          </router-link>
        </div>
        <div class="buttons">
          <BaseChevron
            ref="previousEvolutionButton"
            :onClickHandler="getPreviousEvolution"
            direction="left"
            :disabled="!evolution"
          />
          <BaseChevron
            ref="nextEvolutionButton"
            :onClickHandler="getNextEvolution"
            direction="right"
            :disabled="evolutions.length - 1 === evolution"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import BaseChevron from '@/components/ui/BaseChevron.vue';

export default {
  name: 'PokemonItemEvolutions',
  props: {
    evolutions: {
      type: Array,
      required: true,
    },
    pokemonName: {
      type: String,
      required: true,
    },
  },
  components: { BaseChevron },
  data() {
    return {
      evolution: 0,
    };
  },
  computed: {
    species() {
      return this.evolutions[this.evolution]?.species;
    },
    image() {
      return this.evolutions[this.evolution]?.image;
    },
  },
  watch: {
    evolutions(evolutions) {
      this.findEvolution(evolutions);
    },
  },
  created() {
    this.findEvolution();
  },
  methods: {
    getPreviousEvolution() {
      this.evolution = this.evolution - 1;
    },
    getNextEvolution() {
      this.evolution = this.evolution + 1;
    },
    findEvolution(evolutions) {
      this.evolution =
        (evolutions ?? this.evolutions).findIndex(
          (evolution) => evolution.species === this.pokemonName.toLowerCase()
        ) ?? 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-item-evolutions {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 1rem 0;

  @media (min-width: $min-width-fourth-break) {
    margin: 0;
  }

  .title {
    font-size: 2rem;

    @media (min-width: $min-width-fourth-break) {
      padding-right: 3rem;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
  }

  .no-evolutions {
    font-family: 'Kanit';
    font-size: 1rem;
    margin: 1rem;
    text-align-last: center;
  }

  .card {
    margin-top: 1rem;
    background-color: var(--cards-background-color);
    border-radius: 1rem;
    border: 0.2rem solid var(--secondary-border-color);
    min-width: 10rem;
    box-shadow: var(--main-box-shadow);
    display: flex;
    flex-direction: column;

    @media (min-width: $min-width-fourth-break) {
      margin-top: 0;
      width: 80%;
      margin-right: 3rem;
      border-radius: 2rem;
    }

    .screen {
      margin: 1rem 0;
      width: 6rem;
      height: 6rem;
      background-color: white;
      border: 0.2rem solid var(--main-border-color);
      border-radius: 50%;
      box-shadow: var(main-box-shadow);
      transition: background-image 0.6s;

      @media (min-width: $min-width-fourth-break) {
        border-radius: 3rem;
      }
    }

    .evolution {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      span {
        margin-top: 1rem;
      }
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
