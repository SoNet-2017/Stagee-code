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
    .controller('EventoCtrl',[ '$scope', '$rootScope', '$routeParams', 'Profilo', 'SingleEvento',
        function($scope, $rootScope, $routeParams, Profilo, SingleEvento) {

        $scope.dati = {};
        $scope.dati = this;
        $scope.dati.elenco = [];
        //set the variable that is used in the main template to show the active button
        $rootScope.dati.currentView = "evento";

        /*$scope.dati.profili = Profilo.getData();
        //when the information about the pizza will be loaded, then the map will be created adding a marker in the Pizzeria location
        $scope.dati.profili.$loaded().then(function () {
            for (var i = 0; i < $scope.dati.profili.length; i++) {
                var idSingoloProfilo = $scope.dati.profili[i].id_profilo;

                var prof_user = $scope.dati.profili[i].prof_user;
                $scope.dati.elenco.push({prof_user: prof_user});
            }
        });
        */
        $scope.dati.evento=SingleEvento.getSingleEvento($routeParams.eventoId);
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


}]);