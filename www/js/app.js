// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('start', {
    url: '/start',
    templateUrl: 'templates/start.html',  
    controller: 'StartCtrl'
  })

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/main.html'
  })

    .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

    .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })

    
  .state('app.main', {
    url: '/main',
    views: {
      'app-dash': {
        templateUrl: 'templates/app-main.html',
        controller: 'MainCtrl'
      }
    }
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'app-settings': {
        templateUrl: 'templates/app-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('app.map', {
    url: '/map',
    views: {
      'app-map': {
        templateUrl: 'templates/app-map.html',
        controller: 'MapCtrl'
      }
    }
  })

  //--Settings stuff begins here--
  .state('tandc', {
    url: '/tandc',
    templateUrl: 'templates/settings/tandc.html',
    controller: 'TandCCtrl'
  })

  .state('contacts', {
    url: '/contacts',
    templateUrl: 'templates/settings/contacts.html',
    controller: 'ContactsCtrl'  
  })

  .state('devices', {
    url: '/devices',
    templateUrl: 'templates/settings/devices.html',
    controller: 'DevicesCtrl'
  })

  .state('account', {
    url: '/account',
    templateUrl: 'templates/settings/account.html',
    controller: 'AccountCtrl'
  });
  //--Settings stuff ends here--

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start');

});
