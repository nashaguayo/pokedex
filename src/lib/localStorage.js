const DARKMODE_ENABLED = 'darkmodeEnabled';

export function getDarkMode() {
  return localStorage.getItem(DARKMODE_ENABLED) === 'true' ?? false;
}

export function toggleDarkMode() {
  const isDarkModeEnabled = getDarkMode();
  localStorage.setItem(DARKMODE_ENABLED, !isDarkModeEnabled);
}
