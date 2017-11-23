if (localStorage.getItem('token')) {
    $('#login').html('<a>'+localStorage.getItem('username')+'</a>');
    $('#signin').html('<a id="out" href="">退出</a>')
}
$("#out").click(function(){
    localStorage.clear();
    $('#login').html('<a href="login.html">Hi,请登录</a>');
    $('#signin').html('<a class="noimg" href="register.html">免费注册<a>')
});
//调用ajax删除数据
$(function(){
	//显示地址栏
  $("#addUserAddress").click(function(){
    $("#newSiteBox").show();
  });
  $("#newSiteBox h2 span").click(function(){
    $("#newSiteBox").hide();
  });
  //添加地址
  $('#add').click(function(){
    var data = $("form").serialize();
    console.log(data);
    shop.api.addUserAddress(data, function(response){
      	console.log(response);
      	if (response.code === 0) {
        $('#newSiteBox').hide();
        fetchUserAddress();
       }
      });
    });
    fetchUserAddress();
    function fetchUserAddress() {
      shop.api.fetchUserAddress(function(response) {
      	console.log(response);
        var html = "";
        for (var i = 0; i < response.data.length; i++) {
          var obj = response.data[i];
          html += '<p id="displayInformation" data-id="'+obj.address_id+'">收货人：'+ obj.address_name +' 地址： '+obj.province+ obj.city+ obj.district + '   详细地址 ：' + obj.side + '   手机号：' + obj.mobile + '<b class="delete">删除</b> </p>';
        }
        $('#side').html(html);
      }); 
    }
});
$.ajax({
    "type":"post",
    "url":"http://h6.duchengjiu.top/shop/api_order.php",
    "dataType": "json",
    "success": function(response){
        $('#side').click(function(event){
            if(event.target.className === 'delete'){
                var obj = $(event.target);
                var parent = $(event.target).parent();
                console.log(parent)
                var a = parent.address_id;
                parent.remove();
                console.log(a);
                console.log(obj)
            }
        });
    }
});
var total = $.getQueryString('total');
$('#total').text('总计：'+total+'元');
var address_id = 0;
$('#address').click(function(event){
  console.log(event.target);
  if (event.target) {
    address_id = event.target.getAttribute('data-id');
  }
});
var btn = document.getElementsByClassName("btn");
for(var i = 0; i<btn.length; i++){
    btn[i].onclick = function(){
        for(var j = 0; j<btn.length; j++){
            btn[j].style.fontSize = 14 + "px";
            btn[j].style.borderColor = "#000";
        }
        this.style.fontSize = 20 + "px";
        this.style.borderColor = "#D7000F";
    }
}