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

function sortPositiveByKey(array, key, type) {
	return array.sort(function(a, b) {
		if(type == 'num'){
 			var x = parseFloat(a[key]); var y = parseFloat(b[key]);
		}else{
 			var x = a[key]; var y = b[key];
		}
 		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}

function sortNegativeByKey(array, key, type) {
	return array.sort(function(a, b) {
		if(type == 'num'){
 			var x = parseFloat(a[key]); var y = parseFloat(b[key]);
		}else{
 			var x = a[key]; var y = b[key];
		}
 		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	});
}

//array copy
function arrayCopy(array){
	var newArray = new Array();
	for(var i = 0; i<array.length; i++){
		newArray.push(array[i]);
	}
	return newArray;
}


//left sider共用
$('.menu_section').html(
'<ul class="nav side-menu">\
    <li><a><i class="fa fa-home"></i> Home <span class="fa fa-chevron-down"></span></a>\
        <ul class="nav child_menu">\
            <li><a href="louhua_home.html">home</a></li>\
            <li><a href="louhua_adminlist.html">adminlist</a></li>\
            <li><a href="louhua_agentlist.html">agentlist</a></li>\
        </ul>\
    </li>\
    <li><a><i class="fa fa-edit"></i> Project Manage <span class="fa fa-chevron-down"></span></a>\
        <ul class="nav child_menu">\
            <li>\
                <a href="louhua_projectList.html">project list</a>\
            </li>\
        </ul>\
    </li>\
    <li><a><i class="fa fa-edit"></i> House Manage <span class="fa fa-chevron-down"></span></a>\
        <ul class="nav child_menu">\
            <li>\
                <a href="louhua_ihave.html">I have</a>\
            </li>\
            <li>\
                <a href="louhua_iwant.html">I want</a>\
            </li>\
            <li>\
                <a href="louhua_newHouse.html">Add House</a>\
            </li>\
        </ul>\
    </li>\
    <li><a><i class="fa fa-edit"></i> Task <span class="fa fa-chevron-down"></span></a>\
        <ul class="nav child_menu">\
            <li>\
                <a href="louhua_tasklist.html">Task List</a>\
            </li>\
            <li>\
                <a href="louhua_myTask.html">My Task</a>\
            </li>\
        </ul>\
    </li>\
</ul>');