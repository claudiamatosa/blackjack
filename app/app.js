'use strict';

// Declare app level module which depends on views, and components
angular.module('blackjackApp', [
  'ngRoute',
  'blackjackApp.table',
  'blackjackApp.card',
  'blackjackApp.deck',
  'blackjackApp.player'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/table'});
}]);
