/**
 * Created by Administrator on 05/06/2017.
 */
angular.module('myApp.filtriView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/filtriView', {
            templateUrl: 'filtriView/filtriView.html',
            controller: 'FiltriCtrl'




// Close the dropdown menu if the user clicks outside of it

        })
    }])

    .controller('FiltriCtrl', ['$scope',function($scope) {

        //$('#myModal').modal('show');
    }]);
