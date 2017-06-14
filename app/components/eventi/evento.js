'use strict';

angular.module('myApp.evento', [
    'myApp.evento.eventoService',
    'myApp.evento.singleEventoService',
    'myApp.evento.insertEventoService'
])

    .value('version', '0.1');
