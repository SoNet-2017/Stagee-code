'use strict';

angular.module('myApp.profilo.profiloService', [])

    .factory('Profilo', function($firebaseArray) {
        var profiloService = {
            getData: function () {
                var ref = firebase.database().ref().child("profili");
                // download the data into a local object
                return $firebaseArray(ref);
            }
        };
        return profiloService;
    });
