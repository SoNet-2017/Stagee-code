'use strict';

angular.module('myApp.profilo.singleProfiloService', [])

    .factory('SingleProfilo', function($firebaseObject) {
        var singleProfiloService = {
            getSingleProfilo: function (id_profilo) {
                var ref = firebase.database().ref().child("profili").child(id_profilo);
                // download the data into a local object
                return $firebaseObject(ref);
            }
        };
        return singleProfiloService;
    });
