'use strict';

angular.module('myApp.bachecaView', ['ngRoute','myApp.evento'])

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

    .run(function($rootScope, NgMap) {
        NgMap.getMap().then(function(map) {
            $rootScope.map = map;
        });
    })

    //prova


    //CONTROLLER FUNZIONANTE SOLO MAPPA NO MARKERS
    /*    .controller( 'mapCtrl', function($scope) {
     $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDEHR5Dl1jOAT4Cb5Sdx738pid0D7LRwfc";
     });

     */


    .controller('mapCtrl',['$scope','$rootScope', 'Evento', 'SingleEvento', 'Profilo', 'currentAuth', '$location', 'SingleProfilo', 'Users', '$firebaseAuth',
        function($scope, $rootScope, Evento, SingleEvento, Profilo, currentAuth, $location, SingleProfilo, Users, $firebaseAuth) {



        /*
        $rootScope.mouseover = function() {
            console.log('mouseover', this);
            this.style.backgroundColor = 'grey';
        };
        $rootScope.mouseout = function() {
            this.style.backgroundColor = 'white';
        };
        $rootScope.click = function() {console.log('click')};
        */

        // .controller( 'mapCtrl', ['$scope', 'Evento', function($scope, Evento)
        $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDEHR5Dl1jOAT4Cb5Sdx738pid0D7LRwfc";
        //initialize variables

        $scope.dati = {};
        $scope.dati.vm = this;
        $scope.dati.vm.positions = [];
        $scope.dati.vm.tags = [];
        $scope.dati.vm.dettagli = [];

        $scope.dati.eventi = Evento.getData();

        $scope.dati.eventi.$loaded().then(function () {
            for (var i = 0; i < $scope.dati.eventi.length; i++) {
                var idSingoloEvento = $scope.dati.eventi[i].id;

                var address = $scope.dati.eventi[i].address;
                $scope.dati.vm.positions.push({address: address});

                var tag = $scope.dati.eventi[i].nome_evento;
                $scope.dati.vm.tags.push({tags: tag});



            }
        });

        $scope.datiProfili = {};
        $scope.datiProfili = Profilo.getData();

        $scope.userId = currentAuth.uid;
        console.log($scope.userId);

        $scope.datoProfilo = {};
        $scope.datoProfilo = SingleProfilo.getSingleProfilo($scope.userId);


        $scope.dati.area = 'areaGeografica';
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


        $scope.showTag = function(event, evento_dato) {
            $scope.selectedTag = evento_dato;
            $scope.map.showInfoWindow('myInfoWindow', this);
        };


            $scope.redirectToNewEvento = function() {

                $location.path("/creaEventoView");

            };


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
