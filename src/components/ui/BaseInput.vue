<template>
  <div class="base-input">
    <label for="search" v-if="icon || label">
      <FontAwesomeIcon
        v-if="icon"
        :icon="icon"
        :color="isDarkModeEnabled ? 'white' : 'black'"
      />
      <span v-if="label">{{ label }}</span>
    </label>
    <input
      v-if="lazy"
      :type="type"
      id="search"
      :name="name"
      :placeholder="placeholder"
      v-model.lazy="inputValue"
      ref="input"
      :disabled="disabled"
    />
    <input
      v-else
      :type="type"
      id="search"
      :name="name"
      :placeholder="placeholder"
      v-model="inputValue"
      ref="input"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import store from '@/lib/store';

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
    label: {
      type: String,
      default: '',
    },
    reset: {
      type: Boolean,
      default: false,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    focus: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    reset(reset) {
      if (reset) {
        this.$refs['input'].value = '';
        this.$emit('inputValueChanged', '');
      }
    },
    focus(focus) {
      if (focus) {
        this.$refs['input'].focus();
        this.$emit('focused');
      }
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
    isDarkModeEnabled() {
      return store.state.isDarkModeEnabled;
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

  label {
    font-family: 'Upheaval';
    font-size: 1.5rem;
  }

  input {
    border: 0.2rem solid var(--main-border-color);
    border-radius: 2rem;
    height: 2rem;
    padding: 0 1rem;
    font-family: 'Kanit';
    width: 70%;
  }
}
</style>
