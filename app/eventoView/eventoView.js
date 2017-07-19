/**
 * Created by Administrator on 09/06/2017.
 */
angular.module('myApp.eventoView', ['ngRoute', 'myApp.evento'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/eventoView/:eventoId', {
            templateUrl: 'eventoView/eventoView.html',
            controller: 'EventoCtrl',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function (Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]

            }

// Close the dropdown menu if the user clicks outside of it

        })
    }])


    .controller('EventoCtrl', ['$scope', '$rootScope', '$routeParams', 'Evento', 'Profilo', '$location', 'InsertEventoService',
        'Auth', 'Users', '$firebaseAuth', 'SingleProfilo',
        function ($scope, $rootScope, $routeParams, Evento, Profilo, $location, InsertEventoService, Auth, Users, $firebaseAuth, SingleProfilo) {

            $scope.datiEventi = {};
            $scope.datiEventi = Evento.getData();
            $scope.datoEvento = [];
            $scope.listaPartecipanti = [];
            $scope.listaPunteggi = [];
            $scope.listaCommenti = [];

            $scope.datiProfili = {};
            $scope.datiProfili = Profilo.getData();
            $scope.current_profile = Auth.$getAuth().uid;
            $scope.datiProfiloCorrente = {};

            $scope.avg = 0;
            $scope.id_evento_corrente = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);

            var nomeEvento;
            var dataEvento;
            var descrizioneEvento;
            var imgEvento;
            var categoriaEvento;


            $scope.datiEventi.$loaded().then(function () {


                var id_corrente = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
                console.log(id_corrente);
                $scope.datiProfiloCorrente = SingleProfilo.getSingleProfilo(Auth.$getAuth().uid);
                console.log($scope.datiProfiloCorrente);

                for (i = 0; i < $scope.datiEventi.length; i++) {
                    if ($scope.datiEventi[i].eventoId === id_corrente) {
                        console.log("Entrato nell'if");
                        console.log($scope.datiEventi[i].eventoId);
                        $scope.datoEvento.push({
                            nome_evento: $scope.datiEventi[i].nome_evento,
                            nome_organizzatore: $scope.datiEventi[i].nome_organizzatore,
                            data_evento: $scope.datiEventi[i].data,
                            descrizione: $scope.datiEventi[i].descrizione,
                            img_url: $scope.datiEventi[i].img_url,
                            img_alt: $scope.datiEventi[i].img_alt,
                            ora_inizio: $scope.datiEventi[i].ora_inizio,
                            ora_fine: $scope.datiEventi[i].ora_fine,
                            lista: $scope.datiEventi[i].lista,
                            categoria: $scope.datiEventi[i].categoria,
                            valutazioni: $scope.datiEventi[i].valutazioni,
                            costo: $scope.datiEventi[i].costo,
                            partecipazione: $scope.datiEventi[i].partecipazione
                        });

                        nomeEvento = $scope.datiEventi[i].nome_evento;
                        dataEvento = $scope.datiEventi[i].data;
                        descrizioneEvento = $scope.datiEventi[i].descrizione;
                        imgEvento = $scope.datiEventi[i].img_url;
                        categoriaEvento = $scope.datiEventi[i].categoria;

                        for (k in $scope.datiEventi[i].lista) {

                            $scope.listaPartecipanti.push({partecipante_nome: $scope.datiEventi[i].lista[k].partecipante});
                            console.log($scope.datiEventi[i].lista[k].partecipante);

                        }

                        for (m in $scope.datiEventi[i].valutazioni) {

                            $scope.listaCommenti.push({commento: $scope.datiEventi[i].valutazioni[m].commento});
                            console.log($scope.datiEventi[i].valutazioni[m].commento);

                        }

                        for (l in $scope.datiEventi[i].valutazioni) {

                            $scope.listaPunteggi.push($scope.datiEventi[i].valutazioni[l].punteggio);

                            //console.log($scope.datiEventi[i].valutazioni[l].punteggio);

                        }

                        console.log($scope.listaPunteggi);

                        var sum = 0;
                        for (var p = 0; p < $scope.listaPunteggi.length; p++) {
                            sum += parseInt($scope.listaPunteggi[p]);
                            console.log(sum);

                        }
                        $scope.avg = sum / $scope.listaPunteggi.length;


                    }


                }


                $scope.partecipa = function () {

                    var profilo_corrente = Auth.$getAuth().uid;
                    console.log(profilo_corrente);
                    var evento_corrente = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);


                    for (j = 0; j < $scope.datiProfili.length; j++) {
                        console.log("entrato for OK");
                        if ($scope.datiProfili[j].id_profilo === profilo_corrente) {
                            console.log("entrato if OK");

                            var nome_corrente = $scope.datiProfili[j].nome;
                            var cognome_corrente = $scope.datiProfili[j].cognome;

                            console.log(nome_corrente);
                            console.log(cognome_corrente);

                        }

                    }

                    InsertEventoService.addUserToEvento(evento_corrente, nome_corrente, cognome_corrente,
                        profilo_corrente, nomeEvento, dataEvento, descrizioneEvento, imgEvento, categoriaEvento);

                   /* var x = document.getElementById('partecipa');
                    if (x.style.display == 'none') {
                        x.style.display = 'block';
                    } else {
                        x.style.display = 'none';
                    }*/

                }

                //$('partecipa').prop('disabled', true)

            });


            //$scope.datiEvento=SingleEvento.getSingleEvento($routeParams.eventoId);


            //filtri
            $scope.dati.area = 'areaGeografica';
            $scope.redirectToAreageografica = function () {

                $scope.dati.area = 'areaGeografica';


            };

            $scope.redirectToAmbito = function () {

                $scope.dati.area = 'ambito';

            };

            $scope.isAreaGeografica = function () {
                if ($scope.dati.area == 'areaGeografica') {
                    return true;
                }
                else {
                    return false;
                }
            };

            $scope.isAmbito = function () {
                if ($scope.dati.area == 'ambito') {
                    return true;
                }
                else {
                    return false;
                }
            };


            $scope.returnToProfile = function () {
                $location.path("/profiloView");
            }


            $scope.logout = function () {
                Users.registerLogout($scope.current_profile);
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