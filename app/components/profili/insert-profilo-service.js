'use strict';

//The service implemented in this module will save information about pizzas
angular.module('myApp.profilo.insertProfiloService', [])

    .factory('InsertProfiloService', function($firebaseArray) {
        var NewProfiloService = {
            insertNewProfilo: function (cognome, email, id_profilo, img_descr, img_profilo, nome, prof_pass, prof_user) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("profili");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    cognome : cognome,
                    email : email,
                    id_profilo : id_profilo,
                    img_descr : img_descr,
                    img_profilo : img_profilo,
                    nome : nome,
                    prof_pass : prof_pass,
                    prof_user : prof_user
                });
            },
            updateEvento: function (id_profilo) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("profili").child(id_profilo);
                // create a synchronized array
                ref.update({
                    id: id_profilo
                });
            }
        };
        return NewProfiloService;
    });
