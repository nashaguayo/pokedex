<script>
import { logError } from '@/lib/logger';

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
  errorCaptured(error) {
    this.error = true;
    logError(this.componentName, this.errorMessage, error);
  },
  render(h) {
    return this.error ? h('p', `${this.errorMessage}`) : this.$slots.default[0];
  },
};
</script>

<style lang="scss" scoped>
p {
  text-align: center;
}
</style>
