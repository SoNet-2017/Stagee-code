'use strict';

//The service implemented in this module will save information about pizzas
angular.module('myApp.profilo.insertProfiloService', [])

    .factory('Users', function($firebaseArray, $firebaseObject) {
        return {
            registerLogin: function (id_profilo, email) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("profili").child(id_profilo);
                // create a synchronized array
                ref.update({
                    email: email,
                    logged: true
                });
            },
            registerLogout: function (id_profilo)
            {
                var ref = firebase.database().ref().child("profili").child(id_profilo);
                // create a synchronized array
                ref.update({
                    logged: false
                });
            },
            registerNewUserInfo: function (id_profilo, email, nome, cognome, tipo, imgPath) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("profili").child(id_profilo);
                // create a synchronized array
                ref.set({
                    id_profilo: id_profilo,
                    email : email,
                    nome: nome,
                    cognome : cognome,
                    tipo: tipo,
                    imgPath: imgPath
                });
            },
            getCal: function (id_profilo) {
                var ref = firebase.database().ref().child("profili").child(id_profilo).child("calendario");
                // download the data into a local object
                return $firebaseObject(ref);
            },
            getTappa: function (id_profilo) {
                var ref = firebase.database().ref().child("profili").child(id_profilo).child("tappe");
                // download the data into a local object
                return $firebaseObject(ref);
            }
        };
    });
