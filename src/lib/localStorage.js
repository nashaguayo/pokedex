const DARKMODE_ENABLED = 'darkmodeEnabled';
const GUESSES_IN_A_ROW = 'guessesInARow';
const TRIES_LEFT = 'triesLeft';
const MYSTERY_POKEMON = 'mysteryPokemon';
const RECENT_SEARCHES = 'recentSearches';

export function isDarkModeEnabled() {
  return localStorage.getItem(DARKMODE_ENABLED) === 'true';
}

export function toggleDarkMode() {
  const isDarkModeEnabled = localStorage.getItem(DARKMODE_ENABLED) === 'true';
  localStorage.setItem(DARKMODE_ENABLED, !isDarkModeEnabled);
}

export function getGuessesInARow() {
  return Number(localStorage.getItem(GUESSES_IN_A_ROW));
}

export function setGuessesInARow(guessesInARow) {
  localStorage.setItem(GUESSES_IN_A_ROW, guessesInARow);
}

export function getTriesLeft() {
  return Number(localStorage.getItem(TRIES_LEFT));
}

export function setTriesLeft(triesLeft) {
  localStorage.setItem(TRIES_LEFT, triesLeft);
}

export function getMysteryPokemon() {
  return JSON.parse(localStorage.getItem(MYSTERY_POKEMON));
}

export function setMysteryPokemon(mysteryPokemon) {
  localStorage.setItem(MYSTERY_POKEMON, JSON.stringify(mysteryPokemon));
}

export function getRecentSearches() {
  return JSON.parse(localStorage.getItem(RECENT_SEARCHES));
}

export function setRecentSearch(recentSearch) {
  const recentSearches = getRecentSearches() ?? [];
  if (!recentSearches.includes(recentSearch)) {
    recentSearches.push(recentSearch);
    localStorage.setItem(RECENT_SEARCHES, JSON.stringify(recentSearches));
  }
}

export function clearRecentSearches() {
  localStorage.setItem(RECENT_SEARCHES, JSON.stringify([]));
}
