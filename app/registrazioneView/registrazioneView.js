/**
 * Created by Administrator on 26/05/2017.
 */
'use strict';

angular.module('myApp.registrazioneView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/registrazioneView', {
            templateUrl: 'registrazioneView/registrazioneView.html',
            controller: 'RegistrazioneCtrl'
        });
    }])



.controller('RegistrazioneCtrl', ['$scope', '$rootScope', 'Auth', 'Users', '$location', '$firebaseStorage',
    function($scope, $rootScope, Auth, Users, $location, $firebaseStorage) {

    $scope.user={};
    //set the variable that is used in the main template to show the active button
    $rootScope.dati.currentView = "home";
    $scope.dati.feedback = "";
    var ctrl = this;
    $scope.fileToUpload = null;
    $scope.imgPath= "";
    var currentId;


        //initialize the function that will be called when a new file will be specified by the user
        ctrl.onChange = function onChange(fileList) {
            $scope.fileToUpload = fileList[0];
        };


        $scope.signUp = function() {
        //check if the second password is equal to the first one
        if ($scope.user.password!== '' && $scope.user.password === $scope.user.password2) {
            //create a new user with specified email and password
            Auth.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
                .then(function (firebaseUser) {
                    //after creating the user, we will perform a login and then the new information will be saved in the database
                    //(the reason is that we cannot write in the database if we are not logged in ... it is not the best way of doing it but it is ok for our prototype)
                    Auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(internalFirebaseUser) {
                        var userId = internalFirebaseUser.uid;

                        if ($scope.fileToUpload !== null) {
                            //get the name of the file
                            var fileName = $scope.fileToUpload.name;
                            //specify the path in which the file should be saved on firebase
                            var storageRef = firebase.storage().ref("profiliImg/" + fileName);
                            $scope.storage = $firebaseStorage(storageRef);
                            var uploadTask = $scope.storage.$put($scope.fileToUpload);
                            uploadTask.$complete(function (snapshot) {
                                $scope.imgPath = snapshot.downloadURL;
                                Users.registerNewUserInfo(userId, $scope.user.email, $scope.user.nome, $scope.user.cognome, $scope.user.username, $scope.user.tipo, $scope.imgPath);
                                Users.registerLogin(userId, $scope.user.email);
                                // login successful: redirect to the profilo


                                $('#conferma').modal('show');

                            });
                            uploadTask.$error(function (error) {
                                $scope.dati.error = error + " - Il profilo verrà creato senza un'immagine!";
                                Users.registerNewUserInfo(userId, $scope.user.email, $scope.user.nome, $scope.user.cognome, $scope.user.username, $scope.user.tipo, $scope.imgPath);
                                Users.registerLogin(userId, $scope.user.email);
                                // login successful: redirect to the profilo



                                $('#conferma').modal('show');

                            });

                        }
                        else {
                            //do not add the image
                            Users.registerNewUserInfo(userId, $scope.user.email, $scope.user.nome, $scope.user.cognome, $scope.user.username, $scope.user.tipo, $scope.imgPath);
                            Users.registerLogin(userId, $scope.user.email);
                            // login successful: redirect to the profilo

                            $('#conferma').modal('show');


                        }


                    }).catch(function(error) {
                        $scope.error = error;
                        console.log(error.message);
                    });
                }).catch(function (error) {
                $scope.error = error;
                console.log(error.message);
            });
        }

            currentId = Auth.$getAuth().uid;

    };



    $scope.returnToLogin = function() {

        $location.path("/loginView");

    };



}]);

