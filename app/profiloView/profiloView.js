'use strict';

angular.module('myApp.profiloView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profiloView', {
            templateUrl: 'profiloView/profiloView.html',
            controller: 'ProfiloCtrl',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]

            }



// Close the dropdown menu if the user clicks outside of it

        })
    }])

    .controller('ProfiloCtrl', ['$scope','$location', function($scope, $location) {
        $scope.dati={};
        $scope.user = {
            name: 'Ciao'
        };
        $scope.dati.area = 'areaGeografica';

        $('#myModal').modal('show');

        $scope.openEvento= function() {

            $location.path("/eventoView");

        };



        $scope.redirectToAreageografica = function() {

            $scope.dati.area = 'areaGeografica';


        };

        $scope.redirectToAmbito= function() {

            $scope.dati.area = 'ambito';

        };

        $scope.isAreaGeografica = function()
        {
            if ($scope.dati.area == 'areaGeografica')
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        $scope.isAmbito = function()
        {
            if ($scope.dati.area == 'ambito')
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }]);


