
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 340 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale()
    .range([0, width]);


var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(15);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


      /* Loading DATA JSON ////////////////////////////////////////////////////////////////*/


    $('.months a').on('click',function(e){
      var dropdown=$(this);
      d3.json("../json/day_traffic_parse.json",function(json){

        var month_selected;
        var data=json;

      month_selected=dropdown.attr('value');
      var dataNest = d3.nest()
        .key(function(d) {return parseInt(String(d.date).substring(5,7));})
        .entries(data);
      var newdata;

      for(i in dataNest)
      {
          if(dataNest[i].key==month_selected){
                  newdata=dataNest[i].values;
          }
      }
      data=newdata;

      var months = [ "January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December" ];
      $(".dropdown button").html(months[parseInt(month_selected)-1]+"  <span class='caret'></span>");
      var check=0;

    if(!data){
      d3.select('.traffic')
          .html('');
    d3.select('.traffic')
          .append('no_data')
          .html('No Data Available for Selected Month');
    }
    else{
      var month_days;
      if(month_selected==1 || month_selected==3 || month_selected==5 || month_selected==7 ||
        month_selected==8 || month_selected==10 || month_selected==12){
          month_days=31;
        }
      else{
        month_days=30;
      }
      if(month_selected==2){
        month_days=28;
      }
      var parts = newdata[0].date.split('-');
      var year=parts[0];
      var month=parts[1];
      var flag;
      var date_created;
      for(i=0;i<month_days;i++){
        for(j=0;j<newdata.length;j++){
          flag=0;
          if(i<10){
            date_created=year+'-'+ month +'-'+ '0' + (i+1);
          }else{
            date_created=year+'-'+ month +'-'+ (i+1);
          }
          if(date_created==newdata[j].date){
            flag=1;
          }
        }
        if(flag==0){
          var obj={};
          obj.date=date_created;
          obj.GET=0;
          obj.POST=0;
          obj.OPTIONS=0;
          obj.HEAD=0;
          data.push(obj);
        }
      }
      console.log(data);
      data.forEach(function(d) {
             var parts = (d.date).split('-');
             d.date= new Date(parts[0], parts[1]-1, parts[2]);
          //  d.date = new Date(d.date);
 });

     var line = d3.svg.line()
                  .interpolate("basis")
                  .x(function(d) { return x(d.date); })
                  .y(function(d) { return y(d.count); });

      d3.select('g')
        .html('');

        d3.select('.traffic')
          .html('');

        var svg = d3.select(".traffic")
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));


        data.sort(function (a, b) {
            return d3.ascending(a.date, b.date);
        });

        var methods = color.domain().map(function(name) {
    return {
      REQUEST: name,
      values: data.map(function(d) {
        return {date: d.date, count: +d[name]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([
    d3.min(methods, function(c) { return d3.min(c.values, function(v) { return v.count; }); }),
    d3.max(methods, function(c) { return d3.max(c.values, function(v) { return v.count; }); })
  ]);
        svg.append("g")
            .attr("class","x axis")
            .attr("transform","translate(0,"+ height +")")
            .call(xAxis)
            .selectAll("text")
            .attr("transform","rotate(-60)")
            .attr("dx","-.8em")
            .attr("dy",".25em")
            .style("text-anchor","end")

        svg.append("g")
            .attr("class","y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Request Rate Traffic");

      var city = svg.selectAll(".city")
                    .data(methods)
                    .enter()
                    .append("g")
                    .attr("class", "city");

    city.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return color(d.REQUEST); });

    var legend = svg.selectAll(".legend")
                .data(color.domain().slice())
                .enter()
                .append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.data(methods);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d.REQUEST; });

    }
    e.preventDefault();
  });
    });
