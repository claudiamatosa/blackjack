'use strict';

/**
 * @ngdoc service
 * @name deck-service
 * @id deck-service
 * @description Provides a deck on request
 */
angular.module('blackjackApp.deck.deck-service', [])

    /**
     * @ngdoc factory
     * @name deckFactory
     * @id deckFactory
     * @description Create a deck with common functions
     */
	.factory('deckFactory', ['SUITS', 'RANKS', function(SUITS, RANKS) {
      
      function getCards () {
        var deck = [];

        SUITS.forEach(function (suit) {
          RANKS.forEach(function (rank) {
            deck.push({
              rank: rank.rank,
              points: rank.points,
              suit: suit
            });
          });
        });

        return deck;
      };
      
      function Deck (cards) {
        this.cards = getCards();
        this.inPlay = [];
      };
      
      Deck.prototype.rejoin = function () {
        this.cards = this.cards.concat(this.inPlay);
        this.inPlay = [];
        
        return this;
      };

      /**
       * Using Fisher-Yates shuffle algorithm, as in
       * http://bost.ocks.org/mike/shuffle/
       */
      Deck.prototype.shuffle = function () {
        var deck = this.cards,
            m = deck.length,
            t,
            i;

        while (m) {

          i = Math.floor(Math.random() * m--);

          t = deck[m];
          deck[m] = deck[i];
          deck[i] = t;
        }

        return deck;
      };
      
      /**
       * @ngdoc method
       * @name end
       * @methodOf deckFactory
       * @description Retrieves the next card from the stack.
       */
      Deck.prototype.getNextCard = function (faceUp) {
        var card = this.cards[0];

        // Is this card displayed to the user?
        card.faceUp = faceUp;

        // Remove the card from the stack, as it has already been dealt
        this.cards.shift();

        // Add a reference to the card in the inPlay section (so we can join them when the
        // game is restarted
        this.inPlay.push(card);

        // When no cards are left in the deck, rebuild and shuffle
        if (!this.cards.length) {
          this.rejoin().shuffle();
        }

        return card;
      };
      
      Deck.build = function () {
        return new Deck();
      };
      
      return Deck;
	}]);