/**
 * Created by Administrator on 26/05/2017.
 */
'use strict';

angular.module('myApp.registrazioneView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/registrazioneView', {
            templateUrl: 'registrazioneView/registrazioneView.html',
            controller: 'RegistrazioneCtrl'
        });
    }])

    .controller('RegistrazioneCtrl', ['$scope', 'Auth', '$location', '$log', function($scope, Auth, $location, $log) {

        $scope.signIn= function () {

            $location.path("/profiloView");

        };

        $scope.returnToLogin = function() {

            $location.path("/loginView");

        };
    }]);