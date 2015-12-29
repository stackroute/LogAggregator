
var year=(new Date()).getFullYear();
var years=[];
for(i=0;i<config.noOfYears;i++){
  var obj={};
  obj['year']=year-i;
  years.push(obj);
}

template = $.trim( $('#blogTemplate').html() ),
frag = '';
$.each( years, function( index, obj ) {
  frag +=
  template.replace( /{{Year}}/ig, obj.year )
});
$('.year').append(frag);

var margin = {top: 20, right: 20, bottom: 30, left: 50},
width = 800 - margin.left - margin.right,
height = 340 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale()
.range([0, width]);


var y = d3.scale.linear()
.range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom");


var yAxis = d3.svg.axis()
.scale(y)
.orient("left");

// $('.month_text button').attr("disabled","yes");
// $('#clear_filters').attr("disabled","yes");

function numberOfDays(year,month){
  var d=new Date(year,month,0);
  return d.getDate();
}
/**** Year Change Traffic ***********************************************************************/

var yearPlotting=function(year_selected){
//  d3.json("../json/trafficRateDayWise.json",function(json){

    $.get("json/trafficRate/"+year_selected+"/0", function (json, status) {

    var dates=json[0];
    var tempdata=json[1];

    var temp=[];
    var keys=Object.keys(tempdata);
    for(i=0;i<keys.length;i++)
    {
      temp.push(tempdata[keys[i]]);
    }
    //console.log(temp);
    //data=temp;
    // var dataNest = d3.nest()
    // .key(function(d) {return parseInt(String(d.date).substring(0,5));})
    // .entries(data);
    // var newdata;
    //
    // for(i in dataNest)
    // {
    //   if(dataNest[i].key==year_selected){
    //     newdata=dataNest[i].values;
    //   }
    // }
    // data=newdata;
    // // console.log(json);
    // // console.log(data);
    newdata=temp;
    $(".dropdown.year_text button").html(year_selected+"  <span class='caret'></span>");
    var check=0;

    if(newdata.length==0){
      d3.select('.traffic')
      .html('');
      d3.select('.traffic')
      .append('noData')
      .html('No Data Available for Selected Year');
      $('.month_text button').html("Month"+" <span class='caret'></span>");
      $('.month_text button').attr("disabled","yes");
      if(year_selected==year){
      $('#clear_filters').attr("disabled","yes")
                         .addClass('disableClick');
      }
      else{
        $('#clear_filters').removeAttr("disabled")
                           .removeClass('disableClick');
      }
      $('.crossMonthFilter a').attr("disabled","yes")
                              .addClass('disableClick');
    }

    else{
      $('.month_text button').removeAttr("disabled");
      $('.month_text button').html("Month"+" <span class='caret'></span>");
      var month_days;

      for(i=1;i<13;i++){
        month_days=numberOfDays(year_selected,i-1)
        for(j=0;j<month_days;j++){
          if(i<10){var month='0'+i;}
          else{month=i;}
          if(j<9){
            date_created=year_selected+'-'+ month +'-'+ '0' + (j+1);
          }else{
            date_created=year_selected+'-'+ month +'-'+ (j+1);
          }
          if(!dates[date_created]){
            var obj={};
            obj.date=date_created;
            obj.GET=0;
            obj.POST=0;
            obj.OPTIONS=0;
            obj.HEAD=0;
            newdata.push(obj);
          }
        }
      }
      data=newdata;
      if(year_selected!=year){
      $('#clear_filters').removeAttr("disabled")
                         .removeClass('disableClick');
       }
       else{
         $('#clear_filters').attr("disabled","yes")
                            .addClass('disableClick');
       }
      analysis(data);
    }
  });
}

$('.year a').on('click',function(e){
   margin.bottom=100;
  var year_selected=parseInt($(this).text());
   yearPlotting(year_selected);
   e.preventDefault();
});


