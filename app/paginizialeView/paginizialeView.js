/**
 * Created by Administrator on 26/05/2017.
 */
'use strict';

angular.module('myApp.paginizialeView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/paginizialeView', {
            templateUrl: 'paginizialeView/paginizialeView.html',
            controller: 'PaginizialeCtrl'
        });
    }])

    .controller('PaginizialeCtrl', ['$scope', '$location', '$log', function($scope, $location, $log) {
        $scope.user={};
        //$scope.auth = Auth; //acquires authentication from app.js (if it was done)
        /*$scope.signIn = function() {
            $scope.firebaseUser = null;
            $scope.error = null;
            $scope.auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
                // login successful: redirect to the pizza list
                $location.path("/loginView");
            }).catch(function(error) {
                $scope.error = error;
                $log.error(error.message);
            });
        };

       */
        $scope.redirectToLogin = function() {

            $location.path("/loginView");

        };

        $scope.redirectToRegistrazione = function() {


            $location.path("/registrazioneView");


        };

        $scope.Carousel = function($scope){
            $scope.myInterval = 3000;
            $scope.slides = [
                {
                    image: 'http://www.koreos.it/assets/uploads/galleries//17/13_Dollarphotoclub_35434001.jpg'
                },
                {
                    image: 'images_stagee/Danza_Stagee.png'
                },
                {
                    image: 'images_stagee/Teatro_Stagee.png'
                },
                {
                    image: 'images_stagee/Artboard1.jpg'
                }
            ];
        }

    }]);
