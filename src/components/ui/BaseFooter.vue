<template>
  <div class="base-footer">
    <div id="disclaimer">
      <span>This is a project made with love for learning.</span><br />
      <span>Please checkout the github repo and send your thoughts.</span><br />
      <span>Thank you for sharing!</span>
    </div>
    <img
      src="@assets/ui/github-logo.jpeg"
      class="github-logo"
      alt="github logo"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseFooter',
};
</script>

<style lang="scss" scoped>
@import '@css/colors.scss';

.base-footer {
  position: relative;
  background-color: $variant-background-color;
  width: 100%;
  height: 7rem;
  bottom: 0;
  margin-top: auto;
  display: flex;
  justify-content: space-between;

  #disclaimer {
    margin: 1rem;

    span {
      color: $variant-text-color;
    }
  }

  .github-logo {
    width: 4.2rem;
    margin: 1rem;
  }
}
</style>
