$(function () {
  var form = layui.form;
  //判断新密码和确认密码是否一致

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同！'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致！'
      }
    }
  })

  // 监听表单的提交事件
  $('.layui-form').on('submit', function (e) {
    console.log($(this).serialize());
    // 阻止表单的默认重置行为
    e.preventDefault();
    // 发起 ajax 数据请求
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);

        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message);
        // // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        // // <iframe> 中的子页面，如果想要调用父页面中的方法，使用 `window.parent` 即可
        // window.parent.getUserInfo()
      }
    })
  })
  // 重置表单的数据
  $('#btnReset').on('click', function (e) {
    // 阻止表单的默认重置行为
    e.preventDefault()
  })
});