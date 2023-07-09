<template>
  <div class="base-input">
    <label for="search">
      <FontAwesomeIcon v-if="icon" :icon="icon" />
    </label>
    <input
      :type="type"
      id="search"
      :name="name"
      :placeholder="placeholder"
      v-model="inputValue"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'type here',
    },
    model: {
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('inputValueChanged', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.base-input {
  margin-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
  border-bottom: 0.2rem solid var(--main-border-color);

  label {
    font-family: 'Upheaval';
    font-size: 1.5rem;
  }

  input {
    border: 0.2rem solid var(--main-border-color);
    border-radius: 2rem;
    height: 2rem;
    padding: 0 1rem;
    font-family: 'Upheaval';
    width: 70%;
  }
}
</style>
