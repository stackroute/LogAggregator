(function($, window, document, undefined){
var no_of_rows = 0,
no_of_rows_all = 0;
$("div.logcontainer").append($("<tr><td><button id='All'> All </button></td></br>"));
for(var i=0; i<10; i++)
{
      $.ajax
      ({
        dataType : "json",
        url : "sampledata/pathJsons/path"+(i+1)+".json",
        success : function(data){
            $("div.logcontainer").append($('<tr><td><button id = '+ data[0].path+' >  ' + data[0].path + '</button></td></br>'));
            $("div.logcontainer td button").addClass("logButtonStyle");
        }
      });


    }//for end


$('div.logcontainer').on('mouseover','button',function(){
  $(this).css("background-color", "lightgrey");
});

$('div.logcontainer').on('mouseout','button',function(){
  $(this).css("background-color", "white");
});

$('div.logcontainer').on('click','button',function(){
     $(this).parent().parent().siblings().children().children().css("color", "black");
      $(this).css('color','blue');
      no_of_rows_all = 0;
  $('tbody').remove();
  var $path = this.id;
  var loop=1;
  for(var i=0;i<10;i++){
    $.ajax
    ({
      dataType : "json",
      url : "sampledata/pathJsons/path"+(i+1)+".json",
      success : function(data){

      if(($path)=="All")
      {
        $("#personDataTable").html('');
        $(".header").html('');
        drawHeader(data);
        drawTable(data);
        $('#nav').html('');
        $('#personDataTable').after('<div id="nav"></div>');
        var rowsShown = 4;
        var rowsTotal =  no_of_rows_all;
        drawRowDynamic(data,rowsTotal);
      }
      if($path==data[0].path){

        $("#personDataTable").html('');
        $(".header").html('');
        drawHeader(data);
        drawTable(data);
        $('#nav').html('');


        $('#personDataTable').after('<div id="nav"></div>');
        var rowsShown = 4;
        var rowsTotal =  no_of_rows;
        drawRowDynamic(data,rowsTotal);

        function drawRowDynamic(data, rowsTotal){
          var numPages = rowsTotal/rowsShown;
          for(i = 0;i < numPages;i++) {
              var pageNum = i + 1;
              $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
          }
          $('#personDataTable tbody tr').hide();
          $('#personDataTable tbody tr').slice(0, rowsShown).show();
          $('#nav a:first').addClass('active');
          $('#nav a').bind('click', function(){

              $('#nav a').removeClass('active');
              $(this).addClass('active');
              var currPage = $(this).attr('rel');
              var startItem = currPage * rowsShown;
              var endItem = startItem + rowsShown;
              $('#personDataTable tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
                      css('display','table-row').animate({opacity:1}, 300);

          });
        }
        //end the pagination
        loop=0;
      }
    }
    });
    if(loop==0)
    break;
  }

});
    function drawHeader(data){
      $(".header").html('');
      no_of_rows = 0;
      var row = $("<tr />");
      $(".header").append(row);

      delete data[0].path;
     delete data[0].host;
     delete data[0].user;

      for(key in data[0]){
        row.append($("<td id = " + key + ">" + key+ "</td>"));
      }
    }

     function drawTable(data) {
       no_of_rows = 0;
           for (var i = 0; i < data.length; i++) {
               drawRow(data[i]);
           }
     }//end draw table

     function drawRow(rowData) {
             var row = $("<tr />")
             $("#personDataTable").append(row); //this will append tr element to table...

            var objdate = new Date(parseInt(rowData.time.$date));
            var path = rowData.path;
            delete rowData.time;
             delete rowData.path;
            delete rowData.host;
            delete rowData.user;
            //row.append($("<td><button>" + path + "</button></td></br>"));
            for(key in rowData){
              row.append($("<td>" + rowData[key] + "</td>"));
            }
            row.append($("<td>" + objdate + "</td>"));
            no_of_rows ++;
            no_of_rows_all++;
     }//end draw row






})(jQuery, window, document);
