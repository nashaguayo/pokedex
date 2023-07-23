import {
  getPageBackgroundElement,
  scrollToTopOfBackgroundPage,
  capitalizeWord,
  toggleDarkMode,
} from '@/lib/helpers';

test('getPageBackgroundElement should return the page background element', () => {
  document.body.innerHTML =
    '<div class="page-background">Background Element</div>';
  const result = getPageBackgroundElement();
  expect(result).toBeInstanceOf(Element);
  expect(result.className).toBe('page-background');
});

test('capitalizeWord should capitalize the first letter of a word', () => {
  expect(capitalizeWord('hello')).toBe('Hello');
  expect(capitalizeWord('world')).toBe('World');
  expect(capitalizeWord('')).toBe('');
});

test('toggleDarkMode should set the data-theme attribute to dark or light', () => {
  document.documentElement.setAttribute('data-theme', 'light');
  toggleDarkMode(true);
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

  document.documentElement.setAttribute('data-theme', 'dark');
  toggleDarkMode(false);
  expect(document.documentElement.getAttribute('data-theme')).toBe('light');
});
