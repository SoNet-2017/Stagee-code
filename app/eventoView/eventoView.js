/**
 * Created by Administrator on 09/06/2017.
 */
angular.module('myApp.eventoView', ['ngRoute','myApp.evento'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/eventoView/:eventoId', {
            templateUrl: 'eventoView/eventoView.html',
            controller: 'EventoCtrl',
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



    .controller('EventoCtrl',[ '$scope', '$rootScope', '$routeParams', 'Evento', 'SingleEvento', function($scope, $rootScope, $routeParams, Evento, SingleEvento) {

        $scope.dati = {};
        $scope.datiEventi = {};
        //$scope.datiEvento = {};

        $scope.datiEventi = Evento.getData();
        $scope.datoEvento = [];
        $scope.listaPartecipanti = [];


        $scope.datiEventi.$loaded().then(function () {
           var id_corrente = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
           console.log(id_corrente);

           for (i = 0; i < $scope.datiEventi.length; i++) {
               if($scope.datiEventi[i].eventoId === id_corrente){
                   console.log("Entrato nell'if");
                   console.log($scope.datiEventi[i].eventoId);
                   $scope.datoEvento.push({nome_evento: $scope.datiEventi[i].nome_evento, nome_organizzatore: $scope.datiEventi[i].nome_organizzatore,
                       data_evento: $scope.datiEventi[i].data, descrizione: $scope.datiEventi[i].descrizione, img_url: $scope.datiEventi[i].img_url,
                       img_alt: $scope.datiEventi[i].img_alt, ora_inizio: $scope.datiEventi[i].ora_inizio, ora_fine: $scope.datiEventi[i].ora_fine,
                        lista: $scope.datiEventi[i].lista});


                   for (k in $scope.datiEventi[i].lista){

                       $scope.listaPartecipanti.push({partecipante: $scope.datiEventi[i].lista[k]});
                       console.log($scope.datiEventi[i].lista[k]);


                   }
               }
                }


       });


       //$scope.datiEvento=SingleEvento.getSingleEvento($routeParams.eventoId);




        //filtri
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
        };

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
        };


}]);