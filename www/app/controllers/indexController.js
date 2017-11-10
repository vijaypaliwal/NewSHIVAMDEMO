'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }


    $scope.authentication = authService.authentication;

    $scope.authentication.isAuth = true;


    console.log($scope.authentication)

    
    $scope.ScanData = function (ID) {
        var scanner = cordova.plugins.barcodeScanner;

        scanner.scan(function (result) {

            $(ID).val(result.text);
            $(ID).trigger("input");


        }, function (error) {
          alert("Scanning failed: ", error);
        });
    }



}]);