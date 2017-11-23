var otop = document.getElementById("top");
var small = document.getElementById("small");
var big = document.getElementById("big");
var open = document.getElementById("open");
var banner = document.getElementsByClassName('banner')[0];
var bannerImg = document.getElementsByClassName('bannerImg');
var topSeek = document.getElementsByClassName('top-seek')[0];
var colArr = ['#e37f46','#8a1b79','#ffc3e5','#4bc2ca','#ff8b02'];
banner.style.background = "#ff8b02";
//顶部搜索框
window.onscroll = function(){ 
 var t = document.documentElement.scrollTop || document.body.scrollTop; 
 var top_div = document.getElementById( "top_div" ); 
 if( t >= 300 ) { 
 	topSeek.style.display = 'block';
 } else { 
  topSeek.style.display = "none"; 
 } 
} 
//轮播图
var tirme;
var bannerLength = bannerImg.length;
var i = 5;
function fun1(){
	timer = setInterval(function(){
		i--;
		if(i == 0){
			$('.bannerImg').eq(i).fadeOut(1000);
			$('.bannerImg').eq(4).fadeIn(1000);
			
			i = 5;
		}else{
			$('.banner').eq(0).css('background',colArr[i]);
			$('.bannerImg').eq(i).fadeOut(1000);
			$('.bannerImg').eq(i-1).fadeIn(1000);
		
		}
		console.log(i);
	},2000)
}
fun1();
//dom事件兼容
function addEvent(obj,eventtype,fn){
	if(obj.addEventListener){
		obj.addEventListener(eventtype,fn,false);
	}else if(obj.attachEvent){
		abj.attachEvent("on"+eventtype,function(){
			fn.call(obj);
		})
	}else{
		obj["on"+eventtype] = fn;
	}
}
addEvent(open,'click',function(){
	if(open.innerText === "∧收起"){
		small.style.display = 'block';
		otop.style.height = '60px';
		big.style.top = '-240px'
		open.innerText = "展开∨";
	}else{
		small.style.display = 'none';
		otop.style.height = '300px';
		big.style.top = '0px'
		open.innerText = "∧收起";
	}
});
//请求分类中的商品
var cat_id = $.getQueryString('cat_id');
var page = 1;
var pagesize = 18;
$.ajax({
  "url": 'http://h6.duchengjiu.top/shop/api_goods.php?=&page='+page+'&pagesize='+pagesize,
  "type": "GET",
  "dataType": "json",
  "success": function(response){
  	console.log(response);
  	var cla = '';
    for (var i = 0; i < response.data.length; i++) {
      var obj = response.data[i];
      var str ='<div '+cla+'><a href="detail.html?goods_id=' 
		      +obj.goods_id+ '"><img src="'
		      +obj.goods_thumb+'"/></a><p>'
		      +obj.goods_name+'</p><em>'
		      +"售价：" + obj.price+ '</em></div>';
			  if( i <= 3 ){
				  	$('#rusePurchase').append(str);
				  	if( i == 2){
				  		cla = "class = end";
				  		
				  }
			  }
			  if( i == 4){
				  	$('#ruseRirht').append(str);				  
		 		}
			  if(i <= 7 && i > 4){
			  		$('#flOneLeft').append(str);  		
				  	if(i == 5 || i==6){
				  		cla = "class = oneleft"
				  	}
					else{
				  		cla = '';
				  	}
			  }
			  if(i <= 10 && i > 7){
			  		$('#flOneCenter').append(str);
				  	if(i == 8 || i==9){
				  		cla = "class = oneleft"
				  	}else{
				  		cla = '';
				  	}
			  }
		  	if(i == 11){
		  		$('#flOneright').append(str);
		  }
			if( i > 11&& i <= 17){
		  		$('#ftb').append(str);
		  }
    }
  }
});
//倒计时
var count = 0;
var timerNum;
var timer = document.getElementsByClassName('timer')[0];
var date = new Date();
var newH = date.getHours();
function fun(){
	var h = timer.getElementsByClassName('h')[0];
	var m = timer.getElementsByClassName('m')[0];
	var s = timer.getElementsByClassName('s')[0];
	timerNum = setInterval(function(){
		var date = new Date();
		var newH = date.getHours();
		var newM = date.getMinutes();
		var newS = date.getSeconds();
		htxt = 9-newH;
		stxt = 59-newS;
		mtxt = 59-newM;
		if(stxt <= 0) {
			stxt = 60;
			if(mtxt <= 0){
				mtxt = 60;
				if(htxt <= 0){
					clearInterval(timerNum);
					timer.innerText = '抢购结束，请明日再来！'
				}
			}
		}
		s.innerText = stxt;
		m.innerText = mtxt;
		h.innerText = htxt;
	},1000)
}
fun();
if(newH >= 8 && newH < 10){
	timer.innerHTML = '倒计时<e class = "h">2</e>:<i class="m">0</i>:<em class="s">0</em>';
	fun();
}else if(newH < 8){
	timer.innerText = "每日8点开始请耐心等待";
}else if(newH >= 10){
	timer.innerText = '抢购于每日10点结束';
}
