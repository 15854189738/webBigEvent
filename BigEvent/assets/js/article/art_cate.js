$(function () {
  var layer = layui.layer
  var form = layui.form;
  var indexAdd = null
  getCates();
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html(),
    });
  })
  // 通过代理的形式，为form-add 表单绑定 submit 事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          layer.msg(res.message);
        }
        layer.msg(res.message);
        layer.msg('新增分类成功！')
        // 根据索引，关闭对应的弹出层
        getCates();
        layer.close(indexAdd)
      }
    });
  });
  $('tbody').on('click', '.btn-edit', function (e) {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html(),
    });
    var Id = $(this).attr('data-id');
    console.log("§§§§§§§§§§§§§§" + Id);

    $.ajax({
      method: "get",
      url: "/my/article/cates/" + Id,
      success: function (res) {
        console.log(res);
        form.val('form-edit', res.data)
      }
    });
  });
  $('tbody').on('click', '.btn-delete', function (e) {
    var id = $(this).attr('data-id');
    $.ajax({
      type: "GET",
      url: "/my/article/deletecate/" + id,
      // data: $(this).serialize(),
      // dataType: "dataType",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        getCates();
      }
    });
  })
  // 通过代理的形式，为form-edit表单绑定 submit 事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('修改分类失败！')
        }
        layer.msg('修改分类成功！')
        // 根据索引，关闭对应的弹出层
        getCates();
        layer.close(indexAdd)
      }
    });
  });
});
//获取数据列表
function getCates() {
  $.ajax({
    method: "GET",
    url: "/my/article/cates",
    success: function (res) {
      if (res.status !== 0) {
        layer.msg(res.message);
      }
      layer.msg(res.message);
      // var data = res.data;
      // console.log(data);
      // var htmlStr = template('tpl-table', res)
      var htmlStr = "";
      $.each(res.data, function (i, item) {
        htmlStr +=
          `
      <tr>
        <td>${item.name}</td> 
        <td>${item.alias}</td> 
        <td>
        <button type = "button"class = "layui-btn layui-btn-xs btn-edit" data-id ="${item.Id}" > 编辑 
        </button> 
        <button type = "button"class = "layui-btn layui-btn-danger layui-btn-xs btn-delete" data-id = "${item.Id}" > 删除 </button>
        </td>
      </tr>
      `
      })
      $('tbody').html(htmlStr);

    }
  });
}