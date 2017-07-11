'use strict';

angular.module('myApp.evento.insertEventoService', [])

    .factory('InsertEventoService', function($firebaseArray) {
            return {
                insertNewEvento: function (address, nome_evento, nome_organizzatore, descrizione, imgPath, data, ora_inizio, ora_fine, categoria) {
                var ref = firebase.database().ref().child("eventi").push();
                var key = ref.key;
                ref.set({
                    eventoId: key,
                    address: address,
                    nome_evento: nome_evento,
                    nome_organizzatore: nome_organizzatore,
                    descrizione: descrizione,
                    img_url: imgPath,
                    img_alt: nome_evento+" "+nome_organizzatore,
                    data: data,
                    ora_inizio: ora_inizio,
                    ora_fine: ora_fine,
                    categoria: categoria
                });

            },
                addUserToEvento: function (evento_corrente, nome_corrente, cognome_corrente, profilo_corrente,
                                           nomeEvento, dataEvento, descrizioneEvento, imgEvento, categoriaEvento) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("eventi").child(evento_corrente).child("lista").child(profilo_corrente);
                    ref.set(
                        {
                            partecipante: nome_corrente+" "+cognome_corrente,

                        });
                var ref2 = firebase.database().ref().child("profili").child(profilo_corrente).child("calendario").child(evento_corrente);
                    ref2.set(
                        {
                            id_evento: evento_corrente,
                            nomeEvento: nomeEvento,
                            dataEvento: dataEvento,
                            descrizioneEvento: descrizioneEvento,
                            imgEvento: imgEvento,
                            categoriaEvento: categoriaEvento
                        });

            },
                addValutazioneToEvento: function (punteggio, evento_corrente, commento, profilo_corrente){
                    var ref = firebase.database().ref().child("eventi").child(evento_corrente).child("valutazioni").child(profilo_corrente);
                    ref.set(
                        {
                            punteggio: punteggio,
                            commento: commento

                        });
                    var ref2 = firebase.database().ref().child("profili").child(profilo_corrente).child("calendario").child(evento_corrente);
                    ref2.update(
                        {
                            valutato: "true"
                        });


                }


        };

    });
