<template>
  <div class="base-input">
    <label :for="name">
      <FontAwesomeIcon v-if="icon" :icon="icon" />
      <span v-if="label">{{ label }}</span>
    </label>
    <input :type="type" :id="name" :name="name" />
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    label: {
      type: String,
      required: '',
    },
    icon: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.base-input {
  margin: 2rem;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;

  label {
    font-family: 'Upheaval';
    font-size: 1.5rem;
  }

  input {
    border: 0.2rem solid var(--main-border-color);
    border-radius: 2rem;
    height: 2rem;
    padding: 0 0.5rem;
    font-family: 'Upheaval';
    width: 70%;
  }
}
</style>
