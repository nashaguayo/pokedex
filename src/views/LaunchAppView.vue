<template>
  <div class="launch-app-view">
    <h2>{{ $t('launchApp.title') }}</h2>
    <BaseButton :onClickHandler="launchApp" :variant="true" :big="true">{{
      $t('launchApp.button')
    }}</BaseButton>
  </div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import { removeIsInstalled } from '@/lib/localStorage';

export default {
  name: 'LaunchAppView',
  components: { BaseButton },
  data() {
    return {
      deferredInstallPrompt: null,
      installing: false,
    };
  },
  created() {
    window.addEventListener('beforeinstallprompt', this.beforeInstallPrompt);
  },
  beforeDestroy() {
    window.removeEventListener('beforeinstallprompt', this.beforeInstallPrompt);
  },
  methods: {
    async launchApp() {
      if (this.deferredInstallPrompt) {
        await this.deferredInstallPrompt.prompt();
        const { outcome } = await this.deferredInstallPrompt.userChoice;
        if (outcome === 'dismissed') {
          this.installing = false;
        } else if (outcome === 'accepted') {
          this.$router.push({ name: 'download' });
        }
        return;
      }
      window.open(process.env.VUE_APP_BASE_URL, '_blank');
    },
    beforeInstallPrompt(event) {
      removeIsInstalled();
      event.preventDefault();
      this.deferredInstallPrompt = event;
      this.installing = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.launch-app-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 2rem;

    @media (min-width: $min-width-second-break) {
      font-size: 3rem;
    }

    @media (min-width: $min-width-fifth-break) {
      font-size: 4rem;
    }
  }
}
</style>
