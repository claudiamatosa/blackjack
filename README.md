# Blackjack

A simple blackjack game written in AngularJS.

[![Build Status](https://travis-ci.org/claudiamatosa/blackjack.svg?branch=master)](https://travis-ci.org/claudiamatosa/blackjack)

## Runing the project

The code can be viewed under `http://claudiamatosa.com/code/blackjack`.

### To run locally

Install nodeJS, then run, from the root directory:

    npm install -g bower grunt-cli
    npm install
    bower install
    grunt connect

If everything has worked successfully, navigate to http://localhost:9001.

## Testing

This app contains some unit and end-to-end tests. In order to run them, follow [angular-seed's procedure](https://github.com/angular/angular-seed#testing). 

## Tools used

- `angular-seed`, for the base structure and angular-route integration - https://github.com/angular/angular-seed
- `Grunt`, to run a local server and see the routes properly - http://gruntjs.com/

## TODO

- Testing.
- Using less/sass and build to dist folder.
- Adding more functionality - particularly a wallet.
