export function getPageBackgroundElement() {
  return document.getElementsByClassName('page-background')[0];
}

export function scrollToTopOfBackgroundPage(behavior) {
  getPageBackgroundElement().scrollTo({ top: 0, behavior });
}

export function capitalizeWord(word = '') {
  const firstLetter = word.charAt(0).toUpperCase();
  const remainingLetters = word.substring(1);
  return `${firstLetter}${remainingLetters}`;
}

export function toggleDarkMode(isDarkMode) {
  document.documentElement.setAttribute(
    'data-theme',
    isDarkMode ? 'dark' : 'light'
  );
}
