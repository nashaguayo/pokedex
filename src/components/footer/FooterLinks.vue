<template>
  <div
    class="footer-links"
    ref="footerLinks"
    v-observe-visibility="{
      callback: visibilityChanged,
      throttle: 300,
    }"
  >
    <div class="disclaimer">
      <span>This is a project built for learning.</span>
      <span>Natasha Aguayo - 2023</span>
    </div>
    <div class="logos">
      <div class="fueled-by">
        <span>Fueled by</span>
        <a href="https://pokeapi.co/docs/v2" target="_blank" ref="noreferrer">
          <img src="@/assets/ui/pokeapi.png" alt="pokeapi logo" />
        </a>
      </div>
      <a
        :href="githubRepoUrl"
        class="repository"
        target="_blank"
        ref="noreferrer"
      >
        <img
          src="@/assets/ui/github-logo.jpeg"
          class="github-logo"
          alt="github logo"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterLinks',
  data() {
    return {
      isVisible: false,
      height: 0,
      githubRepoUrl: process.env.VUE_APP_GITHUB_REPO_URL,
    };
  },
  props: {
    hasToUpdateHeight: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    hasToUpdateHeight() {
      this.setHeight();
    },
  },
  mounted() {
    this.setHeight();
  },
  beforeDestroy() {
    this.setHeight();
  },
  methods: {
    setHeight() {
      this.height = this.isVisible ? this.$refs.footerLinks.offsetHeight : 0;
      this.$emit('setMargin', this.height);
    },
    visibilityChanged(isVisible) {
      this.isVisible = isVisible;
      this.setHeight();
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: var(--variant-background-color);
  box-shadow: var(--main-box-shadow);

  @media (min-width: $min-width-first-break) {
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
  }

  .disclaimer {
    margin: 0 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    margin-top: 1rem;

    @media (min-width: $min-width-first-break) {
      margin-top: 0;
    }

    span {
      color: var(--variant-text-color);
      font-size: 1rem;
      text-align: center;
      font-family: 'Kanit';

      @media (min-width: $min-width-first-break) {
        text-align: left;
      }
    }
  }

  .logos {
    display: flex;

    .fueled-by {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      justify-content: center;

      span {
        color: var(--variant-text-color);
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
}
</style>
