$(function () {
  var form = layui.form
  getUserInfo(form);
  $(".layui-form").on('submit', function (e) {
    // e.preventDefault();
    alert("1");
    // $.ajax({
    //   type: "POST",
    //   url: "/my/userinfo",
    //   data: $(this).serialize(),
    //   success: function (res) {
    //     console.log("提交修改后返回的数据：" + res);

    //   }
    // });
  })

})

function getUserInfo(form) {
  $.ajax({
    type: "get",
    url: "/my/userinfo",
    success: function (res) {
      console.log(res);
      form.val('formUserInfo', res.data)
      // $("#usernam ").val(res.data.username);
      // $("#nickname").val(res.data.nickname);
      // $("#email").val(res.data.email);
    }
  });
}