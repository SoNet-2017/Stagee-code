'use strict';

angular.module('myApp.profilo', [
    'myApp.profilo.profiloService',
    'myApp.profilo.singleProfiloService',
    'myApp.profilo.insertProfiloService'
])

    .value('version', '0.1');
