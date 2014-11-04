'use strict';

describe('blackjackApp.table module', function () {
    var TableCtrl,
        scope;

    beforeEach(module('blackjackApp'));

    describe('TableCtrl', function () {
        var scope,
            deckFactory,
            playerFactory,
            createController;

        beforeEach(inject(function ($rootScope, $controller, _deckFactory_, _playerFactory_) {
            deckFactory = _deckFactory_;
            playerFactory = _playerFactory_;
            scope = $rootScope.$new();

            createController = function () {
                return $controller('TableCtrl as table', {
                    '$scope': scope
                });
            };
        }));
        
        describe('setUpTable', function () {
            var table;
            
            beforeEach(function() {
                table = createController();
                
                spyOn(table, 'createPlayers');
                spyOn(table, 'createDeck');
            });
            
            it('should define gameStarted as false by default', function () {
                table.setUpTable();
                
                expect(table.gameStarted).toBeFalsy();
            });
        });

    });
});