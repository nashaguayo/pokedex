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

export function toggleDarkModeInDOM(isDarkMode) {
  document.documentElement.setAttribute(
    'data-theme',
    isDarkMode ? 'dark' : 'light'
  );
}

export function isUsingApp() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone ||
    document.referrer.includes('android-app://')
  );
}

export function isDesktop() {
  return !/android|iphone|kindle|ipad/i.test(navigator.userAgent);
}

export function isOnline() {
  return navigator.onLine;
}

export async function isInstalled() {
  const relatedApps = await navigator.getInstalledRelatedApps();
  const pokedexApp = relatedApps.filter(
    (app) => app.url === `${process.env.VUE_APP_BASE_URL}/manifest.json`
  );
  return !!pokedexApp.length;
}
