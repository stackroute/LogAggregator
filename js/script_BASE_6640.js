$(document).ready(function() {
  var svg = d3.select(".wrap").append("svg").attr("width",500).attr("height",400);
  var g = svg.append("g").attr("id","donut");
  color = d3.scale.category10();

  var colorLegendG = svg.append("g")
              .attr("class", "color-legend")
              .attr("transform", "translate(400, 60)")
              .style("font-size", "15px");

  var colorLegend = d3.legend.color()
                  .scale(color)
                  .shapePadding(10)
                  .shapeWidth(15)
                  .shapeHeight(15)
                  .labelOffset(4)
                  .orient("vertical");

  var nestedData, data;


    var render = function( element ) {
      console.log("hi this is working");
      var nestKey = element.attr("value");
      d3.json("sampledata/agentData.json", function (error, data) {

        d3.select("#donut").html="";
        d3.select(".color-legend").html="";
        console.log(nestKey);

        nestedData = d3.nest()
                        .key(function(d) { return d[nestKey]; })
                        .entries(data);

        console.log(nestedData);

        color.domain(nestedData.map(function (data) {
            return data.key;
        }));
        Donut3D.draw("donut", randomData(), 200, 200, 170, 140, 30, 0.4);
        Donut3D.transition("salesDonut", randomData(), 130, 100, 30, 0.4);

        console.log(colorLegend);
        colorLegendG.call(colorLegend);

        function randomData(){
          return nestedData.map(function(d, i){
            return {label:d.key, value:d.values.length, color:color.range()[i]};
          });
        }
      })
    };
    
    $('.criteriaPane').on("click", function(e) {
      // debugger

      render( $(this) );
      $('.criteriaPane').css("border-left","0");
      $(this).css("border-left", "4px solid blue");
      e.preventDefault();
    });

    var i=0;
    $('.tab2').on("click", function(e) {
      if(i==0) {
        $("#browserShare").css("border-left", "4px solid blue");
        render( $("#browserShare"));
        i++;
      }
    });
});
