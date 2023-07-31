<template>
  <div class="offline-view">
    <h2>{{ $t('offline.title') }}</h2>
    <span>{{ $t('offline.description') }}</span>
  </div>
</template>

<script>
export default { name: 'OfflineView' };
</script>

<style lang="scss" scoped>
.offline-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 2rem;

  h2 {
    font-size: 3rem;
  }

  span {
    font-family: 'Kanit';
    text-align: center;
  }
}
</style>
