/**
 * Created by Administrator on 09/06/2017.
 */
angular.module('myApp.CvView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/CvView', {
            templateUrl: 'CvView/CvView.html',
            controller: 'CvCtrl',
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



    .controller('CvCtrl', ['$scope', 'SingleProfilo', 'Auth', 'Users', '$firebaseAuth', '$location',
        function($scope, SingleProfilo, Auth, Users, $firebaseAuth, $location ) {

        $scope.currentId = Auth.$getAuth().uid;

        $scope.datiProfiloCV = {};
        $scope.datiProfiloCV = SingleProfilo.getSingleProfilo(Auth.$getAuth().uid);


            $scope.logout = function() {
                Users.registerLogout($scope.currentId);
                //sign out
                $firebaseAuth().$signOut();
                $firebaseAuth().$onAuthStateChanged(function (firebaseUser) {
                    if (firebaseUser) {
                        console.log("User is yet signed in as:", firebaseUser.uid);
                    } else {
                        $location.path("/paginizialeView");
                    }
                });
            }

        $scope.dati.area = 'areaGeografica';
        $scope.redirectToAreageografica = function() {

            $scope.dati.area = 'areaGeografica';


        };

        $scope.redirectToAmbito= function() {

            $scope.dati.area = 'ambito';

        };

        $scope.isAreaGeografica = function()
        {
            if ($scope.dati.area == 'areaGeografica')
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        $scope.isAmbito = function()
        {
            if ($scope.dati.area == 'ambito')
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }]);