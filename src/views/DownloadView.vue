<template>
  <div class="download-view">
    <h2>{{ $t('download.title') }}</h2>
    <FontAwesomeIcon
      icon="fa-solid fa-spinner"
      class="fa-spin-pulse spinner-icon"
      size="6x"
      color="black"
    />
  </div>
</template>

<script>
import { isInstalled } from '@/lib/helpers';

export default {
  name: 'DownloadView',
  title: 'Downloading Pokedex',
  data() {
    return {
      interval: null,
    };
  },
  async created() {
    this.interval = setInterval(async () => {
      if (await isInstalled()) {
        this.$router.push({ name: 'launchApp' });
      }
    }, 2500);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style lang="scss" scoped>
.download-view {
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
