$(function () {
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