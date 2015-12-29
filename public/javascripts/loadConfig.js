$.ajaxSetup({async:false});
$.get("/config", function(data, status) {
  config = data;
});
$.ajaxSetup({async:true});
