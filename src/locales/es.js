import { capitalizeWord } from '@/lib/helpers';

export default {
  header: {
    generalNavigation: {
      goToPokemonsPage: 'Pokemones',
      search: 'Buscar',
    },
  },

  footer: {
    disclaimer: 'Este proyecto fue hecho para aprender.',
    fueledBy: 'Backend',
  },

  home: {
    welcomeMessage: 'Aprende todo sobre pokemones!',
    description:
      'Esta es una aplicación sobre pokemones. Adivina quiénes son, lee sobre ellos y sus estadísticas, búscalos por tipo, generaciones, colores y más.',
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

  pokemon: {
    characteristics: {
      weight: 'Peso',
      height: 'Altura',
      pounds: 'Libras',
      color: 'Color',
      shape: 'Forma',
      generation: 'Generación',
      habitat: 'Hábitat',
    },
    descriptionFunFacts: 'Trivia',
    statsTitle: 'Estadísticas',
    typeTitle: 'Tipos',
    evolutions: {
      title: 'Evoluciones',
      none: 'Este pokemon no tiene evoluciones',
    },
    variants: {
      title: 'Variantes',
      button: 'Variante',
    },
    previous: 'Anterior',
    next: 'Siguiente',
    goBack: 'Volver',
  },

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
      !ctx.named('displayTypes') ? 'Mostrar Tipos' : 'Esconder Tipos',
    displayColors: (ctx) =>
      !ctx.named('displayColors') ? 'Mostrar Colores' : 'Esconder Colores',
    displayShapes: (ctx) =>
      !ctx.named('displayShapes') ? 'Mostrar Formas' : 'Esconder Formas',
    displayGenerations: (ctx) =>
      !ctx.named('displayGenerations') ? 'Mostrar Gens' : 'Esconder Gens',
  },

  error: {
    title: 'Error 404',
    subtitle: 'Página No Encontrada',
    description: '¿Cómo llegaste hasta aquí? ¡No hay nada para ver!',
  },

  install: {
    title: 'Pokedex',
    description:
      'Instala la aplicación para empezar a disfrutar la mejor info sobre Pokemones',
    button: 'Instalar',
  },
};
