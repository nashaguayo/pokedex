<template>
  <div class="base-footer">
    <div id="disclaimer">
      <span>This is a project built with love, for learning.</span><br />
      <span>Please checkout the github repo and send your thoughts.</span>
    </div>
    <CenteredColumn id="fueled-by">
      <span>Fueled by</span>
      <a href="https://pokeapi.co/docs/v2" target="_blank" ref="noreferrer">
        <img src="@assets/ui/pokeapi.png" alt="pokapi logo" />
      </a>
    </CenteredColumn>
    <a :href="githubRepoUrl" target="_blank" ref="noreferrer">
      <img
        src="@assets/ui/github-logo.jpeg"
        class="github-logo"
        alt="github logo"
      />
    </a>
  </div>
</template>

<script>
import CenteredColumn from './CenteredColumn.vue';

export default {
  name: 'BaseFooter',
  components: { CenteredColumn },
  data() {
    return {
      githubRepoUrl: process.env.VUE_APP_GITHUB_REPO_URL,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@css/colors.scss';

.base-footer {
  position: relative;
  background-color: $variant-background-color;
  box-shadow: $main-box-shadow;
  width: 100%;
  height: 7rem;
  bottom: 0;
  margin-top: auto;
  display: flex;
  justify-content: space-between;

  #disclaimer {
    margin: 0 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;

    span {
      color: $variant-text-color;
      font-size: 1rem;
    }
  }

  #fueled-by {
    justify-content: center;

    span {
      color: $variant-text-color;
    }

    img {
      width: 10rem;
    }
  }

  .github-logo {
    width: 4.2rem;
    margin: 1rem;
  }
}
</style>
