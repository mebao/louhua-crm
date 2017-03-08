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

//构造分页
function structurePaging(dataNum, url){
    if(dataNum > 0){
        var page = Math.ceil(dataNum / $('#pagesize').val());
        var pageHtml = '';
        //当前页为1，上一页不可点击
        if($('.pagination').attr('data-page') == 1){
            pageHtml += '<li class="disabled">';
        }else{
            pageHtml += '<li>';
        }
        pageHtml += '<a href="javascript:;" aria-label="Previous">\
                    <span aria-hidden="true">&laquo;</span>\
                </a>\
            </li>';
        for(var i = 0; i < page; i++){
            //当前页数
            if(i == ($('.pagination').attr('data-page') - 1)){
                pageHtml += '<li class="checkLi active"><a href="javascript:;" class="checkPage">' + (i+1) + '</a></li>';
            }else{
                pageHtml += '<li class="checkLi"><a href="javascript:;" class="checkPage">' + (i+1) + '</a></li>';
            }
        }
        //当前页为最后一页，下一页不可点击
        if($('.pagination').attr('data-page') == page){
            pageHtml += '<li class="disabled">';
        }else{
            pageHtml += '<li>';
        }
        
        pageHtml += '<a href="javascript:;" aria-label="Next">\
                    <span aria-hidden="false">&raquo;</span>\
                </a>\
            </li>';
        $('.pagination').html(pageHtml);
        //分页事件
        $('.checkPage').click(function(){
            //切换页面
            $('.checkLi').removeClass('active');
            $(this).parent('li').addClass('active');
            //记录当前页数
            $('.pagination').attr('data-page', $(this).text());
            requestData(url + '&page=' + $(this).text());
        });
        //上一页
        $('a[aria-label="Previous"]').click(function(){
            if($('.pagination').attr('data-page') != 1){
                var nowPage = parseInt($('.pagination').attr('data-page')) - 1;
                $('.checkLi').removeClass('active');
                $('.checkLi').each(function(){
                    if($(this).text() == nowPage){
                        $(this).parent('li').addClass('active');
                    }
                });
                $('.pagination').attr('data-page', nowPage);
                requestData(url + '&page=' + nowPage);
            }
        });
        //下一页
        $('a[aria-label="Next"]').click(function(){
            if($('.pagination').attr('data-page') != page){
                var nowPage = parseInt($('.pagination').attr('data-page')) + 1;
                $('.checkLi').removeClass('active');
                $('.checkLi').each(function(){
                    if($(this).text() == nowPage){
                        $(this).parent('li').addClass('active');
                    }
                });
                $('.pagination').attr('data-page', nowPage);
                requestData(url + '&page=' + nowPage);
            }
        });
    }else{
        $('.pagination').html('');
    }
}                

//left sider共用
$('.menu_section').html(
'<ul class="nav side-menu">\
    <li><a><i class="fa fa-home"></i> Home <span class="fa fa-chevron-down"></span></a>\
        <ul class="nav child_menu">\
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