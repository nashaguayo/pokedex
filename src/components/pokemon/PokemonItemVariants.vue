<template functional>
  <div class="pokemon-item-variants">
    <hr />
    <span class="title">Variants</span>
    <div class="variants">
      <div
        v-for="variant in props.variants"
        :key="variant.name"
        class="variant"
      >
        <div
          class="screen"
          :style="{
            backgroundImage: `url(${variant.image})`,
          }"
        ></div>
        <span>{{ variant.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonItemVariants',
  props: {
    variants: {
      type: Array,
      required: true,
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
  }

  .title {
    margin: 0.5rem 0 1.5rem;
    font-size: 2rem;
  }

  .variant {
    display: flex;
    flex-direction: column;
    align-items: center;

    .screen {
      width: 6rem;
      height: 6rem;
    }
  }
}
</style>
