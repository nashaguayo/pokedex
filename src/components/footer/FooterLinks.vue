<template>
  <CenteredColumn class="footer-links" ref="footerLinks">
    <div id="disclaimer">
      <span>This is a project built for learning.</span>
    </div>
    <div class="logos">
      <CenteredColumn id="fueled-by">
        <span>Fueled by</span>
        <a href="https://pokeapi.co/docs/v2" target="_blank" ref="noreferrer">
          <img src="@assets/ui/pokeapi.png" alt="pokeapi logo" />
        </a>
      </CenteredColumn>
      <a :href="githubRepoUrl" id="repository" target="_blank" ref="noreferrer">
        <img
          src="@assets/ui/github-logo.jpeg"
          id="github-logo"
          alt="github logo"
        />
      </a>
    </div>
  </CenteredColumn>
</template>

<script>
import CenteredColumn from '../ui/CenteredColumn.vue';

export default {
  name: 'FooterLinks',
  components: { CenteredColumn },
  data() {
    return {
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
  methods: {
    setHeight() {
      this.height = this.$refs.footerLinks.$el.offsetHeight;
      this.$emit('setHeight', this.height);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@css/media-queries.scss';

.footer-links {
  background-color: var(--variant-background-color);
  box-shadow: var(--main-box-shadow);

  @media (min-width: $min-width-first-break) {
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
  }

  #disclaimer {
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

      @media (min-width: $min-width-first-break) {
        text-align: left;
      }
    }
  }

  .logos {
    display: flex;

    #fueled-by {
      justify-content: center;

      span {
        color: var(--variant-text-color);
      }

      img {
        width: 10rem;
      }
    }

    #github-logo {
      width: 4.2rem;
      margin: 1rem;
    }
  }
}
</style>