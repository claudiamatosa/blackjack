module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/vendor/angular/angular.js',
      'app/vendor/angular-route/angular-route.js',
      'app/vendor/angular-mocks/angular-mocks.js',
      'app/app.js',
      'app/components/**/*.js',
      'app/table/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-phantomjs-launcher'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
