'use strict';

angular.module('imkerium.services', ['ngResource'])
  .constant('baseUrl', 'http://localhost:3000/')
  .constant('beekeeperId', '575430b3b67ed6d602afa0b4')
  .service('beekeeperFactory', ['$rootScope', '$resource', 'baseUrl', 'beekeeperId', function($rootScope, $resource, baseUrl, beekeeperId) {
    this.hives = function() {
      var authHeader = {'x-access-token': $rootScope.token};

      console.log(authHeader);
      console.log($rootScope.token);

      return $resource(baseUrl + 'beekeeper/' + beekeeperId + '/hives', null, {
        get: { method: 'GET', headers: authHeader },
        save: { method: 'POST', headers: authHeader }
      });
    };

    this.hive = function() {
      var authHeader = {'x-access-token': $rootScope.token};

      return $resource(baseUrl + 'beekeeper/' + beekeeperId + '/hives/:id', null, {
        get: { method: 'GET', headers: authHeader },
        save: { method: 'POST', headers: authHeader }
      });
    };
  }])
  .service('authFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {
    this.auth = function() {
      return $resource(baseUrl + 'users/login', null, {login: {method: 'POST'}});
    };
  }]);
