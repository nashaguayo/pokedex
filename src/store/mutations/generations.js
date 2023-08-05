import generations from '@/store/state/generations';

export function toggleFilter(generation) {
  generations.setFilter(
    generations.getFilter() === generation ? '' : generation
  );
}

export function clearFilters() {
  generations.setFilter('');
}
