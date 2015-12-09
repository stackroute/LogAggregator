(function($, window, document, undefined){

      var no_of_rows = 0,
      no_of_rows_all = 0;
      var rowsShown = 50;

      //getting no. of paths to be displayed from config file
      var no_of_paths=10,
      paths_selected=[];

      $("div.logcontainer").append($("<tr><td><button id='All'> Top Ten Most Visited Paths </button></td></br>"));


      $(document).ready(function(){
        $('#All').addClass('clickedbutton');
          alldata();
          })

      $('div.logcontainer').on('click','button',function(){

          var clicked = $(this),
          id = clicked.attr('id');

          if(id=="All") {
            alldata();
          }//if
      })//click



      function alldata() {

              $.ajax
              ({
                  dataType : "json",
                  url : "sampledata/pathJsons/pathall.json",
                  success : function(data){
                    drawHeader(data,"All");
                    drawTable(data,"All");

                    //pagenation call
                    $('#nav').html('');
                    $('#personDataTable').after('<div id="nav"></div>');
                    var rowsTotal =  no_of_rows_all;
                    drawRowDynamic(data,rowsTotal);
                  }
              });

      }//alldata fn

    //initialising no_of_paths  from config file

      no_of_paths = config.paths;



      //storing the paths a/c to config file
      $.ajax
      ({
        dataType : "json",
        url : "sampledata/paths.json",
        success : function(data) {
                for(var i=0; i<no_of_paths; i++)
                {
                  //storing paths into an array
                    paths_selected.push({"path": data.arr[i]["path"],
                    "count": data.arr[i]["count"]});
                }
               var paths= $(document).trigger('pathArray', paths_selected);
        }//success fn
    });

    //Displaying the paths in the document
    $(document).on('pathArray', function(e, arry){// arry is just the first item why???

        for(var j =0 ; j<paths_selected.length; j++)
        {
          $("div.logcontainer").append($('<tr><td><button id = '+ paths_selected[j]["path"] + ' > ' + paths_selected[j]["path"] + ' <span >' + '('+ paths_selected[j]["count"] + ')'+'</span></button></td>'));
          $("div.logcontainer tr button").addClass("logButtonStyle");
        }
    });


      $('div.logcontainer').on('mouseover','button',function() {

            $(this).removeClass('mouseout').addClass('mouseover');
      }); //hover event for button


      $('div.logcontainer').on('mouseout','button',function() {

          $(this).addClass('mouseout');
      });//mouseout event for button



      $('div.logcontainer').on('click','button',function(){

          $(this).parent().parent().siblings().children().children().removeClass('clickedbutton');

          $(this).addClass('clickedbutton');

           no_of_rows_all = 0;
           $('tbody').remove();

           var clicked = $(this),
           id = clicked.attr('id');
           for(i = 0; i<paths_selected.length; i++)
           {
                 if(id === paths_selected[i].path)
                 {
                   //got the path so fetch corresponding json file
                       var pos_found = i+1;
                       //ajax request to the clicked path json
                       if(pos_found > 7)
                       document.location.href='#';
                       $.ajax
                       ({
                         dataType : "json",
                         url : "sampledata/pathJsons/path"+(pos_found)+".json",
                         success : function(data){

                           drawHeader(data,id);
                           drawTable(data,id);
                           //pagenation call
                           $('#nav').html('');
                           $('#personDataTable').after('<div id="nav"></div>');

                           var rowsTotal =  no_of_rows;
                           drawRowDynamic(data,rowsTotal);
                         }
                       });

                 }//if end
           }//for end

         });//click end



      function drawHeader(data,id){

            $("#personDataTable").html('');
            no_of_rows = 0;
            var row = $("<tr class='pos' />");

            $("#personDataTable").append(row);
            if(id!="All"){
            delete data[0].path;
            delete data[0].host;
            delete data[0].user;
            }

            for(key in data[0]){
                row.append($("<th id = " + key + ">" + key+ "</th>"));
            }

      }//end draw header

       function drawTable(data,id) {

            no_of_rows = 0;
            for (var i = 0; i < data.length; i++) {
                 drawRow(data[i],id);
             }
       }//end draw table

       function drawRow(rowData,id) {

             var row = $("<tr />")
             $("#personDataTable").append(row); //this will append tr element to table...
             var objdate = new Date(parseInt(rowData.time.$date));
             var path = rowData.path;
             delete rowData.time;
            if(id!="All"){

            delete rowData.path;
            delete rowData.host;
            delete rowData.user;}

            for(key in rowData){

              if(key === "agent") {
                //checking for browser names
                var temp = rowData[key],
                    title;
                if(temp.indexOf("Chrome") != -1)
                    {title="Chrome";}
                else if (temp.indexOf("Safari")!= -1)
                    {title="Safari";}
                else if (temp.indexOf("Trident")!= -1)
                    {title="IE";}
                else
                    {title="Mozilla";}

                row.append($("<td><abbr>" + title + "</abbr></td>")
                    .attr("title",rowData[key]));
              }
                else{
                    if(key=="_id")
                    row.append($("<td>" + rowData[key]["$oid"] + "</td>"));
                    else {
                      row.append($("<td>" + rowData[key] + "</td>"));
                }
            }
          }//close if for agent
            row.append($("<td>" + String(objdate).substring(0, 25) + "</td>"));
            no_of_rows ++;
            no_of_rows_all++;
     }//end draw row

     function drawRowDynamic(data, rowsTotal){
              rowsShown= 100;

          var numPages = rowsTotal/rowsShown;

          for(i = 0;i < numPages;i++) {
                  var pageNum = i + 1;
                  $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
          }

          $('#personDataTable tbody tr').hide();
          $('#personDataTable tbody tr').slice(0, rowsShown).show();
          $('#nav a:first').addClass('active');
          $('#rowsshowing').remove();
          $('#nav a').bind('click', function(){


              $('#nav a').removeClass('active');
              $(this).addClass('active');
              var currPage = $(this).attr('rel');
              var startItem = currPage * rowsShown;
              var endItem = startItem + rowsShown;
               dispPages =($('#personDataTable tbody tr').slice(startItem, endItem)).length;

                $('#rowsshowing').remove();
              $('#nav').append('<span id="rowsshowing">('+  dispPages +'/'+ rowsTotal+') </span>')

              $('#personDataTable tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
                      css('display','table-row').animate({opacity:1}, 300);



          });//end pagenumber link fn
    }//end drawRowDynamic


})(jQuery, window, document);
