$(function () {
  var form = layui.form
  getUserInfo(form);
  $('.layui-form').on('submit', function (e) {
    console.log($(this).serialize());
    // 阻止表单的默认重置行为
    e.preventDefault();
    // 发起 ajax 数据请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        // <iframe> 中的子页面，如果想要调用父页面中的方法，使用 `window.parent` 即可
        window.parent.getUserText();
      }
    })
  });
  // 重置表单的数据
  $('#btnReset').on('click', function (e) {
    // 阻止表单的默认重置行为
    e.preventDefault()
    getUserInfo(form)
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
      window.parent.getUserText();
    }
  });
}