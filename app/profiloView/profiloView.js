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

    .controller('ProfiloCtrl', ['$scope', '$rootScope', 'Users', 'Evento', 'SingleEvento', 'currentAuth','$firebaseAuth', '$location', '$routeParams',
        'SingleProfilo', 'InsertEventoService', '$filter',
        function($scope, $rootScope, Users, Evento, SingleEvento, currentAuth, $firebaseAuth, $location, $routeParams, SingleProfilo, InsertEventoService, $filter) {


        $scope.dati={};
        $scope.citazione = {
            valore: 'La tua citazione',
            autore: 'Autore'
        };


        $scope.datiProfilo = {};

        $scope.datiProfilo = SingleProfilo.getSingleProfilo($routeParams.id_profilo);



        $scope.dati.area = 'areaGeografica';

        //$('#myModal').modal('show');

        $scope.openEvento= function() {

            $location.path("/eventoView");

        };

        $scope.redirectToCv= function() {

            $location.path("/CvView");
/*
            var email = user.email;
            var oggetto = "valuta evento!";
            var messaggio = "Ricordati di valutare l'evento";

            location.href = "mailto:" + email + "?Subject=" + oggetto + "&Body=" + messaggio;
*/
        };



        $scope.redirectToAreageografica = function() {

            $scope.dati.area = 'areaGeografica';


        };


        $scope.redirectToAmbito= function() {

            $scope.dati.area = 'ambito';

        };
/*
        $scope.Email = function() {


        }
*/
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


            $scope.events = [];
            $scope.dati.Ini=""
            $scope.dati.Fin= "";
            $scope.dati.Gio="";
            $scope.dati.date = function () {
                var inizio = $scope.dati.evento.ora_inizio;
                var fine = $scope.dati.evento.ora_fine;
                var giorno = $scope.dati.evento.data;
                $scope.dati.Ini = inizio;
                $scope.dati.Fin = fine;
                $scope.dati.Gio = giorno;
                $scope.events.push(
                    {title: 'Orario',start: inizio, end: fine,allDay: false},
                    {title :'Giorno',start: giorno});
            };

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();


            $scope.changeTo = 'Italian';


            $scope.eventSource = {
                url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
                className: 'gcal-event',           // an option!
                currentTimezone: 'America/Chicago' // an option!
            }


            $scope.datiCalendario = {};
            $scope.datiCalendario = Users.getCal($routeParams.id_profilo);

            console.log($scope.datiCalendario);

            $scope.datiCalendario.$loaded().then(function () {

                console.log("ciao");

                $scope.datiCalendario.forEach(function (element, index) {
                    var data_corrente = $scope.datiCalendario[index].dataEvento.split("/").reverse().join("/");
                    var evento_corrente = $scope.datiCalendario[index].id_evento;

                    $scope.events.push({
                        title: $scope.datiCalendario[index].nomeEvento,
                        start: data_corrente,
                        end: data_corrente,
                        allDay: true,
                        url: '#!/eventoView/' + evento_corrente
                    });

                });

            });


            $scope.eventsF = function (start, end, timezone, callback) {
                var s = new Date(start).getTime() / 1000;
                var e = new Date(end).getTime() / 1000;
                var m = new Date(start).getMonth();
                var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
                callback(events);
            };

            $scope.calEventsExt = {
                color: '#f00',
                textColor: 'yellow',
                events: [

                ]
            };


            $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
            $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];




            //var datiCalendarioSorted  = $filter('orderBy')($scope.datiCalendario, 'dataEvento')
            //console.log(datiCalendarioSorted);

        }]);
