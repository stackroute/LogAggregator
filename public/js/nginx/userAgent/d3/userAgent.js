  var svg = d3.select(".wrap").append("div").attr("class", "well").append("svg").attr("width",600).attr("height",400);
  var g = svg.append("g").attr("id","donut");
  color = d3.scale.category10();

  var colorLegendG = svg.append("g")
              .attr("class", "color-legend")
              .attr("transform", "translate(470, 120)")
              .style("font-size", "16px");

  var colorLegend = d3.legend.color()
                  .scale(color)
                  .shapePadding(10)
                  .shapeWidth(18)
                  .shapeHeight(18)
                  .labelOffset(4)
                  .orient("vertical");
  $(".wrap .well").prepend("<nodata></nodata>")

  var render = function(nestKey, data) {
    d3.select(".wrap .well nodata").html("");
    if($.isEmptyObject(data)) {
      d3.select("#donut").html("");
      d3.select(".color-legend").html("");
      d3.select(".wrap .well nodata").html("No data Available")
      return;
    }

    d3.select("#donut").html="";
    d3.select(".color-legend").html="";
    var domainNames = [];

    for(var k=0,filterLen = config.userAgentFilters[nestKey].length; k < filterLen; k++) {
      domainNames.push(config.userAgentFilters[nestKey][k].names)
    }

      color.domain(domainNames);
      Donut3D.draw("donut", agentData(), 200, 200, 170, 140, 30, 0.4);

      colorLegendG.call(colorLegend);

      function agentData() {
        var result = [];
        var keys = Object.keys(data);
        for(var i=0, len = keys.length; i < len; i++) {
          result.push({label:keys[i], value:data[keys[i]], color:color(keys[i])})
        }
        return result;
      }
    };
