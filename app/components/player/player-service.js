'use strict';

/**
 * @ngdoc service
 * @name player-service
 * @id player-service
 * @description Provides a player on request
 */
angular.module('blackjackApp.player.player-service', [])

    /**
     * @ngdoc factory
     * @name playerFactory
     * @id playerFactory
     * @description Handles the players
     */
  .factory('playerFactory', [function() {
      
    function Player (name, showPoints) {
      this.name = name;
      this.showPoints = showPoints;
      this.points = 0;
      this.cards = [];
      this.serveCard = true;
    };

    Player.prototype.addCard = function (card) {
      this.cards.push(card);
      this.points += card.points;

      return this;
    };

    Player.build = function (name, showPoints) {
      return new Player(name, showPoints);
    };

    return Player;
  }]);