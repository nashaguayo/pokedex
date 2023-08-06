# Pokedex Release Notes

---

## [Unreleased](https://github.com/nashaguayo/pokedex/compare/V1.0.2...develop) (dd-mm-yyyy)

##### Added

##### Modified

- See in app button now redirects to page user was originally seeing
- Transition in pokemon list
- Got rid of sass variables for colors

##### Fixed

- Launch app view redirect when app is not installed

---

## [V1.0.2](https://github.com/nashaguayo/pokedex/compare/V1.0.1...V1.0.2) (03-08-2023)

##### Modified

- Go back button in search now redirects to home
- Changed reducer for a map
- Using getInstalledRelatedApps to check whether app is installed or not
- Launch app redirects to install screen when app is not installed
- Download screen doesn't reload

##### Fixed

- Wrong redirect in install

---

## [V1.0.1](https://github.com/nashaguayo/pokedex/compare/V1.0.0...V1.0.1) (02-08-2023)

##### Added

- Created Download View
- Created Launch App View
- Go to search button in pokemon details

##### Modified

- Install page now has a loader
- Redirect in pokemon details
- Showing active variant in dropdown
- Replaced hyphens across app
- Changing buttons color when filter is active in search

##### Fixed

- Pokemon details header animation
- Pokemon details header throttle
- Margin showing on pokemon details

---

## [V1.0.0](https://github.com/nashaguayo/pokedex/compare/V0.3.0...V1.0.0) (31-07-2023)

##### Added

- Pokemon variants
- Animations to header icons
- Recent searches
- Internationalization
- PWA support

##### Modified

- Added missing alt properties to images
- Refactored search for colors, shapes and generations so that they aren't arrays
- Removed pokemons with hyphens from search
- Styles in pokemon details
- Saving all info from pokemon mini game on local storage
- Home landing banner and description
- Animation for pokemon details
- Manifest.json
- Better way of filtering out pokemons with hyphens

##### Fixed

- Base Loader is now at center of page
- Random Pokemon and Guess Pokemon not finishing loading
- Animation in search items
- Amount of empty stat bars
- Infinite row brings up correct amount of items per row
- Pokemon item header not scrolling
- Habitats no longer show hyphens
- Scroll to top button overlapping
- Public path error

---

## [V0.3.0](https://github.com/nashaguayo/pokedex/compare/V0.2.3...V0.3.0) (25-07-2023)

##### Added

- Pokemon habitats to characteristics
- Changing location background according to habitat
- Saving guesses in a row in local storage

##### Modified

- Showing translucent circle on pokemon details images when no big image is present
- Improved styles of 404 page

##### Fixed

- Random pokemon animation
- Guess pokemon game is now case insensitive
- Infinite scroll on mobile
- Pokemon details no longer crashes on reload
- Random pokemon ID errors
- Error message on evolutions when none are found
- No more duplicate pokemons on random pokemon

---

## [V0.2.3](https://github.com/nashaguayo/pokedex/compare/V0.2.2...V0.2.3) (23-07-2023)

##### Added

- Shape to pokemon details
- Generation to pokemon details
- Filter by Color
- Filter by Shape
- Filter by Generation
- Previous and next buttons on pokemon details page

##### Modified

- Changed search url
- Using hash mode on router
- Clearing search when navigating away from page
- Scroll to top button is now optional

##### Fixed

- Buttons in search now have a pointer cursor
- Pokemons page always loads on top, not on saved position
- Header no longer overlaps title
- Transition on pokemon details page... again
- Scroll to top button bottom margin when navigating away from a page with footer
- Search on mobile
- Undefined characteristics for species
- Added missing empty stat bars when exceeding bars appear

---

## [V0.2.2](https://github.com/nashaguayo/pokedex/compare/V0.2.1...V0.2.2) (18-07-2023)

##### Modified

- Go back button on pokemon detail page now always goes back to pokemons
- Animation on Pokemon details page
- Styles on overall page

##### Fixed

- Changing loader color on darkmode
- No more duplicate pokemons on random pokemon
- Hiding pokemon evolutions when there aren't any
- Pokemon names that break on pokemon list no longer align to the left
- No longer moving background on pokemon details page

---

## [V0.2.1](https://github.com/nashaguayo/pokedex/compare/V0.2.0...V0.2.1) (17-07-2023)

##### Fixed

- User has resets tries when winning
- User has three tries again at Guess the Pokemon Game
- Stars reset when you lose or give up at the pokemon game

---

## [V0.2.0](https://github.com/nashaguayo/pokedex/compare/V0.1.3...V0.2.0) (17-07-2023)

##### Added

- Displaying Pokemon Types and IDs
- Pokemon Fun Facts
- Filtering pokemons by type in search
- Pokemon characteristics
- Added links on header

##### Modified

- Optimized search again
- Added loader to search page
- Using functional components across the app
- Added stat bars on pokemon details page
- Header looks on mobile

##### Fixed

- Pokemon list: no error message displays when loading
- Pokemon list: no more duplicate keys on infinite scroll

---

## [V0.1.3](https://github.com/nashaguayo/pokedex/compare/V0.1.2...V0.1.3) (11-07-2023)

##### Fixed

- Home screen animation

##### Modified

- Improved Search, yet again
- Added no pokemons found message to search

---

## [V0.1.2](https://github.com/nashaguayo/pokedex/compare/V0.1.1...V0.1.2) (10-07-2023)

##### Added

- Pokemon Game: limiting guesses per pokemon and showing amount of guesses in a row

##### Modified

- Optimized Search
- Using store everywhere

##### Fixed

- Pokemon Game: input clears when getting a new pokemon
- Pokemon Details: fixed issues with missing properties

---

## [V0.1.1](https://github.com/nashaguayo/pokedex/compare/V0.1.0...V0.1.1) (09-07-2023)

##### Added

- Home Page
- 404 Not Found Page
- Header Page
- Footer Page
- Night mode
- Scroll to top button
- Pokemons Page
- Individual Pokemon Page
- Pokemon Evolutions
- Random Pokemons
- Pokemon Search
- Guess the Pokemon Game

---

## [V0.1.0](https://github.com/nashaguayo/pokedex/releases/tag/V0.1.0) (28-06-2023)

##### Added

- Just a title and description.
