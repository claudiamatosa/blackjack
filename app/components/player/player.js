'use strict';

angular.module('blackjackApp.player', [
  'blackjackApp.player.player-service',
  'blackjackApp.player.player-directive'
])
  
  .value('maximumCards', 6);