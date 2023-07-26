const DARKMODE_ENABLED = 'darkmodeEnabled';
const GUESSES_IN_A_ROW = 'guessesInARow';

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
