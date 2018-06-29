
(function (angular) {
    'use strict';
    var theModule = angular.module('mainApp', ['ngRoute', 'smart-table']);
    theModule.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/indexModule/index.html',
                controller: 'indexCtrl'
            });
    });
})(window.angular);