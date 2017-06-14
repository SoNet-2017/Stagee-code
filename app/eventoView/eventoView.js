/**
 * Created by Administrator on 09/06/2017.
 */
angular.module('myApp.eventoView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/eventoView', {
            templateUrl: 'eventoView/eventoView.html',
            controller: 'EventoCtrl',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]

            }



// Close the dropdown menu if the user clicks outside of it

        })
    }])
    .controller('EventoCtrl',  function($scope) {
    });