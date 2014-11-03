'use strict';

angular.module('blackjackApp.card.card-directive', [])

  .directive('bjCard', [function() {
    
    var settings = {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'components/card/card.html'
    };

    return settings;
  }])

  .directive('bjAnimateOnAdd', function(){
    return function(scope, element, attrs) {
      setTimeout(function () {
        element.addClass('added');
      });
    };
  });