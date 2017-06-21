'use strict';

angular.module('myApp.evento.insertEventoService', [])

    .factory('InsertEventoService', function($firebaseArray) {
            return {
                insertNewEvento: function (eventoId, address, nome_evento, nome_organizzatore, descrizione, imgPath, data, ora_inizio, ora_fine, lista) {
                var ref = firebase.database().ref().child("eventi").child(eventoId);
                // create a synchronized array
                ref.set({
                    eventoId: eventoId,
                    address: address,
                    nome_evento: nome_evento,
                    nome_organizzatore: nome_organizzatore,
                    descrizione: descrizione,
                    img_url: imgPath,
                    img_alt: nome_evento+" "+nome_organizzatore,
                    data: data,
                    ora_inizio: ora_inizio,
                    ora_fine: ora_fine,
                    lista: lista
                });

            },
                addUserToEvento: function (evento_corrente, nome_corrente, cognome_corrente, profilo_corrente) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("eventi").child(evento_corrente).child("lista");
                    ref.push(
                        {
                            partecipante: nome_corrente+" "+cognome_corrente,
                            id_profilo: profilo_corrente

                        });

            }
        };

    });
