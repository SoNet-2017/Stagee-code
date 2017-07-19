'use strict';

angular.module('myApp.loginView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/loginView', {
    templateUrl: 'loginView/loginView.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', 'Auth', '$location', '$log', 'Users', function($scope, Auth, $location, $log, Users) {
    $scope.user={};
    $scope.auth = Auth; //acquires authentication from app.js (if it was done)

    $scope.signIn = function() {

        $scope.firebaseUser = null;
        $scope.error = null;

        $scope.auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
            var userEmail = firebaseUser.email;
            location.href = "mailto:" + userEmail;
            var userId = firebaseUser.uid;

            Users.registerLogin(userId, $scope.user.email);
            // login successful: redirect to bacheca
            $location.path("/bachecaView");
        }).catch(function(error) {
            $scope.error = error;
            $log.error(error.message);
        });
    };

    $scope.resetPassword = function() {

        $scope.auth.$sendPasswordResetEmail($scope.user.mailReset).then(function () {
            $('#ModalReset').modal('hide');
            $('#confermaReset').modal('show');
            // Email sent.
        }, function (error) {
            $scope.isVisibleError = true;

            // An error happened.
        });


    };

}]);