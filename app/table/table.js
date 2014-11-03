'use strict';

angular.module('blackjackApp.table', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/table', {
    templateUrl: 'table/table.html',
    controller: 'TableCtrl as table'
  });
}])

.value('RESULT_MESSAGES', {
  WIN: 'Winner: $winnerName',
  TIE: 'It\'s a tie!',
  ERROR: 'There was an error calculating the result'
})

.value('WINNING_POINTS', 19)

.value('MAXIMUM_POINTS', 21)

.controller('TableCtrl',
  ['deckFactory', 'playerFactory', 'RESULT_MESSAGES', 'WINNING_POINTS', 'MAXIMUM_POINTS',
   function(deckFactory, playerFactory, RESULT_MESSAGES, WINNING_POINTS, MAXIMUM_POINTS) {
    var vm = this;
  
    this.players = {
      dealer: playerFactory.build('Dealer', false),
      player: playerFactory.build('You', true)
    };
      
    this.deck = deckFactory.build();
  
    this.gameStarted = false;
  
    /**
     * @ngdoc method
     * @name startRound
     * @methodOf TableCtrl
     * @description Sets the initial data for the game.
     */
    this.startRound = function () {
      var player,
          key;
      
      this.result = '';
      this.gameStarted = true;
      this.firstHand = true;
      
      this.deck.rejoin().shuffle();

      this.players.dealer.showPoints = false;
      
      for (key in this.players) {
        player = this.players[key];
        
        player.cards = [];
        player.points = 0;
      };
    };
  
    /**
     * Display result of the game
     */
    this.displayResult = function (result, winnerName) {
      if (typeof result !== 'undefined') {
        this.result = result.replace('$winnerName', winnerName);
      } else {
        this.result = RESULT_MESSAGES.ERROR;
      }
    };
  
    /**
     * @ngdoc method
     * @name getResult
     * @methodOf TableCtrl
     * @description Computes the result of the game by querying all players.
     */
    this.getResult = function () {
      var playersOverMax = 0,
          winnerPoints = 0,
          player,
          result,
          winner,
          key;
      
      for (key in this.players) {
        player = this.players[key];
        
        // Counting the number of players exceeding the maximum points
        if (player.points > MAXIMUM_POINTS) {
          playersOverMax += 1;
        
        // Settings this player as the winner if he has more points than
        // the previous player
        } else if (player.points > winnerPoints) {
          winner = player.name;
          winnerPoints = player.points;
          result = RESULT_MESSAGES.WIN;
        
        // Setting the result as a tie when the players have equal points
        } else if (player.points === winnerPoints) {
          result = RESULT_MESSAGES.TIE;
        }
      };
      
      if (playersOverMax === Object.keys(this.players).length) {
        result = RESULT_MESSAGES.TIE;
      }
      
      this.displayResult(result, winner);
    };
  
    /**
     * @ngdoc method
     * @name end
     * @methodOf TableCtrl
     * @description Ends the game, by displaying all players' points and cards.
     */
    this.end = function () {
      var player,
          key;
      
      for (key in this.players) {
        var player = this.players[key];
        
        player.showPoints = true;
        
        player.cards.forEach(function(card) {
          card.faceUp = true;
        });
      };
      
      vm.gameStarted = false;
      vm.getResult();
    };
  
    /**
     * @ngdoc method
     * @name end
     * @methodOf TableCtrl
     * @description Updates the status of the game, by ending it if necessary.
     */
    this.updateStatus = function () {
      var player,
          key;
      
      if (this.firstHand) {
        this.firstHand = false;
      } else {
        for (key in this.players) {
          player = this.players[key];
          
          if (player.points >= WINNING_POINTS) {
            this.end();
          }
        };
      }
    };
  
    /**
     * @ngdoc method
     * @name serveCard
     * @methodOf TableCtrl
     * @description Serves a card to a designated player.
     * @param {PlayerFactory} player
     * @param {Boolean} faceUp - card is displayed to the user
     */
    this.serveCard = function (player, faceUp) {
      player.addCard(this.deck.getNextCard(faceUp));
    };
  
    /**
     * @ngdoc method
     * @name serveCards
     * @methodOf TableCtrl
     * @description Serves a card to each player in game.
     */
    this.serveCards = function () {
      var player,
          key;
      
      for (key in this.players) {
        player = this.players[key];
        
        if (player.serveCard) {
          this.serveCard(player, true);
        }
      };                   
                           
      vm.updateStatus();
    };
  
    /**
     * @ngdoc method
     * @name start
     * @methodOf TableCtrl
     * @description Start a new game by shuffling the deck and giving the
     * first 2 cards.
     */
    this.start = function () {
      var showFirstCard,
          player,
          key;
      
      vm.startRound();
      
      for (key in this.players) {
        player = this.players[key];
        
        showFirstCard = (key === 'player');
        
        this.serveCard(player, showFirstCard);
        this.serveCard(player, true);
      };
    };
  
    this.hit = function () {
      this.players.player.serveCard = true;
      this.players.dealer.serveCard = false;
      
      this.serveCards();
    };
  
    this.stick = function () {
      this.players.player.serveCard = false;
      this.players.dealer.serveCard = true;
      
      this.serveCards();
    };
}]);