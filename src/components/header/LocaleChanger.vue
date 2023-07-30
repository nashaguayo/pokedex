<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option
        v-for="lang in langs"
        :key="`lang-${lang.value}`"
        :value="lang.value"
      >
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { ENGLISH, SPANISH } from '@/constants/languages';
import { setLanguage } from '@/lib/localStorage';
import store from '@/lib/store';

export default {
  name: 'LocaleChanger',
  data() {
    return {
      langs: [
        { name: 'Español', value: SPANISH },
        { name: 'English', value: ENGLISH },
      ],
    };
  },
  watch: {
    '$i18n.locale'(language) {
      setLanguage(language);
      store.clearPokemon();
      store.initializeStore();
    },
  },
};
</script>

<style lang="scss" scoped>
.locale-changer {
  select {
    background-color: var(--main-background-color);
    font-family: 'Kanit';
    border: 0.2rem solid var(--main-border-color);
    border-radius: 1rem;
    height: 2.3rem;
    width: 6rem;
    margin-right: 1rem;
    padding: 0 0.5rem;
    color: var(--main-text-color);
  }
}
</style>
