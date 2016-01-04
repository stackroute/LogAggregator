(function($, window, document, undefined){

      var no_of_rows = 0,
      no_of_rows_all = 0;
      var rowsShown = 50;

      //getting no. of paths to be displayed from config file
      var no_of_paths=10,
      paths_selected = [];
            
      $("div.logcontainer").append($("<tr><td><button id='All' href='All'> Top Ten Most Visited Paths </button></td></br>"));


      $(document).ready(function(){
        $('#All').addClass('clickedbutton');
          $.get("json/logListing/All/1",function(data){
            console.log("on load");

              alldata();
          });

        });

      $('div.logcontainer').on('click','button',function(){

          var clicked = $(this),
          id = clicked.attr('id');

          if(id=="All") {
            alldata();
          }//if

      })//click



      function alldata(){
            console.log("inside all script");
              href="/All";
              $.get("json/logListing"+href+"/1",function(data){
                  count = data[1].count;
                  console.log("count "+data[1].count);

                    drawHeader(data[0],"All");
                    drawTable(data[0],"All");

                    //pagenation call
                    $('#nav').html('');
                    $('#personDataTable').after('<div id="nav"></div>');
                    var rowsTotal =  count;
                    drawRowDynamic(data,rowsTotal,href,'/All');

              });//ajax req

      }//alldata fn

    //initialising no_of_paths  from config file

      no_of_paths = config.paths;



      //storing the paths a/c to config file
      $.get("json/logListing/",function(data) {
        data = JSON.parse(data);

                for(var i=0; i<no_of_paths; i++)
                {
                  //storing paths into an array

                    paths_selected.push({"path": data.arr[i]["path"],
                    "count": data.arr[i]["count"]
                    });
                }
               var paths= $(document).trigger('pathArray', paths_selected);

    });

    //Displaying the paths in the document
    $(document).on('pathArray', function(e, arry){// arry is just the first item why???

        for(var j =0 ; j<paths_selected.length; j++)
        {
          $("div.logcontainer").append($('<tr><td><button id = '+ paths_selected[j]["path"] + ' href = '+ paths_selected[j]["path"] + ' > ' + paths_selected[j]["path"] + ' <span >' + '('+ paths_selected[j]["count"] + ')'+'</span></button></td>'));
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
           if(id!="All"){

                        href = clicked.attr('href');

                   //got the path so fetch corresponding json file
                       var pos_found = i+1;
                       //ajax request to the clicked path json
                       if(pos_found > 7)
                       document.location.href='#';
                      temp =  href.substring(1);
                      newhref = "/"+temp.split('/').join('^');

                       $.get("json/logListing"+newhref+"/1", function(data){
                         console.log(data);
                          var count=data[1].count;
                         console.log("count "+count);

                           drawHeader(data[0],id);
                           drawTable(data[0],id);
                           //pagenation call
                           $('#nav').html('');
                           $('#personDataTable').after('<div id="nav"></div>');

                           var rowsTotal =  count;
                           drawRowDynamic(data,rowsTotal,newhref,id);

                       });

            }//close if


         });//click end



      function drawHeader(data,id){

            $("#personDataTable").html('');
            no_of_rows = 0;
            var row = $("<tr class='pos' />");

            $("#personDataTable").append(row);
            if(id!="All"){
            delete data[0].path;
            delete data[0]._id;
            }
            else {
              delete data[0]._id;
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
             var objdate = new Date(parseInt(rowData.time));

             var path = rowData.path;
             delete rowData.time;
            if(id!="All"){
                delete rowData.path;
                delete rowData._id; }
            else {
                delete rowData._id;
            }

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
                  else if (temp.indexOf("Vagrant")!= -1)
                      {title="Others";}
                  else if (temp.indexOf("Opr")!= -1)
                       {title="Opera";}
                  else if (temp.indexOf("-")!= -1)
                      {title="Others";}
                  else
                        {title="Mozilla";}


                  row.append($("<td><abbr>" + title + "</abbr></td>")
                      .attr("title",rowData[key]));
                }

                else if(key=="size") {
                    //changing size to mb or kb
                      rowData.size=parseInt(rowData.size)/8;
                      if(rowData.size>1000 && rowData.size<1000000)
                          {rowData.size = parseFloat(rowData.size)/1000;
                           rowData.size = (rowData.size).toFixed(2)+ " KB" ;}

                      else if (rowData.size<1000 ) {
                           rowData.size = rowData.size + " B" ;}

                      else if (rowData.size>1000000 ) {
                         rowData.size = parseFloat(rowData.size)/1000000;
                         rowData.size = (rowData.size).toFixed(2)+ " MB" ;
                       }

                       row.append($("<td>" + rowData[key] + "</td>"));
               }//else for size key

                else {
                    row.append($("<td>" + rowData[key] + "</td>"));
                }

          }//close  for key in rowData
            row.append($("<td>" + String(objdate).substring(0, 25) + "</td>"));
            no_of_rows ++;
            no_of_rows_all++;
     }//end draw row

     function drawRowDynamic(data, rowsTotal,path,id){
              rowsShown= 100;
              console.log("rowsTotal "+rowsTotal);
          var numPages = Math.ceil(rowsTotal/rowsShown);

          console.log("numpages= "+numPages);
          for(i = 0;i < numPages;i++) {
                  var pageNum = i + 1;
                  $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
          }

          // $('#personDataTable tbody tr').hide();
          // $('#personDataTable tbody tr').slice(0, rowsShown).show();
          $('#nav a:first').addClass('active');
          //$('#rowsshowing').remove();
          $('#nav a').bind('click', function(){

              $('#nav a').removeClass('active');
              $(this).addClass('active');
              var currPage = parseInt($(this).attr('rel')) +1;
              console.log("current page "+currPage);
              $.get("json/logListing"+path+"/"+currPage, function(data){


                    drawHeader(data[0],id);
                    drawTable(data[0],id);


              });

              // var startItem = currPage * rowsShown;
              // var endItem = startItem + rowsShown;
              //  dispPages =($('#personDataTable tbody tr').slice(startItem, endItem)).length;

              //  $('#rowsshowing').remove();
            //  $('#nav').append('<span id="rowsshowing">('+  dispPages +'/'+ rowsTotal+') </span>')

              // $('#personDataTable tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
              //         css('display','table-row').animate({opacity:1}, 300);



          });//end pagenumber link fn
    }//end drawRowDynamic


})(jQuery, window, document);
