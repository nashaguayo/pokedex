<template>
  <div class="install-view">
    <BaseLoader :cover="true" :loading="installing || loading">
      <div class="content">
        <h1>{{ $t('install.title') }}</h1>
        <span>{{ $t('install.description') }}</span>
        <BaseButton :big="true" :variant="true" :onClickHandler="install">{{
          $t('install.button')
        }}</BaseButton>
        <img src="@/assets/images/pokemons/silouette.png" alt="silouette" />
      </div>
    </BaseLoader>
  </div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseLoader from '@/components/ui/BaseLoader.vue';
import { isInstalled } from '@/lib/helpers';

export default {
  name: 'InstallView',
  title: 'Install',
  components: { BaseButton, BaseLoader },
  data() {
    return {
      deferredInstallPrompt: null,
      installing: false,
      loading: true,
    };
  },
  async created() {
    window.addEventListener('beforeinstallprompt', this.beforeInstallPrompt);
    window.addEventListener('appinstalled', this.appInstalled);
    if (await isInstalled()) {
      const route = { name: 'launchApp' };
      if (this.$route?.query?.redirect) {
        route.query = this.$route.query;
      }
      this.$router.push(route);
    }
  },
  beforeDestroy() {
    window.removeEventListener('beforeinstallprompt', this.beforeInstallPrompt);
    window.removeEventListener('appinstalled', this.appInstalled);
  },
  methods: {
    async install() {
      this.installing = true;
      await this.deferredInstallPrompt.prompt();
      const { outcome } = await this.deferredInstallPrompt.userChoice;
      if (outcome === 'dismissed') {
        this.installing = false;
      }
    },
    beforeInstallPrompt(event) {
      event.preventDefault();
      this.deferredInstallPrompt = event;
      this.loading = false;
    },
    appInstalled() {
      this.$router.push({ name: 'download' });
    },
  },
};
</script>

<style lang="scss" scoped>
.install-view {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 3rem;

      @media (min-width: $min-width-first-break) {
        font-size: 4rem;
      }
    }

    span {
      text-align: center;
      font-family: 'Kanit';
      margin-bottom: 1rem;
      width: 90%;

      @media (min-width: $min-width-third-break) {
        margin-bottom: 2rem;
      }
    }
  }
}
</style>
