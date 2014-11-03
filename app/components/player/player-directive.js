'use strict';

angular.module('blackjackApp.player.player-directive', [])

  .directive('bjPlayer', [function() {
    
    var settings = {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'components/player/player.html'
    };

    return settings;
  }]);