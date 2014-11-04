'use strict';

describe('blackjackApp.table module', function () {
    var TableCtrl,
        scope;

    beforeEach(module('blackjackApp'));

    describe('TableCtrl', function () {
        var scope,
            deckFactory,
            playerFactory,
            createController,
            RESULT_MESSAGES,
            WINNING_POINTS,
            MAXIMUM_POINTS,
            PLAYERS;

        beforeEach(inject(function (
            $rootScope,
            $controller,
            _deckFactory_,
            _playerFactory_,
            _RESULT_MESSAGES_,
            _WINNING_POINTS_,
            _MAXIMUM_POINTS_,
            _PLAYERS_
        ) {
            deckFactory = _deckFactory_;
            playerFactory = _playerFactory_;
            RESULT_MESSAGES = _RESULT_MESSAGES_;
            WINNING_POINTS = _WINNING_POINTS_;
            MAXIMUM_POINTS = _MAXIMUM_POINTS_;
            PLAYERS = _PLAYERS_;
            scope = $rootScope.$new();
            
            /**
             * Creates a controller using the passed dependencies
             * 
             * @param {Object} args - List of dependencies to overwrite,
             * containing the values. Example:
             * 
             * {
             *     'PLAYERS': {},
             *     'deckFactory': function () {}
             * }
             */
            createController = function (args) {
                var key,
                    mockedDependencies = {
                        '$scope': scope
                    };
                
                if (args) {
                    for (key in args) {
                        if (args.hasOwnProperty(key)) {
                            mockedDependencies[key] = args[key];
                        }
                    } 
                }
                
                return $controller('TableCtrl as table', mockedDependencies);
            };
        }));
        
        describe('setUpTable', function () {
            var table;
            
            beforeEach(function() {
                table = createController();
                
                spyOn(table, 'createPlayers');
                spyOn(table, 'createDeck');
            });
            
            it('should be defined', function () {
                expect(table.setUpTable).toBeDefined();
            });
            
            it('should define gameStarted as false by default', function () {
                table.setUpTable();
                
                expect(table.gameStarted).toBeFalsy();
            });
            
            it('should create the players', function () {
                table.setUpTable();
                
                expect(table.createPlayers).toHaveBeenCalled();
            });
            
            it('should create a deck', function () {
                table.setUpTable();
                
                expect(table.createDeck).toHaveBeenCalled();
            });
        });

        describe('createPlayers', function () {
            var table;
            
            it('should throw when PLAYERS is not an object', function () {
                var players = 'randomstring',
                    createPlayers = function () {
                        table = createController({'PLAYERS': players});

                        table.createPlayers();
                    };
                
                expect(createPlayers).toThrow();
            });
            
            it('should create a list of players as provided by the PLAYERS array', function () {
                var player,
                    key,
                    players = {
                        foo: {
                            name: 'Bar',
                            showPoints: true
                        },

                        yo: {
                            name: 'Man',
                            showPoints: true
                        },

                        john: {
                            name: 'Doe',
                            showPoints: true
                        }
                    };
                
                table = createController({'PLAYERS': players});
                
                expect(table.players).toBeDefined();
                
                for (key in players) {
                    if (players.hasOwnProperty(key)) {
                        player = players[key];
                        
                        expect(table.players[key]).toBeDefined();
                        expect(table.players[key].name).toBeDefined();
                        expect(table.players[key].name).toEqual(player.name);
                        expect(table.players[key].showPoints).toBeDefined();
                        expect(table.players[key].showPoints).toEqual(player.showPoints);
                    }
                }
            });

        });
        
    });
});