'use strict';

angular.module('myApp.bachecaView', ['ngRoute','myApp.pizza'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/bachecaView', {
            templateUrl: 'bachecaView/bachecaView.html',
            controller: 'mapCtrl',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]

            }
        })
    }])
/*
.controller('View1Ctrl', ['$scope','Pizza',function($scope,Pizza) {
 $scope.dati={};
 $scope.dati.pizzas = Pizza.getData();
 }]);
*/
.controller( 'mapCtrl', function($scope) {
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDEHR5Dl1jOAT4Cb5Sdx738pid0D7LRwfc";

   /* $scope.redirectToFiltri = function() {


        $location.path("/filtriView");


    };*/
});