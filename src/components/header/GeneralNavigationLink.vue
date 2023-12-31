<template>
  <div class="general-navigation-link">
    <router-link v-if="!text && !icon" class="home-image" :to="to">
      <img
        src="@/assets/images/ui/pokeball.svg.png"
        alt="home"
        class="url image"
        :class="{ 'shrink-animation': wasClicked }"
        @click="wasClicked = true"
        @animationend="wasClicked = false"
      />
    </router-link>
    <router-link v-if="text" class="desktop" :to="to">
      <h2
        class="url link"
        :class="{ 'shrink-animation': wasClicked }"
        @click="wasClicked = true"
        @animationend="wasClicked = false"
      >
        {{ text }}
      </h2>
    </router-link>
    <router-link v-if="icon" class="mobile" :to="to">
      <div
        :class="{ 'shrink-animation': wasClicked }"
        @click="wasClicked = true"
        @animationend="wasClicked = false"
      >
        <FontAwesomeIcon
          :icon="`fa-solid ${icon}`"
          :color="isDarkModeEnabled ? 'white' : 'black'"
          size="2x"
          class="icon"
        />
      </div>
    </router-link>
  </div>
</template>

<script>
import other from '@/store/state/other';

export default {
  name: 'GeneralNavigationLink',
  props: {
    to: {
      type: Object,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return { wasClicked: false };
  },
  computed: {
    isDarkModeEnabled() {
      return other.state.isDarkModeEnabled;
    },
  },
};
</script>

<style lang="scss" scoped>
.general-navigation-link {
  display: flex;

  .url {
    cursor: pointer;
  }

  .home-image {
    display: flex;
  }

  .image {
    margin: 0.5rem 0;
    margin-right: 0.5rem;
    height: 2.5rem;

    @media (min-width: $min-width-first-break) {
      margin: 1rem;
    }

    @media (min-width: $min-width-third-break) {
      height: 4rem;
    }

    @media (min-width: $min-width-fourth-break) {
      margin-left: 3rem;
    }
  }

  .link {
    margin-right: 2rem;
  }

  .icon {
    cursor: pointer;
    margin-right: 1rem;
  }

  .desktop {
    display: none;

    @media (min-width: $min-width-third-break) {
      display: block;
    }
  }

  .mobile {
    @media (min-width: $min-width-third-break) {
      display: none;
    }
  }
}

.shrink-animation {
  animation: shrink 0.3s;
}

@keyframes shrink {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
  }
}
</style>
