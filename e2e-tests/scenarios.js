'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {

    browser.get('index.html');

    it('should automatically redirect to /table when location hash/fragment is empty', function () {
        expect(browser.getLocationAbsUrl()).toMatch("/table");
    });


    describe('table', function () {
        var buttons = {
                hit: {
                    element: element.all(by.css('.hit-button')),
                    enabledAtStart: false
                },

                stick: {
                    element: element.all(by.css('.stick-button')),
                    enabledAtStart: false
                },

                start: {
                    element: element.all(by.css('.start-button')),
                    enabledAtStart: true
                }
            };

        beforeEach(function () {
            browser.get('index.html#/table');
        });


        it('should render the game table when user navigates to /table', function () {
            expect(element.all(by.css('[ng-view] .game-title')).first().getText()).
                toMatch(/Blackjack/);
        });

        it('should enable the hit and stick buttons after starting the game', function () {
            var button,
                key;
            
            // Only the start button is enabled
            for (key in buttons) {
                if (buttons.hasOwnProperty(key)) {
                    button = buttons[key];
                    
                    expect(button.element.isEnabled()).toEqual([button.enabledAtStart]);
                }    
            }
            
            // Click the start button to start the game
            buttons.start.element.click();
            
            // All the buttons must be enabled
            for (key in buttons) {
                if (buttons.hasOwnProperty(key)) {
                    button = buttons[key];
                    
                    expect(button.element.isEnabled()).toEqual([true]);
                }    
            }
        });

    });
});