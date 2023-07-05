export function getPageBackgroundElement() {
  return document.getElementsByClassName('page-background')[0];
}

export function scrollToTopOfBackgroundPage() {
  getPageBackgroundElement().scrollTo({ top: 0, behavior: 'smooth' });
}

export function capitalizeWord(word) {
  const firstLetter = word.charAt(0).toUpperCase();
  const remainingLetters = word.substring(1);
  return `${firstLetter}${remainingLetters}`;
}
