// Declare app level module which depends on filters, and services
angular.module('fundera', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ui.date', 'LocalStorageModule'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html', 
        controller: 'HomeController'})
      .otherwise({redirectTo: '/'});
  }]);
