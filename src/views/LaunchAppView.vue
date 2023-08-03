<template>
  <BaseLoader :coverPage="true" :loading="installing">
    <div class="launch-app-view">
      <h2>{{ $t('launchApp.title') }}</h2>
      <BaseButton :onClickHandler="launchApp" :variant="true" :big="true">{{
        $t('launchApp.button')
      }}</BaseButton>
    </div>
  </BaseLoader>
</template>

<script>
import BaseLoader from '@/components/ui/BaseLoader.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  name: 'LaunchAppView',
  components: { BaseLoader, BaseButton },
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
        this.installing = true;
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
      event.preventDefault();
      this.deferredInstallPrompt = event;
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
