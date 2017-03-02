var apiUrl = 'http://192.168.1.3/xinlouhua';

function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

var signIn = true;
var username = localStorage.getItem('username');
var token = localStorage.getItem('token');
var role = localStorage.getItem('role');
if(!(username && token && role)){
	$('#loginIntercept').modal({backdrop: 'static', keyboard: false});
	$('#login').click(function(){
		location.href = 'louhua_login.html';
	});
	signIn = false;
}