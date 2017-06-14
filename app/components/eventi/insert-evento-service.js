'use strict';

//The service implemented in this module will save information about pizzas
angular.module('myApp.evento.insertEventoService', [])

    .factory('InsertEventoService', function($firebaseArray) {
        var NewEventoService = {
            insertNewEvento: function (address, nome_evento, nome_organizzatore, imgPath, data, ora_inizio, ora_fine) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("eventi");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    address: address,
                    nome_evento: nome_evento,
                    nome_organizzatore: nome_organizzatore,
                    img_url: imgPath,
                    img_alt: nome_evento+" "+nome_organizzatore,
                    data: data,
                    ora_inizio: ora_inizio,
                    ora_fine: ora_fine
                });
            },
            updateEvento: function (eventoId) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("eventi").child(eventoId);
                // create a synchronized array
                ref.update({
                    id: eventoId
                });
            }
        };
        return NewEventoService;
    });
