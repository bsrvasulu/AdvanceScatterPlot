
(function (angular) {
    'use strict';
    angular.module('mainApp').controller('indexCtrl', [
        '$scope', '$rootScope', '$compile', 'indexService', '$log',
        '$timeout',
        function ($scope, $rootScope, $compile, indexService, $log, $timeout) {
            $scope.title = 'Hotspot Floor Plan';

            // $timeout(function () {
            //     $scope.graphDiv = document.getElementById('scatterPlotDiv');
            // }, 200);
        }
    ]);
})(window.angular);