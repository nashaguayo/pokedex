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
import { initializeStore } from '@/store/mutations/other';
import { clearPokemon } from '@/store/mutations/pokemon';
import { clearPokemonListAndRefresh } from '@/store/mutations/scroll';

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
    async '$i18n.locale'(language) {
      setLanguage(language);
      clearPokemon();
      await initializeStore();
      await clearPokemonListAndRefresh();
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
