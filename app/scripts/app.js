'use strict';

(function() {
  function config($locationProvider, $stateProvider) {

    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('signInPage', {
        url: '/',
        controller: 'SignInPageCtrl as signInPage',
        templateUrl: '/templates/signInPage.html'
      })
      $stateProvider
        .state('chatRooms', {
          url: '/chatRooms',
          controller: 'ChatRoomsCtrl as chatRooms',
          templateUrl: '/templates/chatRooms.html'
        });
  }

  angular
    .module('doorchat', ['ui.router', 'ui.bootstrap', 'ngCookies', 'ngRoute'])
    .config(config);
})();
