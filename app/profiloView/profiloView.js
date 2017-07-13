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

    .controller('ProfiloCtrl', ['$scope', '$rootScope', 'Users', 'Evento', 'SingleEvento', 'currentAuth','$firebaseAuth', '$location', '$routeParams', 'SingleProfilo', 'InsertEventoService',
        function($scope, $rootScope, Users, Evento, SingleEvento, currentAuth, $firebaseAuth, $location, $routeParams, SingleProfilo, InsertEventoService) {


        $scope.dati={};
        $scope.citazione = {
            valore: 'La tua citazione',
            autore: 'Autore'
        };

        //evento
/*        $scope.datiEventi = {};
        $scope.datiEventi = Evento.getData();
        $scope.datoEvento = [];
            var nomeEvento;
            var dataEvento;
            var descrizioneEvento;
            var imgEvento;
            var categoriaEvento;

            $scope.evento = function (eventoId) {
                if (eventoId = $scope.dati.evento.eventoId){
                    return eventoId;
                }
            };
*/


        $scope.datiProfilo = {};
        $scope.datiProfilo = SingleProfilo.getSingleProfilo($routeParams.id_profilo);




            $scope.dati.area = 'areaGeografica';

        //$('#myModal').modal('show');

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



//inserimento eventi nel calendario

  /*          $scope.dati.evento = function (eventoIdAttuale) {
                //var id_corrente = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
                //console.log(id_corrente);

                for (var i = 0; i < $scope.datiEventi.length; i++) {
                    if($scope.datiEventi[i].eventoId === eventoIdAttuale){
                        console.log("Entrato nell'if");
                        console.log($scope.datiEventi[i].eventoId);
                        $scope.dati.evento.push({nome_evento: $scope.datiEventi[i].nome_evento,
                                                nome_organizzatore: $scope.datiEventi[i].nome_organizzatore,
                                                data_evento: $scope.datiEventi[i].data,
                                                descrizione: $scope.datiEventi[i].descrizione,
                                                img_url: $scope.datiEventi[i].img_url,
                                                img_alt: $scope.datiEventi[i].img_alt,
                                                ora_inizio: $scope.datiEventi[i].ora_inizio,
                                                ora_fine: $scope.datiEventi[i].ora_fine,
                                                lista: $scope.datiEventi[i].lista,
                                                categoria: $scope.datiEventi[i].categoria,
                                                valutazioni: $scope.datiEventi[i].valutazioni});

                        nomeEvento = $scope.datiEventi[i].nome_evento;
                        dataEvento = $scope.datiEventi[i].data;
                        descrizioneEvento = $scope.datiEventi[i].descrizione;
                        imgEvento = $scope.datiEventi[i].img_url;
                        categoriaEvento = $scope.datiEventi[i].categoria;
                    }
                }
            };


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

            console.log($scope.events)

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
                    {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                    {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                    {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
                ]
            };


            $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
            $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

*/



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
































