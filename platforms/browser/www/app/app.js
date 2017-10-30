
var app = angular.module('AngularAuthApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "app/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "app/views/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "app/views/signup.html"
    });

    $routeProvider.when("/orders", {
        controller: "ordersController",
        templateUrl: "/app/views/orders.html"
    });

    $routeProvider.when("/refresh", {
        controller: "refreshController",
        templateUrl: "/app/views/refresh.html"
    });

    $routeProvider.when("/tokens", {
        controller: "tokensManagerController",
        templateUrl: "/app/views/tokens.html"
    });

    $routeProvider.when("/associate", {
        controller: "associateController",
        templateUrl: "/app/views/associate.html"
    });
    

    $routeProvider.when("/SelectBillFields", {
        controller: "SelectBillFieldsController",
        templateUrl: "/app/views/SelectBillFields.html"
    });


    $routeProvider.when("/SelectBillFieldsNew", {
        controller: "SelectBillFieldsNewController",
        templateUrl: "/app/views/SelectBillFieldsNew.html"
    });

    $routeProvider.when("/InvoiceDetails", {
        controller: "InvoiceDetailsController",
        templateUrl: "/app/views/InvoiceDetails.html"
    });


    $routeProvider.when("/CompanyDetails", {
        controller: "CompanyDetailsController",
        templateUrl: "/app/views/CompanyDetails.html"
    });


    $routeProvider.when("/invoice", {
        controller: "invoiceController",
        templateUrl: "/app/views/invoice.html"
    });


    $routeProvider.when("/SelectFields", {
        controller: "SelectFieldsController",
        templateUrl: "/app/views/SelectFields.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });

});

//var serviceBase = 'http://localhost:26264/';
var serviceBase = 'http://shivaminventoryapi.azurewebsites.net/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


app.directive('datePicker', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            element.datepicker().datepicker('setDate', new Date());;

        }
    };
});
