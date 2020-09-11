$(function () {
  $("#login_reg").on('click', function () {
    $("#login_reg").hide();
    $("#regist_reg").show();
  });
  $("#regist_reg").on('click', function () {
    $("#login_reg").show();
    $("#regist_reg").hide();
  })
})