$(function () {
  getUserInfo();
  // 点击按钮，实现退出功能
  $('#btnLogout').on('click', function () {
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', {
      icon: 3,
      title: '提示'
    }, function (index) {
      //do something
      // 1. 清空本地存储中的 token
      localStorage.removeItem('token')
      // 2. 重新跳转到登录页面
      location.href = '/login.html'

      // 关闭 confirm 询问框
      layer.close(index)
    })
  })
});

function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    // data: "data",
    //请求头
    headers: {
      Authorization: localStorage.getItem('token')
    },
    success: function (res) {
      console.log(res);

      renderAvatar(res.data);
    },
    complete: function (XMLHttpRequest, textStatus) {
      if (textStatus == 'timeout') {
        var xmlhttp = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHttp");
        xmlhttp.abort();
        $(".box").html("网络超时！");
      }
      $("#inp").val("点击获取数据");
    },
    error: function (XMLHttpRequest, textStatus) {
      console.log(XMLHttpRequest); //XMLHttpRequest.responseText    XMLHttpRequest.status   XMLHttpRequest.readyState
      console.log(textStatus);
      $(".box").html("服务器错误！");
    }
  });

}

function renderAvatar(user) {
  // 1.获取用户名称
  var name = user.nickname || user.username;
  // 2.设置欢迎文本
  $("#welcome").html("欢迎" + name);
  //设置头像
  if (user.user_pic !== null) {
    //渲染图片头像
    $('.layui-nav-img').attr("src", user.user_pic).show();
  } else {
    //渲染文本头像
    $('.layui-nav-img').hide();
    var first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();

  }

}