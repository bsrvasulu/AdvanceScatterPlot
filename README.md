# AdvanceScatterPlot
plotly based scatter plot which draws plot with in bound axes.

## Steps to integrate:
* Add Java script files to the project

        <p>
        <!-- Plotly.js -->
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script><br/>
        <script src="/dist/js/scatterPlot.js"></script>
        </p>

* Add div tag

        <div id="myPlot"></div>

* Add following java script code to your page

      var plotConfig = {
          //width: 1200,
          //height: 740,
          xAxisTitle: 'X',
          yAxisTitle: 'Y',
          xAxisRange: [ 0, 360 ],
          yAxisRange: [0, 500],
          graphTitle: 'Scatter Data',
          boundX: [0.0, 360.0],
          boundY: [0.0, 500.0]
      };
      var plotData = {
        trace1: {
          x: [2, 29, 52, 127, 252, 311],
          y: [94, 75, 252, 504, 307, 49],
          markerSize: 6,
          markerName: 'trace A'
          //markerColor: 'rgb(231, 99, 128)'
        },
        trace2: {
          x: [12, 97, 125, 254, 304, 340],
          y: [94, 75, 252, 504, 307, 49],
          markerSize: 6,
          markerName: 'trace B'
          //markerColor: 'rgb(231, 99, 128)'
        }
      };
      scatterAdvancePlot.drawPlot('myPlot', plotData, plotConfig );

Java script objects are self-explanatory. 
Draw plot between bound axes.

[Sample project](https://codepen.io/bsrvasulu/pen/GGBzVo)
