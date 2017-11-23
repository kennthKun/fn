//if (localStorage.getItem('token')) {
//  $('#login').html('<a>'+localStorage.getItem('username')+'</a>');
//  $('#signin').html('<a id="out" href="">退出</a>')
//}
$("#out").click(function(){
    localStorage.clear();
    $('#login').html('<a href="login.html">Hi,请登录</a>');
    $('#signin').html('<a class="noimg" href="register.html">免费注册<a>')
});
//导航栏
shop.api.fetchGoodsCategory(function(response){
  for (var i = 0; i < response.data.length; i++) {
    var obj = response.data[i];
    $('#nav').append('<li><a href="list.html?cat_id=' + obj.cat_id + '">' + obj.cat_name + '</a></li>')
  }
});
//搜索框
var searchBtn = $("#search-btn");
if (searchBtn.length === 1) {
  searchBtn.click(function(){
    location.href = 'search.html?search_text=' + $("#search-text").val();
  });
}

