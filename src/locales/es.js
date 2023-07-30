import { capitalizeWord } from '@/lib/helpers';

export default {
  home: {
    welcomeMessage: 'Aprende todo sobre pokemones!',
    generalNavigation: {
      goToPokemonsPage: 'Pokemones',
      search: 'Buscar',
    },
    guessPokemon: {
      gameResults: (ctx) =>
        !ctx.named('playersGuess')
          ? 'Adivina el Pokemon'
          : ctx.named('hasLost')
          ? 'Perdiste!'
          : ctx.named('playersGuess') === ctx.named('name')
          ? 'Ganaste!'
          : 'Ese no es...',
      triesLeft: (ctx) =>
        ctx.named('hasWon')
          ? `Mostrando nuevo Pokemon en ${ctx.named('timerCount')}...`
          : ctx.named('hasLost')
          ? `El Pokemon era ${capitalizeWord(ctx.named('name'))}`
          : `Te queda${ctx.named('tries') === 1 ? '' : 'n'} <strong>${ctx.named(
              'tries'
            )} ${ctx.named('tries') === 1 ? 'INTENTO' : 'INTENTOS'}</strong>`,
      guessesInARow: 'Acertadas al hilo',
      baseButton: (ctx) =>
        ctx.named('hasWon') || ctx.named('hasLost')
          ? 'Nuevo Pokemon'
          : 'Me rindo',
    },
  },

  pokemonItemCharacteristicsWeight: 'Peso',
  pokemonItemCharacteristicsHeight: 'Altura',
  pokemonItemCharacteristicsPounds: 'Libras',
  pokemonItemCharacteristicsColor: 'Color',
  pokemonItemCharacteristicsShape: 'Forma',
  pokemonItemCharacteristicsGeneration: 'Generación',
  pokemonItemCharacteristicsHabitat: 'Hábitat',

  pokemonItemDescriptionFunFacts: 'Trivia',

  pokemonItemStatsTitle: 'Estadísticas',

  pokemonItemTypeTitle: 'Tipos',

  pokemonItemEvolutionsTitle: 'Evoluciones',
  pokemonItemEvolutionsNone: 'Este pokemon no tiene evoluciones',

  pokemonItemVariantsTitle: 'Variantes',
  pokemonItemVariantsButton: 'Variante',

  pokemonItemPrevious: 'Anterior',
  pokemonItemNext: 'Siguiente',
  pokemonItemGoBack: 'Volver',

  pokemons: {
    title: 'Pokemones',
  },

  search: {
    clearSearch: 'Limpiar Busqueda',
    placeholder: 'Busca un pokemon...',
    goBackButton: 'Volver',
    noResultsFound: 'No se han encontrado resultados',
    recentSearches: 'Busquedas Recientes',
    displayTypes: (ctx) =>
      ctx.named('displayTypes') ? 'Mostrar Tipos' : 'Esconder Tipos',
    displayColors: (ctx) =>
      ctx.named('displayColors') ? 'Mostrar Colores' : 'Esconder Colores',
    displayShapes: (ctx) =>
      ctx.named('displayShapes') ? 'Mostrar Formas' : 'Esconder Formas',
    displayGenerations: (ctx) =>
      ctx.named('displayGenerations') ? 'Mostrar Gens' : 'Esconder Gens',
  },
};
