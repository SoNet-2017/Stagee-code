'use strict';

angular.module('myApp.profiloView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profiloView/:id_profilo', {
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


        })
    }])

    .controller('ProfiloCtrl', ['$scope', 'Users', 'currentAuth','$firebaseAuth', '$location', '$routeParams', 'SingleProfilo',
        function($scope, Users, currentAuth, $firebaseAuth, $location, $routeParams, SingleProfilo) {

        $scope.dati={};
        $scope.user = {
            name: 'Ciao'
        };

        $scope.datiProfilo = {};
        $scope.datiProfilo = SingleProfilo.getSingleProfilo($routeParams.id_profilo);

        $scope.dati.area = 'areaGeografica';

        $('#myModal').modal('show');

        $scope.openEvento= function() {

            $location.path("/eventoView");

        };

        $scope.redirectToCv= function() {

            $location.path("/CvView");

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

        $scope.logout = function() {
            Users.registerLogout(currentAuth.uid);
            //sign out
            $firebaseAuth().$signOut();
            $firebaseAuth().$onAuthStateChanged(function (firebaseUser) {
                if (firebaseUser) {
                    console.log("User is yet signed in as:", firebaseUser.uid);
                } else {
                    $location.path("/paginizialeView");
                }
            });
        }

    }]);


