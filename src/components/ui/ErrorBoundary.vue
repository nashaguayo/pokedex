<script>
export default {
  name: 'ErrorBoundary',
  data: () => ({
    error: false,
  }),
  props: {
    componentName: {
      type: String,
      required: true,
    },
    errorMessage: {
      type: String,
      required: true,
    },
  },
  errorCaptured() {
    this.error = true;
  },
  render(h) {
    return this.error
      ? h('p', `Something went wrong! ${this.errorMessage}`)
      : this.$slots.default[0];
  },
};
</script>

<style lang="scss" scoped>
p {
  text-align: center;
}
</style>
