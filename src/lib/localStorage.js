const DARKMODE_ENABLED = 'darkmodeEnabled';

export function isDarkModeEnabled() {
  return localStorage.getItem(DARKMODE_ENABLED) === 'true';
}

export function toggleDarkMode() {
  const isDarkModeEnabled = localStorage.getItem(DARKMODE_ENABLED) === 'true';
  localStorage.setItem(DARKMODE_ENABLED, !isDarkModeEnabled);
}
