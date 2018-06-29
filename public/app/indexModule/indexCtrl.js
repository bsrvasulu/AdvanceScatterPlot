
(function (angular) {
    'use strict';
    angular.module('mainApp').controller('indexCtrl', [
        '$scope', '$rootScope', '$compile', 'indexService', '$log',
        '$timeout',
        function ($scope, $rootScope, $compile, indexService, $log, $timeout) {
            $scope.title = 'Advance Scatter Plot';
            $scope.buildingRow = [];
            $scope.displayedDataCollection = [];
            $scope.dataCollection = [];
            $scope.currentViewDisplayDataCollection = [];
            $scope.currentViewDataCollection = [];
            $scope.itemsByPage = 10;
            $scope.numberOfRecords = [10, 20, 50];
            $scope.firstLine = false;
            $scope.x = [];
            $scope.y = [];
            $scope.markName = '';

            $scope.displayHTMLTable = function(results){
                $scope.x.splice(0, $scope.x.length);
                $scope.y.splice(0, $scope.y.length);
                var data = results.data;
                for(var i=1;i<data.length;i++){
                    var datapoint = {};

                    var row = data[i];
                    var cells = row.join(",").split(",");
                    if(cells.length < 7)
                        continue;
                    datapoint.cassette = cells[0];
                    datapoint['disc'] = cells[1];
                    datapoint['side'] = cells[2];
                    datapoint['radius'] = cells[3];
                    datapoint['angle'] = cells[4];
                    datapoint['x'] = cells[5];
                    datapoint['y'] = cells[6];
                    datapoint.range = true;
                    $scope.x.push(cells[4]);
                    $scope.y.push(cells[3]);
                    $scope.dataCollection.push(datapoint);
                    $scope.currentViewDataCollection.push(datapoint);
                }
                $scope.markName = $scope.dataCollection[0].cassette;
                $scope.$apply();
                $scope.drawScatterPlot();
            };

            $scope.drawScatterPlot = function(){
                var plotConfig = {
                    //width: 1200,
                    height: 740,
                    //markName: $scope.markName,
                    //markerSize: 2,
                    //markerColor: 'rgb(231, 99, 128)',
                    xAxisTitle: 'angle',
                    yAxisTitle: 'radius',
                    xAxisRange: [ 0.0, 360.0 ],
                    yAxisRange: [11000, 49000],
                    graphTitle: 'Defects Data',
                    boundX: [0.0, 360.0],
                    boundY: [0.0, 49000.0]

                };
                var plotData = {
                    trace1: {
                        x: $scope.x,
                        y: $scope.y,
                        markerSize: 2,
                        markerName: $scope.markName
                        //markerColor: 'rgb(231, 99, 128)'
                    }
                };
                scatterAdvancePlot.drawPlot('scatterPlotDiv', plotData, plotConfig );
                scatterAdvancePlot.relayoutEvent('scatterPlotDiv', function(eventdata){
                    //alert(eventdata['xaxis.range[0]']);
                    if( eventdata['xaxis.range[0]'] !== undefined && ($scope.dataCollection.length > 0)) {
                        //alert(JSON.stringify($scope.dataCollection.length));
                        $scope.currentViewDataCollection.splice(0, $scope.currentViewDataCollection.length);
                        for (var i = 0; i < $scope.dataCollection.length; i++) {
                            if( $scope.dataCollection[i].angle > eventdata['xaxis.range[0]'] && $scope.dataCollection[i].angle < eventdata['xaxis.range[1]'] &&
                                $scope.dataCollection[i].radius > eventdata['yaxis.range[0]'] && $scope.dataCollection[i].radius < eventdata['yaxis.range[1]']) {
                                var datapoint = {};
                                datapoint['radius'] = $scope.dataCollection[i].radius;
                                datapoint['angle'] = $scope.dataCollection[i].angle;
                                $scope.currentViewDataCollection.push(datapoint);
                            }
                        }
                    }
                    //alert(JSON.stringify(eventdata));
                    // alert( 'ZOOM!' + '\n\n' +
                    //     'Event data:' + '\n' +
                    //     JSON.stringify(eventdata) + '\n\n' +
                    //     'x-axis start:' + eventdata['xaxis.range[0]'] + '\n' +
                    //     'x-axis end:' + eventdata['xaxis.range[1]'] );
                    $scope.$apply();
                });
            };

            $('#submit-file').on("click",function(e){
                    e.preventDefault();
                    $scope.dataCollection.splice(0, $scope.dataCollection.length);
                    $('#files').parse({
                        config: {
                            delimiter: "auto",
                            complete: $scope.displayHTMLTable,
                        },
                        before: function(file, inputElem)
                        {
                            //console.log("Parsing file...", file);
                            // $scope.firstLine = true;
                        },
                        error: function(err, file)
                        {
                            //console.log("ERROR:", err, file);
                        },
                        complete: function()
                        {
                            //console.log("Done with all files");
                        }
                    });
                });


            // $timeout(function () {
            //     $scope.graphDiv = document.getElementById('scatterPlotDiv');
            // }, 200);
        }
    ]);
})(window.angular);