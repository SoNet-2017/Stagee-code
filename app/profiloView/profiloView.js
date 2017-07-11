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

    .controller('ProfiloCtrl', ['$scope', '$rootScope', '$routeParams', 'Users', 'currentAuth','$firebaseAuth', '$location', 'SingleEvento', 'SingleProfilo', 'Evento',
        function($scope, $rootScope, $routeParams, Users, currentAuth, $firebaseAuth, $location, SingleEvento, SingleProfilo, Evento) {

        $scope.dati={};
        $scope.citazione = {
            valore: 'La tua citazione',
            autore: 'Autore'
        };

        //   INSERIRE 1






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


        //   CALENDARIO

        //  INSERIRE 2


            /*Controller Calendario*/
            $scope.changeTo = 'Italian';

            /* event source that pulls from google.com */
            $scope.eventSource = {
                url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
                className: 'gcal-event',           // an option!
                currentTimezone: 'America/Chicago' // an option!
            };
            /* event source that contains custom events on the scope */

            /* https://fullcalendar.io/docs/text/timeFormat/ DOCUMENTAZIONE FULLCALENDAR*/



            //   INSERIRE 3

            //funzione per cancellare testo default in textarea




        }]);
































