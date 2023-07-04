export function getPageBackgroundElement() {
  return document.getElementsByClassName('page-background')[0];
}

export function scrollToTopOfBackgroundPage() {
  getPageBackgroundElement().scrollTo({ top: 0, behavior: 'smooth' });
}
