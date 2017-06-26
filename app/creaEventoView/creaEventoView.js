/**
 * Created by Matteo on 26/06/17.
 */

'use strict';

angular.module('myApp.creaEventoView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/creaEventoView', {
            templateUrl: 'creaEventoView/creaEventoView.html',
            controller: 'CreaEventoCtrl'
        });
    }])



    .controller('CreaEventoCtrl', ['$scope', '$rootScope', 'Auth', 'InsertEventoService', '$location', '$firebaseStorage','$routeParams', 'Profilo',
        function($scope, $rootScope, Auth, InsertEventoService, $location, $firebaseStorage, $routeParams, Profilo) {

            $scope.event={};
            var ctrl = this;
            $scope.fileToUpload = null;
            $scope.imgPath= "";

            //initialize the function that will be called when a new file will be specified by the user
            ctrl.onChange = function onChange(fileList) {
                $scope.fileToUpload = fileList[0];
            };

            var prof_corrente = Auth.$getAuth().uid;
            $scope.datiProfiliC = {};
            $scope.datiProfiliC = Profilo.getData();
            var nome_org;

            $scope.datiProfiliC.$loaded().then(function () {


                for (var h = 0; h < $scope.datiProfiliC.length; h++) {
                    console.log("entrato for OK");
                    if($scope.datiProfiliC[h].id_profilo === prof_corrente){
                        console.log("entrato if OK");

                        nome_org = $scope.datiProfiliC[h].nome + " " + $scope.datiProfiliC[h].cognome;

                        console.log(nome_org);

                    }

                }


            $scope.registraEvento = function() {
                //check if the second password is equal to the first one



                if ($scope.fileToUpload !== null) {
                    //get the name of the file
                    var fileName = $scope.fileToUpload.name;
                    //specify the path in which the file should be saved on firebase
                    var storageRef = firebase.storage().ref("eventiImg/" + fileName);
                    $scope.storage = $firebaseStorage(storageRef);
                    var uploadTask = $scope.storage.$put($scope.fileToUpload);
                    uploadTask.$complete(function (snapshot) {
                        $scope.imgPath = snapshot.downloadURL;

                        InsertEventoService.insertNewEvento($scope.event.address, $scope.event.nome_evento, nome_org, $scope.event.descrizione,
                            $scope.imgPath, $scope.event.data, $scope.event.ora_inizio, $scope.event.ora_fine);


                    });
                    uploadTask.$error(function (error) {
                        $scope.dati.error = error + " - L'evento verrà creato senza un'immagine!";
                        InsertEventoService.insertNewEvento($scope.event.address, $scope.event.nome_evento, $scope.event.nome_organizzatore, $scope.event.descrizione,
                            $scope.imgPath, $scope.event.data, $scope.event.ora_inizio, $scope.event.ora_fine);


                    });

                }
                else {
                    InsertEventoService.insertNewEvento($scope.event.address, $scope.event.nome_evento, $scope.event.nome_organizzatore, $scope.event.descrizione,
                        $scope.imgPath, $scope.event.data, $scope.event.ora_inizio, $scope.event.ora_fine);


                                }


                $location.path("/bachecaView");
            };

            });


        }]);

