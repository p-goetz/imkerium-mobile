angular.module('imkerium.controllers', [])

.controller('LoginController', function ($rootScope, $scope, $state, $ionicModal, authFactory) {
  $scope.credentials = {};
  $rootScope.token = '';

  $scope.login = function() {
    var email = $scope.credentials.email;
    var password = $scope.credentials.password;

    var token = authFactory.auth().login(
      {username: email, password: password},
      function(response) {
        $rootScope.token = response.token;
        $state.transitionTo('hives');
      },
      function(response) {
        $rootScope.token = '';
        $scope.message = 'Falsche E-Mail Adresse oder Passwort';
      });
  };
})

.controller('HiveController', function ($rootScope, $scope, $state, $timeout, $ionicModal, $ionicLoading, beekeeperFactory) {
  $scope.loggedIn = false;
  $scope.newHive = {};

  $scope.$on('$ionicView.enter', function(event, data) {
    if(!$rootScope.token) {
      $state.transitionTo('login');
    }

    $scope.populate();
  });

  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.register = function() {
    beekeeperFactory.hives().save($scope.newHive);
    $scope.closeModal();
    $scope.message = 'Volk ' + $scope.newHive.hive_name + ' an Standort ' + $scope.newHive.site_name + ' registriert.';
    $ionicLoading.show({ template: $scope.message, noBackdrop: true, duration: 2000 });
    $timeout(function() {
      $scope.populate();
    }, 2000);
  };

  $scope.populate = function() {
    beekeeperFactory.hives().get(
      function(response) {
        $scope.beekeeper = response.name;
        $scope.sites = response.sites;
      },
      function(response) {
        $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
      });
  };
})

.controller('DetailController', function ($rootScope, $scope, $stateParams, $timeout, $ionicModal, $ionicLoading, beekeeperFactory) {
  $scope.newLog = {date: new Date(), combs_total: 0, combs_brood: 0, combs_food: 0, queen_present: false};

  $scope.$on('$ionicView.enter', function(event, data) {
    if(!$rootScope.token) {
      $state.transitionTo('login');
    }
  });

  $ionicModal.fromTemplateUrl('templates/log.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.log = function() {
    beekeeperFactory.hive().save({id: $stateParams.id}, $scope.newLog);
    $scope.closeModal();
    $scope.message = 'Log vom ' + $scope.newLog.date + ' erfasst: ' + $scope.newLog.notes;
    $ionicLoading.show({ template: $scope.message, noBackdrop: true, duration: 2000 });
    $timeout(function() {
      $scope.populate();
    }, 2000);
  };

  $scope.populate = function() {
    beekeeperFactory.hive().get(
      {id: $stateParams.id},
      function(response) {
        $scope.site_name = response.sites[0].name;
        $scope.hive_name = response.sites[0].hives[0].name;
        $scope.logbook = response.sites[0].hives[0].logbook;
      },
      function(response) {
        $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
      });
  };

  $scope.populate();
});
