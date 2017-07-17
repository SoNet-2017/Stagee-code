/**
 * Created by Administrator on 09/06/2017.
 */
angular.module('myApp.CvView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/CvView', {
            templateUrl: 'CvView/CvView.html',
            controller: 'CvCtrl',
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



    .controller('CvCtrl', ['$scope', 'SingleProfilo', 'InsertEventoService','Auth', 'Users', '$firebaseAuth', '$firebaseStorage','$location',
        function($scope, SingleProfilo, InsertEventoService, Auth, Users, $firebaseAuth, $firebaseStorage, $location ) {

        $scope.currentId = Auth.$getAuth().uid;

        $scope.datiProfiloCV = {};
        $scope.datiProfiloCV = SingleProfilo.getSingleProfilo(Auth.$getAuth().uid);

            $scope.tappa={};
            var ctrl = this;
            $scope.fileToUpload = null;
            $scope.imgPath= "";

            //initialize the function that will be called when a new file will be specified by the user
            ctrl.onChange = function onChange(fileList) {
                $scope.fileToUpload = fileList[0];
            };

            var prof_corrente = Auth.$getAuth().uid;




            $scope.registraTappa = function() {
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

                        InsertEventoService.insertNewTappa($scope.tappa.nome_tappa, $scope.tappa.descrizione_tappa, prof_corrente, $scope.imgPath);


                    });
                    uploadTask.$error(function (error) {
                        $scope.dati.error = error + " - L'evento verrà creato senza un'immagine!";
                        InsertEventoService.insertNewTappa($scope.tappa.nome_tappa, $scope.tappa.descrizione_tappa, prof_corrente, $scope.imgPath);


                    });

                }
                else {
                    InsertEventoService.insertNewTappa($scope.tappa.nome_tappa, $scope.tappa.descrizione_tappa, prof_corrente, $scope.imgPath);

                }

                $('#ModalTappa').modal('hide');
                $('#confermaTappa').modal('show');
            };



            $scope.logout = function() {
                Users.registerLogout($scope.currentId);
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

        $scope.scompari = function () {


        }

    }]);