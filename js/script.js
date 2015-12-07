$(document).ready(function() {
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


  var render = function( element ) {

    var nestKey = element.attr("value");
    d3.json("sampledata/agentData.json", function (error, data) {
    data = JSON.stringify(data);
    data = data.replace(/none/g, "others");
    data = JSON.parse(data);
    console.log(data);

    d3.select("#donut").html="";
    d3.select(".color-legend").html="";

    var nestedData = d3.nest()
                      .key(function(d) { return d[nestKey]; })
                      .entries(data);

      color.domain(nestedData.map(function (data) {
          return data.key;
      }));
      Donut3D.draw("donut", agentData(), 200, 200, 170, 140, 30, 0.4);

      colorLegendG.call(colorLegend);

      function agentData() {
        return nestedData.map(function(d, i){
          return {label:d.key, value:d.values.length, color:color.range()[i]};
        });
      }
    })
  };

  $('.criteriaPane').on("click", function(e) {
    render( $(this) );
    $('.criteriaPane').attr("class", "btn btn-default criteriaPane");
    $('.criteriaPane').addClass("noBorder");
    $(this).addClass("withBorder");
    e.preventDefault();
  });

  var i=0;
  $('.tab2').on("click", function(e) {
    if(i==0) {
      $("#browserShare").addClass("withBorder");
      render( $("#browserShare"));
      i++;
    }
  });
});
