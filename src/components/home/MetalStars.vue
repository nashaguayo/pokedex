<template functional>
  <div class="metal-stars">
    <transition-group name="zoom-in" appear>
      <FontAwesomeIcon
        v-for="star in props.amountOfStars"
        :key="`${props.metal}-star-${star}`"
        icon="fa-solid fa-star"
        :class="`${props.metal}-star`"
      />
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'MetalStars',
  props: {
    metal: {
      type: String,
      required: true,
    },
    amountOfStars: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.metal-stars {
  .gold-star {
    color: #edb200;
    margin: 0 0.1rem;
  }
  .silver-star {
    color: #b5b4b0;
    margin: 0 0.1rem;
  }
  .bronze-star {
    color: #73440f;
    margin: 0 0.1rem;
  }
}

.zoom-in-enter-active,
.zoom-in-leave-active,
.zoom-in-move {
  transition: transform 0.3s;
}

.zoom-in-enter,
.zoom-in-leave-to {
  transform: scale(0);
}
</style>
