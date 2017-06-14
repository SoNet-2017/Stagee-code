'use strict';

angular.module('myApp.evento.singlePizzaService', [])

    .factory('SingleEvento', function($firebaseObject) {
        var singleEventoService = {
            getSingleEvento: function (eventoId) {
                var ref = firebase.database().ref().child("eventi").child(eventoId);
                // download the data into a local object
                return $firebaseObject(ref);
            }
        };
        return singleEventoService;
    });
