$(function () {
  $("#link_login").on('click', function () {
    $("#login_reg").show();
    $("#regist_reg").hide();
  });
  $("#link_reg").on('click', function () {
    $("#login_reg").hide();
    $("#regist_reg").show();
  });
  password();

  function password() {
    //注册页面校验
    var reg = /[a - z0 - 9]+/
    var pas = /[a - z6 - 12/\S/]+/
    //正则判断用户名和密码  
    var span = document.querySelector("span");
    $("#log_username").blur(function () {
      var user = $("#log_username").val();

      if (reg.test(this.value)) {

        span.className = 'right';
        span.innerHTML = '用户名格式输入正确';
        // return alert("验证通过");
      } else {
        span.className = 'wrong';
        span.innerHTML = '用户名格式输入不正确';
      }
    });
    $("#log_password").blur(function () {
      var password = $("#log_password").val();
      var span = document.querySelector("#span_pas");
      if (pas.test(this.value)) {
        span.className = 'right';
        span.innerHTML = '用户名格式输入正确';
      } else {
        span.className = 'wrong';
        span.innerHTML = '用户名格式输入不正确';
      }
    });
  }


  regist();

  function regist() {
    //判断注册正则
    var reg = /[a - z0 - 9]+/
    var pas = /[a - z6 - 12/\S/]+/
    $("#reg_username").blur(function () {
      var user = $("#reg_username").val();
      var span = document.querySelector("#span_reg");
      if (reg.test(this.value)) {

        span.className = 'right';
        span.innerHTML = '用户名格式输入正确';
        // return alert("验证通过");
      } else {
        span.className = 'wrong';
        span.innerHTML = '用户名格式输入不正确';
      }
    });
    $("#reg_password").blur(function () {
      var span = document.querySelector("#span_reg_pas");
      if (reg.test(this.value)) {
        span.className = 'right';
        span.innerHTML = '用户名格式输入正确';
        // return alert("验证通过");
      } else {
        span.className = 'wrong';
        span.innerHTML = '用户名格式输入不正确';
      }
    })
    $("#confirm_password").blur(function () {
      var user2 = $("#confirm_password").val();
      var user = $("#reg_password").val();
      var span = document.querySelector("#span_reg_repas");
      if (user === user2) {
        span.className = 'right';
        span.innerHTML = '确认密码输入正确';
        // return alert("验证通过");
      } else {
        span.className = 'wrong';
        span.innerHTML = '确认密码与密码不正确';
      }
    })
  }
  $("#form_reg").on("submit", function (e) {
    // 1. 阻止默认的提交行为
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/reguser",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          alert(res.message);
          return;
        }
        alert(res.message);
      }
    });
  })
  $("#form_login").on("submit", function (e) {
    // 1. 阻止默认的提交行为
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);

        if (res.status !== 0) {
          alert(res.message);
          return;
        }
        // layer.msg('登录成功！')
        alert('登录成功！');
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        // location.href = '../../index.html'
        location.href = "./index.html"
      }
    });
  })

})