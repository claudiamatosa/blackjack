'use strict';

angular.module('blackjackApp.deck', [
  'blackjackApp.deck.deck-service'
])

  .value('SUITS', [
    'spades',
    'clubs',
    'diamonds',
    'hearts'
  ])

  .value('RANKS', [
    {
      rank: 'Ace',
      points: 1
    },

    {
      rank: '2',
      points: 2
    },

    {
      rank: '3',
      points: 3
    },

    {
      rank: '4',
      points: 4
    },

    {
      rank: '5',
      points: 5
    },

    {
      rank: '6',
      points: 6
    },

    {
      rank: '7',
      points: 7
    },

    {
      rank: '8',
      points: 8
    },

    {
      rank: '9',
      points: 9
    },

    {
      rank: '10',
      points: 10
    },

    {
      rank: 'Jack',
      points: 10
    },

    {
      rank: 'Queen',
      points: 10
    },

    {
      rank: 'King',
      points: 10
    }
  ]);