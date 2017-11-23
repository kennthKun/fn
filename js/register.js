//当前页面执行完成之后执行
$(function(){
	$('#username').blur(function(){
		var username = $('input[name = "username"]').val();
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_user.php",
      "type": "POST",
      "dataType": "json",
      "data": {
        "status": "check",
        "username": username,
      },
      "success": function(response){
      	console.log(response.message);
      	if(response.code === 0){
      		document.getElementsByTagName("span")[0].innerText = "用户名可用";
      		document.getElementsByTagName("span")[0].style.color = "green";
      		document.getElementsByTagName("p")[0].style.borderColor = "gainsboro";
      		return;
      	}else if(response.code === 2001){
      		document.getElementsByTagName("span")[0].innerText = "用户名已存在";
      		document.getElementsByTagName("span")[0].style.color = "red";
      		document.getElementsByTagName("p")[0].style.borderColor = "red";
      		return;
      	}
      	if(username.length <3 || username.length > 20){
      		document.getElementsByTagName("span")[0].innerText = "用户名不合法，请填写3-20位的英文数字下划线";
      		document.getElementsByTagName("span")[0].style.color = "red";
      		document.getElementsByTagName("p")[0].style.borderColor = "red";
      		return;
      	}
      }
		})
	});
	$("#password").blur(function(){
		var password = $('input[name = "password"]').val();
		if(password.length >=6&&password.length<=20){
			document.getElementsByTagName("span")[1].innerText = "密码可用";
			document.getElementsByTagName("span")[1].style.color = "green";
      document.getElementsByTagName("p")[1].style.borderColor = "gainsboro";
		}else if(password.length == 0){
			document.getElementsByTagName("span")[1].innerText = "请输入密码";
      document.getElementsByTagName("span")[1].style.color = "red";
      document.getElementsByTagName("p")[1].style.borderColor = "red";
		}
		else{
			document.getElementsByTagName("span")[1].innerText = "密码长度为6-20位";
      document.getElementsByTagName("span")[1].style.color = "red";
      document.getElementsByTagName("p")[1].style.borderColor = "red";
		}
	});
	$("#repassword").blur(function(){
		var password = $('input[name = "password"]').val();
		var repassword = $('input[id = "repassword"]').val();
		if(repassword === password){
			document.getElementsByTagName("span")[2].innerText = "密码正确";
			document.getElementsByTagName("span")[2].style.color = "green";
      document.getElementsByTagName("p")[2].style.borderColor = "gainsboro";
		}else if(repassword !== password){
			document.getElementsByTagName("span")[2].innerText = "两次密码不一致";
      document.getElementsByTagName("span")[2].style.color = "red";
      document.getElementsByTagName("p")[2].style.borderColor = "red";
		}
	});
	$("#register").click(function(){
		//获得用户名密码
		var username = $('input[name ="username"]').val();
		var password = $('input[name="password"]').val();
		$.ajax({
      "url": "http://h6.duchengjiu.top/shop/api_user.php",
      "type": "POST",
      "dataType": "json",
      "data": {
        "status": "register",
        "username": username,
        "password": password
      },
      "success": function(response){
      	if(document.getElementsByTagName("span")[0].style.color == 'green'&&document.getElementsByTagName("span")[1].style.color == 'green'&&document.getElementsByTagName("span")[2].style.color == 'green'){
      		console.log(response);
	        var str = 5;
	        $(".timer").css("display","block");
	        setInterval(function(){
	        	if(str > 0){
	        		str--;
	        		$('b[class="down"]').text(str);
	        	}else{
	        		location.assign('login.html');
	        	}
	        },1000);
					console.log(1)
      	}else{
      		return;
      	}
      }
  	});
	})
})
