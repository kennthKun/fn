var goods_id = $.getQueryString('goods_id');
$.ajax({
  "url": "http://h6.duchengjiu.top/shop/api_goods.php?goods_id=" + goods_id,
  "type": "GET",
  "dataType": "json",
  "success": function(response){
  	console.log(response);
    //如果返回的商品为空，则给出空的提示
    for (var i = 0; i < 1; i++) {
      var obj = response.data[i];
      var outer = document.createElement("div");
      outer.className = "outer"; 
      if(i%4 == 0){
      	outer.style.marginLeft = 0;
      }
      var buyNum = 1;
      
      $('#detail').append('<img src="' +obj.goods_thumb+ '"/><div class="txt"></div>');
      $('.txt').append('<p>' +obj.goods_desc+ '</p><a class="title">' +obj.goods_name+ '</a><span class="price">价格： ¥<span class="priceNam">' +obj.price+ '</span></span><p><b>数量：</b><button id="add">+</button><input class="num" type="text" value="1"><button id="sub">-</button></p><div class="add-cart">加入购物车</div>');
    }
        $("#add").click(function(){
            buyNum++;
            $(".num").val(buyNum);
            var priNam = buyNum*obj.price
            console.log(priNam)
            $(".priceNam").text(priNam);
        });
        $("#sub").click(function(){
            buyNum--;
            if(buyNum < 1){
                buyNum=1;
            }
            $(".num").val(buyNum);
            var priNam = buyNum*obj.price
            console.log(priNam)
            $(".priceNam").text(priNam);
        });
        $(".add-cart").click(function(){
            if(!localStorage.token){
                location.href='login.html#callbackurl='+location.href;
                return;
            }
            $("#boxTxt").show();
            $('#stopdown').click(function(){
            		$('#boxTxt').hide();
            })
            $.ajax({
                "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
                "type": "POST",
                "data": {
                    "goods_id": goods_id,
                    "number": function(){
                        return buyNum;
                    }
                },
                "dataType":"json",
                "success": function(response){
                    console.log(response);
                }
            });
        });
        
  }
});