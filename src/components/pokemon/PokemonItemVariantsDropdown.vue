<template>
  <div class="pokemon-item-variants-dropdown">
    <h2
      v-for="variant in variants"
      :key="variant"
      @click="showVariant(variant)"
    >
      {{ variant.replace('-', ' ') }}
    </h2>
    <div class="close">
      <BaseButton :onClickHandler="close" :variant="true"> Close </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton';

export default {
  name: 'PokemonItemVariantsDropdown',
  props: {
    variants: {
      type: Array,
      required: true,
    },
  },
  components: { BaseButton },
  methods: {
    showVariant(variant) {
      this.$emit('displayVariant', variant);
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-item-variants-dropdown {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100vw;
  height: calc(100vh - 4rem);
  padding-bottom: 4rem;
  max-height: 100vh;
  overflow-y: auto;
  background: linear-gradient(
    var(--cards-background-color),
    var(--main-background-color)
  );
  display: flex;
  flex-direction: column;

  @media (min-width: $min-width-second-break) {
    width: 75%;
    left: 12.5%;
    height: calc(100vh - 6rem);
    padding-bottom: 6rem;
  }

  @media (min-width: $min-width-third-break) {
    height: calc(100vh - 7rem);
    padding-bottom: 7rem;
  }

  h2 {
    margin: 0;
    width: 100%;
    cursor: pointer;
    font-family: 'Kanit';
    letter-spacing: 0.01rem;
    border-bottom: 0.2rem solid var(--main-border-color);
    padding: 1rem 0;
  }

  h2:hover {
    background-color: var(--main-background-color);
  }

  .close {
    position: fixed;
    bottom: 0;
    padding: 1rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-background-color);

    @media (min-width: $min-width-second-break) {
      padding-top: 1rem;
      padding-bottom: 2rem;
      width: 75%;
    }
  }
}

.pokemon-item-variants-dropdown::-webkit-scrollbar {
  display: none;
}
</style>
