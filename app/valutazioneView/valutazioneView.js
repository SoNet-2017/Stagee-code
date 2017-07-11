/**
 * Created by Administrator on 09/06/2017.
 */
angular.module('myApp.valutazioneView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/valutazioneView/:eventoId', {
            templateUrl: 'valutazioneView/valutazioneView.html',
            controller: 'ValutazioneCtrl',
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



    .controller('ValutazioneCtrl',[ '$scope', '$rootScope','$routeParams','Evento', 'Profilo', 'InsertEventoService', 'Auth',
        function($scope, $rootScope, $routeParams, Evento, Profilo, InsertEventoService, Auth) {

            $scope.rank={};
            $scope.datiEventi = {};
            $scope.datiEventi = Evento.getData();
            $scope.datoEvento = [];

            $scope.datiProfili = {};
            $scope.datiProfili = Profilo.getData();
            var current_profile = Auth.$getAuth().uid;
            $scope.profilo_corrente = Auth.$getAuth().uid;
            var id_corrente = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);

            $scope.datiEventi.$loaded().then(function () {

                console.log(id_corrente);


                for (i = 0; i < $scope.datiEventi.length; i++) {
                    if($scope.datiEventi[i].eventoId === id_corrente){
                        console.log("valuta questo evento ok");
                        console.log($scope.datiEventi[i].eventoId);
                        $scope.datoEvento.push({nome_evento: $scope.datiEventi[i].nome_evento, nome_organizzatore: $scope.datiEventi[i].nome_organizzatore,
                            eventoId: $scope.datiEventi[i].eventoId});

                    }
                }



            });

            $scope.valutaEvento = function() {

                console.log($scope.rank.punteggio);
                console.log($scope.rank.commento);
                InsertEventoService.addValutazioneToEvento($scope.rank.punteggio, id_corrente, $scope.rank.commento, current_profile);

            }



        }]);