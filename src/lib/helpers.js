export function scrollToTopOfBackgroundPage() {
  document
    .getElementsByClassName('white-background')[0]
    .scrollTo({ top: 0, behavior: 'smooth' });
}