/**** Year Change Traffic End ***********************************************************************/
var monthPlotting = function(month_selected){
//  d3.json("../json/trafficRateDayWise.json",function(json){
     var year_selected=year;
     $.get("json/trafficRate/"+year_selected+"/"+month_selected, function (json, status) {

    var dates=json[0];
    var tempdata=json[1];

    var temp=[];
    var keys=Object.keys(tempdata);
    for(i=0;i<keys.length;i++)
    {
      temp.push(tempdata[keys[i]]);
    }
  //  console.log(temp);
    data=temp;
  //  console.log(data);

    // if(year_selected){
    //   var dataNest1 = d3.nest()
    //   .key(function(d) {return parseInt(String(d.date).substring(0,4));})
    //   .entries(data);
    // }
    // // console.log(data.length);
    // if(data.length != 0)
    //   data=dataNest1[0].values;
    // var dataNest = d3.nest()
    // .key(function(d) {return parseInt(String(d.date).substring(5,7));})
    // .entries(data);
    // var newdata;
    // for(i in dataNest)
    // {
    //   if(dataNest[i].key==month_selected){
    //     newdata=dataNest[i].values;
    //   }
    // }
    // data=newdata;
  //  newdata=data;
    //console.log(data);
    var months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    $(".dropdown.month_text button").html(months[parseInt(month_selected)-1]+"  <span class='caret'></span>");
    $(".dropdown.year_text button").html(year_selected+"  <span class='caret'></span>");
    var check=0;


    if(data.length==0){
      d3.select('.traffic')
      .html('');
      d3.select('.traffic')
      .append('noData')
      .html('No Data Available for Selected Month');
    }
    else{
      newdata=data;
      var month_days;
      var parts = newdata[0].date.split('-');
      var year=parts[0];
      var month=parts[1];
      var date_created;
      month_days=numberOfDays(year_selected,month_selected);
      for(i=0;i<month_days;i++){
        flag=0;
        if(i<9){
          date_created=year+'-'+ month +'-'+ '0' + (i+1);
        }else{
          date_created=year+'-'+ month +'-'+ (i+1);
        }
        if(!dates[date_created]){
          var obj={};
          obj.date=date_created;
          obj.GET=0;
          obj.POST=0;
          obj.OPTIONS=0;
          obj.HEAD=0;
          newdata.push(obj);
        }
      }

      data=newdata;
      analysis(data);
    }
  });
}

$('.months a').on('click',function(e){
  margin.bottom=29;
  month_selected=($(this).attr('value'));
  monthPlotting(month_selected);
  $('#clear_filters').removeAttr("disabled")
                     .removeClass('disableClick');
 $('.crossMonthFilter a').removeAttr("disabled")
                    .removeClass('disableClick');
  e.preventDefault();
});


/* Final Analysis Part ******************************************************************/
var analysis=function(data){

  data.forEach(function(d) {
    var parts = (d.date).split('-');
    d.date= new Date(parts[0], parts[1]-1, parts[2]);
  });


  var line = d3.svg.line()
  .interpolate("monotone")
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.count); });


  d3.select('noData')
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

  var plot = svg.selectAll(".city")
  .data(methods)
  .enter()
  .append("g")
  .attr("class", "city");

  // svg.call(tip,methods.values);
  plot.append("path")
  .attr("class", "line")
  .attr("d", function(d) { return line(d.values); })
  .style("stroke", function(d) { return color(d.REQUEST); });


  $('.traffic svg').attr("width",width+220);

  var legend = svg.selectAll(".legend")
  .data(color.domain().slice())
  .enter()
  .append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(80," + i * 25 + ")"; });

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

month_selected=(new Date()).getMonth(),
year_selected=year;
monthPlotting(month_selected+1);

//**************************Clear All Filters***************************************//////////////////////
$('a#clear_filters').on('click',function(e){
  $(".traffic").html('');
  month_selected=(new Date()).getMonth();
  year_selected=year;
  e.preventDefault();
  $('.crossMonthFilter a').attr("disabled","yes")
                          .addClass('disableClick');
  $('.a#clear_filters').attr("disabled","yes")
                          .addClass('disableClick');
   margin.bottom=100;
  yearPlotting(year_selected);
});
//**************************Clear All Filters End***************************************//////////////////////

//**************************Clear Month Filters***************************************//////////////////////

$('.crossMonthFilter a').on('click',function(e){
  $(".traffic").html('');
  year_selected=year;
  e.preventDefault();
  $('.crossMonthFilter a').attr("disabled","yes")
                          .addClass('disableClick');
  $('.a#clear_filters').attr("disabled","yes")
                          .addClass('disableClick');
   margin.bottom=100;
  yearPlotting(year_selected);
});

//**************************Cross Month Filters End***************************************//////////////////////
