import { capitalizeWord } from '@/lib/helpers';

export default {
  header: {
    generalNavigation: {
      goToPokemonsPage: 'Pokemons',
      search: 'Search',
    },
  },

  footer: {
    disclaimer: 'This is a project built for learning.',
    fueledBy: 'Fueled by',
  },

  home: {
    welcomeMessage: 'Learn all about pokemons!',
    description:
      'This is an application about pokemons. Guess who they are, read about them and their stats, search them by type, generations, colors, and more!',
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
          ? `Pokemon was ${capitalizeWord(ctx.named('name').replace('-', ' '))}`
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
    characteristics: {
      weight: 'Weight',
      height: 'Height',
      pounds: 'Pounds',
      color: 'Color',
      shape: 'Shape',
      generation: 'Generation',
      habitat: 'Habitat',
    },
    descriptionFunFacts: 'Fun Facts',
    statsTitle: 'Stats',
    typeTitle: 'Types',
    evolutions: {
      title: 'Evolutions',
      none: 'No evolutions found for this pokemon',
    },
    variants: {
      title: 'Variants',
      button: 'Variant',
    },
    previous: 'Previous',
    next: 'Next',
    goToPokemonList: 'Go to Pokemon List',
    goToSearch: 'Go to Search',
    goToFavorites: 'Go to Favorites',
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
      !ctx.named('displayTypes') ? 'Show Types' : 'Hide Types',
    displayColors: (ctx) =>
      !ctx.named('displayColors') ? 'Show Colors' : 'Hide Colors',
    displayShapes: (ctx) =>
      !ctx.named('displayShapes') ? 'Show Shapes' : 'Hide Shapes',
    displayGenerations: (ctx) =>
      !ctx.named('displayGenerations') ? 'Show Gens' : 'Hide Gens',
  },

  error: {
    title: '404 Error',
    subtitle: 'Page Not Found',
    description: "How did you get here? There's nothing to see!",
  },

  install: {
    title: 'Pokedex',
    description: 'Get the App to start enjoying all info about Pokemons',
    button: 'Install',
  },

  offline: {
    title: 'Offline',
    description: 'This app can only be accessed with internet connection',
  },

  download: {
    title: 'Downloading',
  },

  launchApp: {
    title: 'See in App',
    button: 'Open',
  },

  favorites: {
    title: 'Favorites',
    placeholder: 'Search in your Favorites',
  },
};
