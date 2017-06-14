'use strict';

angular.module('myApp.evento.eventoService', [])

    .factory('Evento', function($firebaseArray) {
        var eventoService = {
            getData: function () {
                var ref = firebase.database().ref().child("eventi");
                // download the data into a local object
                return $firebaseArray(ref);
            }
        };
        return eventoService;
    });
