<template>
  <div class="pokemon-item-variants">
    <hr />
    <span class="title">{{ $t('pokemon.variants.title') }}</span>
    <div class="variant">
      <div
        class="screen"
        :style="{
          backgroundImage: `url(${image})`,
        }"
      ></div>
      <span class="name">{{ name.replace('-', ' ') }}</span>
      <BaseButton
        :onClickHandler="openVariantDropdown"
        :disabled="variants.length === 1"
        :small="true"
      >
        {{ $t('pokemon.variants.button') }}
      </BaseButton>
    </div>
    <transition name="slide-up">
      <PokemonItemVariantsDropdown
        v-if="displayVariantDropdown"
        :active="name"
        :variants="variantNames"
        @displayVariant="displayVariant"
        @close="closeVariantDropdown"
      />
    </transition>
  </div>
</template>

<script>
import PokemonItemVariantsDropdown from '@/components/pokemon/PokemonItemVariantsDropdown.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  name: 'PokemonItemVariants',
  components: {
    PokemonItemVariantsDropdown,
    BaseButton,
  },
  data() {
    return {
      image: this.variants[0]?.image,
      name: this.variants[0]?.name,
      displayVariantDropdown: false,
    };
  },
  props: {
    pokemonName: {
      type: String,
      required: true,
    },
    variants: {
      type: Array,
      required: true,
    },
  },
  computed: {
    variantNames() {
      return this.variants.map((variant) => variant.name);
    },
  },
  mounted() {
    if (this.$route.query.variantName) {
      this.displayVariant(this.$route.query.variantName.replace('-', ' '));
    }
  },
  methods: {
    displayVariant(variant) {
      this.closeVariantDropdown();
      const variants = this.variants.filter((v) => v.name === variant);
      this.name = variant;
      this.image = variants[0].image;
    },
    openVariantDropdown() {
      this.displayVariantDropdown = true;
    },
    closeVariantDropdown() {
      this.displayVariantDropdown = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-item-variants {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 2rem 0;

  hr {
    width: 100%;
    background-color: var(--variant-background-color);
    border-color: var(--variant-background-color);
    box-shadow: var(--main-box-shadow);
    height: 1rem;

    @media (min-width: $min-width-fourth-break) {
      display: none;
    }
  }

  .title {
    font-size: 2rem;
    margin-top: 1rem;

    @media (min-width: $min-width-fourth-break) {
      font-size: 2.5rem;
      margin-right: 3rem;
      margin-top: 0;
    }
  }

  .variant {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
    background-color: var(--cards-background-color);
    border-radius: 2rem;
    border: 0.2rem solid var(--secondary-border-color);
    box-shadow: var(--main-box-shadow);
    padding: 1rem;

    @media (min-width: $min-width-fourth-break) {
      margin-right: 3rem;
    }

    .screen {
      width: 6rem;
      height: 6rem;
      background-color: white;
      border-radius: 50%;
      border: 0.2rem solid var(--main-border-color);
    }

    .name {
      margin: 1rem 0;
      background-color: var(--main-background-color);
      border-radius: 1rem;
      box-shadow: var(--main-box-shadow);
      padding: 0.5rem;
    }
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s;
}

.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
