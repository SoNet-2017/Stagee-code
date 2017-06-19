'use strict';

//The service implemented in this module will save information about pizzas
angular.module('myApp.profilo.insertProfiloService', [])

    .factory('Users', function($firebaseArray) {
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
            registerNewUserInfo: function (id_profilo, email, nome, cognome, prof_user, tipo, imgPath) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("profili").child(id_profilo);
                // create a synchronized array
                ref.set({
                    id_profilo: id_profilo,
                    email : email,
                    nome: nome,
                    cognome : cognome,
                    prof_user : prof_user,
                    tipo: tipo,
                    imgPath: imgPath
                });
            }
        };
    });
