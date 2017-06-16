'use strict';

// Initialize the Firebase SDK
var config = {
    apiKey: "AIzaSyAsqzlBppXz2I0_xH6EcftlWgfyNRMBnGs",
    authDomain: "stagee-39da3.firebaseapp.com",
    databaseURL: "https://stagee-39da3.firebaseio.com",
    projectId: "stagee-39da3",
    storageBucket: "stagee-39da3.appspot.com",
    messagingSenderId: "1078854263714"
};
firebase.initializeApp(config);

// Declare app level module which depends on views, and components
angular.module('myApp', [
    "firebase",
    "xeditable",
  'ngMap',
  'ngRoute',
  'myApp.profiloView',
    'myApp.evento',
    'myApp.loginView',
    'myApp.paginizialeView',
    'myApp.registrazioneView',
    'myApp.bachecaView',
    'myApp.eventoView',
    'myApp.authentication',
    'myApp.profilo'

   // 'myApp.filtriView'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/paginizialeView'});//cos è?//
}])
    .run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/paginizialeView");
        }
    });
}], function (editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    })

.controller('MainCtrl', ['$scope', '$rootScope', '$firebaseAuth', function($scope, $rootScope, $firebaseAuth) {
    //this controller only declares a function to get information about the user status (logged in / out)
    //it is used to show menu buttons only when the user is logged

    //set the variable that is used in the main template to show the active button
    $rootScope.dati = {};
    $rootScope.dati.currentView = 'home';
    $scope.isLogged = function()
    {
        if ($firebaseAuth().$getAuth())
            return true;
        else
            return false;
    }
}]);

