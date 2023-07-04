const DARKMODE_ENABLED = 'darkmodeEnabled';

export function isDarkModeEnabled() {
  return localStorage.getItem(DARKMODE_ENABLED) === 'true' ?? false;
}

export function toggleDarkMode() {
  const isDarkModeEnabled = isDarkModeEnabled();
  localStorage.setItem(DARKMODE_ENABLED, !isDarkModeEnabled);
}
