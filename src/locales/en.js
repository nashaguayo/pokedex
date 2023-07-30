export default {
  home: {
    welcomeMessage: 'Learn all about pokemons!',
    generalNavigation: {
      goToPokemonsPage: 'Pokemonss',
      search: 'Search',
    },
    guessPokemon: {
      gameResults: (ctx) =>
        !ctx.named('playersGuess')
          ? 'Guess Pokemon'
          : ctx.named('hasLost')
          ? 'You Lost!'
          : ctx.named('playersGuess') === ctx.named('name')
          ? 'You won!'
          : "That's not it...",
      triesLeft: (ctx) =>
        ctx.named('hasWon')
          ? `Getting new pokemon in ${ctx.named('timerCount')}...`
          : ctx.named('hasLost')
          ? `Pokemon was ${ctx.named('name')}`
          : `You have <strong>${ctx.named('tries')} ${
              ctx.named('tries') === 1 ? 'TRY' : 'TRIES'
            }</strong> left`,
      guessesInARow: 'Guesses in a row',
      baseButton: (ctx) =>
        ctx.named('hasWon') || ctx.named('hasLost')
          ? 'New Pokemon'
          : 'I give up',
    },
  },

  pokemon: {
    characteristicsWeight: 'Weight',
    characteristicsHeight: 'Height',
    characteristicsPounds: 'Pounds',
    characteristicsColor: 'Color',
    characteristicsShape: 'Shape',
    characteristicsGeneration: 'Generation',
    characteristicsHabitat: 'Habitat',
    descriptionFunFacts: 'Fun Facts',
    statsTitle: 'Stats',
    typeTitle: 'Types',
    evolutionsTitle: 'Evolutions',
    evolutionsNone: 'No evolutions found for this pokemon',
    variantsTitle: 'Variants',
    variantsButton: 'Variant',
    previous: 'Previous',
    next: 'Next',
    goBack: 'Go back',
  },

  pokemons: {
    title: 'Pokemons',
  },

  search: {
    clearSearch: 'Clear search',
    placeholder: 'Search for pokemon...',
    goBackButton: 'Go Back',
    noResultsFound: 'No results found',
    recentSearches: 'Recent Searches',
    displayTypes: (ctx) =>
      ctx.named('displayTypes') ? 'Show Types' : 'Hide Types',
    displayColors: (ctx) =>
      ctx.named('displayColors') ? 'Show Colors' : 'Hide Colors',
    displayShapes: (ctx) =>
      ctx.named('displayShapes') ? 'Show Shapes' : 'Hide Shapes',
    displayGenerations: (ctx) =>
      ctx.named('displayGenerations') ? 'Show Gens' : 'Hide Gens',
  },
};
