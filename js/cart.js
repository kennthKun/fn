$(function(){
    $.ajax({
        "type": "get",
        "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem('token'),
        "dataType": "json",
        "success": function(response){
            if(response.data.length > 0) {
                for (var i = 0; i < response.data.length; i++) {
                    var obj = response.data[i];
              obj.subtotal = parseInt(obj.goods_price) * parseInt(obj.goods_number);
              var tr = '<tr class="otr" data-id="'+obj.goods_id+'">\
                <td class="txtl" width="50px">\
                  <input type="checkbox" class="chkbox" checked="true">\
                </td>\
                <td class="commodity" width="625px"><img width="100px" src="'+obj.goods_thumb+'" /><span>'+obj.goods_name+ '</span></td>\
                <td width="100px"><button class="operate minus"  id="minus-'+obj.goods_id+'">-</button><input type="text" value="'+obj.goods_number+'" class="goods_number" /><button class="operate plus" id="plus-'+obj.goods_id+'">+</button></td>\
                <td width="150" class="goods_price">'+obj.goods_price+'</td>\
                <td width="150" id="subtotal_'+obj.goods_id+'" class="subtotal">'+obj.subtotal+'</td>\
                <td><span class="dele">删除</span></td>\
              </tr>';
              $("table[class = 'cart']").append($(tr));
              
                }
            }
        $('#checkout').click(function(){
            var token = $('#payMoneyTxt').text();
            console.log(token);
    					location.assign('checkout.html?total='+token);
 		 });
        showSum();
        }
    });
});
//显示总价
function showSum() {
  var trs = $('tr[class="otr"]');
  var sum = 0;
  for (var i = 0; i < trs.length; i++) {
    var tr = trs[i];
    if ($(tr).children("td:first").children("input").is(':checked')) {
       sum += parseInt($(tr).children('td:eq(4)').text());
    }
  }
  $('#payMoneyTxt').text(sum);
}
//删除购物车
$('table').click(function(event){
    if (event.target.className === "dele") {
        var table = $(event.target).parent().parent().parent();
      var oNumber = $(event.target).parent().prev().prev().prev().children().eq(1);
        $(event.target).parent().parent().remove();
      oNumber.val(0);
        var number = 0;
        var price = parseInt($(event.target).parent().next().text());
        var oSubtotal = $(event.target).parent().next().next();
        var subtotal = price * number;
        oSubtotal.text(subtotal);
        showSum();
        var goods_id = $(event.target).parent().parent().attr('data-id');
        shop.api.updateCart(goods_id, number, function(response){});
        return;
    }
});
$('table').click(function(event){
    if (event.target.className === "operate plus") {
        var oNumber = $(event.target).prev();
        var number = oNumber.val();
        if(number >= 10){
        	return;
        }
        oNumber.val(++number);
        var price = parseInt($(event.target).parent().next().text());
        console.log(price)
        var oSubtotal = $(event.target).parent().next().next();
        var subtotal = price * number;
        oSubtotal.text(subtotal);
        showSum();
        var goods_id = $(event.target).parent().parent().attr('data-id');
        shop.api.updateCart(goods_id, number, function(response){
        });
        return;
    }
});
$('table').click(function(event){
    if (event.target.className === "operate minus") {
        var oNumber = $(event.target).next();
        var number = oNumber.val();
         if(number <= 1){
         	number = 1;
        	return;
        }
        oNumber.val(--number);
        var price = parseInt($(event.target).parent().next().text());
        var oSubtotal = $(event.target).parent().next().next();
        var subtotal = price * number;
        oSubtotal.text(subtotal);
        showSum();
        var goods_id = $(event.target).parent().parent().attr('data-id');
        shop.api.updateCart(goods_id, number, function(response){
        });
        return;
    }
    if (event.target.id === 'selectAll') {
         //全选的事情
        var selected = event.target.checked;
        var checkboxs = document.getElementsByClassName('chkbox');
        for (var i = 0; i < checkboxs.length; i ++) {
        	checkboxs[i].checked = selected;
        }
        showSum();
        return;
    }
    if (event.target.type === 'checkbox') {
        showSum();
        checkSelectAll();
    }
});
function selectAll(obj) {
  $('input[class="chkbox"]').prop('checked', obj.checked);
	showSum();
};
function checkSelectAll() {
	var goods_count = $('input:checkbox').filter('[class="chkbox"]').length;
	if ($('input:checkbox').filter('[class="chkbox"]').filter(":checked").length !== goods_count) {
	    $('#selectAll').prop('checked', false);
	} else {
	    $('#selectAll').prop('checked', true);
}
}