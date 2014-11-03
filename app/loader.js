/**
 * Load dependencies
 */
$script([
  'vendor/angular/angular.js',
  'vendor/angular-route/angular-route.js',
  'app.js',
  'table/table.js',
  'components/deck/deck.js',
  'components/deck/deck-service.js',
  'components/card/card.js',
  'components/card/card-directive.js',
  'components/player/player.js',
  'components/player/player-directive.js',
  'components/player/player-service.js'
], function() {
  // Execute app
  angular.bootstrap(document, ['blackjackApp']);
});