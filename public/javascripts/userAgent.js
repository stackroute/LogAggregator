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
    $.get("json/userAgent/"+$('#yearDropDown')[0].getAttribute('value')+"/"+$('#monthDropDown')[0].getAttribute('value'), function (data, status) {
    console.log(data);
    if(data.length==0) {
      console.log("no data recieved");
      d3.select("#donut").html("");
      d3.select(".color-legend").html("");
      return;
    }
    data = JSON.stringify(data);
    data = data.replace(/none/g, "others");
    data = JSON.parse(data);

    d3.select("#donut").html="";
    d3.select(".color-legend").html="";

    if(nestKey == "browser") {
      domainNames = ["Opera", "Google Chrome", "Mozilla Firefox", "Internet Explorer", "Microsoft Edge", "Safari"];
    } else if(nestKey == "os") {
      domainNames = ["Windows 7", "Macintosh", "Windows 10", "Windows 8", "Windows 8.1"]
    } else {
      return;
    }

    var nestedData = d3.nest()
                      .key(function(d) { return d[nestKey]; })
                      .entries(data);

      color.domain(domainNames);
      Donut3D.draw("donut", agentData(), 200, 200, 170, 140, 30, 0.4);

      colorLegendG.call(colorLegend);

      function agentData() {
        return nestedData.map(function(d, i){
          return {label:d.key, value:d.values.length, color:color(d.key)};
        });
      }
    })
  };
  var thisYear = (new Date).getFullYear();
  $('#yearDropDown').attr('value', thisYear)
                    .html(thisYear+" <span class='caret'></span>")

  var string = "";
  for(var k=0; k<config.noOfYears; k++) {
    string = string + "<li><a href='#' value='"+thisYear+"'>"+thisYear+"</a></li> ";
    thisYear = thisYear - 1;
  }
  $('#agentAnalytics .filters .yearSelect').html(string);

  $('.yearSelect a').on("click", function(e) {
    $('#yearDropDown').html(this.getAttribute('value') +" <span class='caret'></span>")
                      .attr('value', this.getAttribute('value'));
    $('#monthDropDown').html('month <span class="caret"></span>')
                      .attr('value', '0');
    render($('.withBorder'));
    e.preventDefault();
  });

  $('.monthSelect a').on("click", function(e) {
    $('#monthDropDown').html(this.innerHTML +" <span class='caret'></span>")
                      .attr('value', this.getAttribute('value'));
    render($('.withBorder'));
  });

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
