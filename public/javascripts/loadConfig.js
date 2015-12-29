$.ajax({
  url: "/config",
  success: function(result) {
    config = result;
  },
  async: false
});
