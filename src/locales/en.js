export default {
  homeViewWelcomeMessage: 'Learn all about pokemons!',

  generalNavigationGoToPokemonsPage: 'Pokemons',
  generalNavigationSearch: 'Search',

  guessPokemonGameResults: (ctx) =>
    !ctx.named('playersGuess')
      ? 'Guess Pokemon'
      : ctx.named('hasLost')
      ? 'You Lost!'
      : ctx.named('playersGuess') === ctx.named('name')
      ? 'You won!'
      : "That's not it...",
  guessPokemonTriesLeft: (ctx) =>
    ctx.named('hasWon')
      ? `Getting new pokemon in ${ctx.named('timerCount')}...`
      : ctx.named('hasLost')
      ? `Pokemon was ${ctx.named('name')}`
      : `You have <strong>${ctx.named('tries')} ${
          ctx.named('tries') === 1 ? 'TRY' : 'TRIES'
        }</strong> left`,
  guessPokemonGuessesInARow: 'Guesses in a row',
  guessPokemonBaseButton: (ctx) =>
    ctx.named('hasWon') || ctx.named('hasLost') ? 'New Pokemon' : 'I give up',

  pokemonItemCharacteristicsWeight: 'Weight',
  pokemonItemCharacteristicsHeight: 'Height',
  pokemonItemCharacteristicsPounds: 'Pounds',
  pokemonItemCharacteristicsColor: 'Color',
  pokemonItemCharacteristicsShape: 'Shape',
  pokemonItemCharacteristicsGeneration: 'Generation',
  pokemonItemCharacteristicsHabitat: 'Habitat',

  pokemonItemDescriptionFunFacts: 'Fun Facts',

  pokemonItemStatsTitle: 'Stats',

  pokemonItemTypeTitle: 'Types',
};
