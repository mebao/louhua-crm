var apiUrl = 'http://192.168.1.2/xinlouhua';
// var apiUrl = 'http://api.louhua.meb168.com';

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
function structurePaging(dataNum, url, functionType){
    if(dataNum > 0){
        var page = Math.ceil(dataNum / $('#pagesize').val());
        var pageHtml = '';
        //当前页为1，上一页不可点击
        if($('.x_content').find('.pagination').attr('data-page') == 1){
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
            if(i == ($('.x_content').find('.pagination').attr('data-page') - 1)){
                pageHtml += '<li class="checkLi active"><a href="javascript:;" class="checkPage">' + (i+1) + '</a></li>';
            }else{
                pageHtml += '<li class="checkLi"><a href="javascript:;" class="checkPage">' + (i+1) + '</a></li>';
            }
        }
        //当前页为最后一页，下一页不可点击
        if($('.x_content').find('.pagination').attr('data-page') == page){
            pageHtml += '<li class="disabled">';
        }else{
            pageHtml += '<li>';
        }
        
        pageHtml += '<a href="javascript:;" aria-label="Next">\
                    <span aria-hidden="false">&raquo;</span>\
                </a>\
            </li>';
        $('.x_content').find('.pagination').html(pageHtml);
        //分页事件
        $('.checkPage').click(function(){
            //切换页面
            $('.x_content').find('.checkLi').removeClass('active');
            $(this).parent('li').addClass('active');
            //记录当前页数
            $('.x_content').find('.pagination').attr('data-page', $(this).text());
            requestData(url + '&page=' + $(this).text());
        });
        //上一页
        $('a[aria-label="Previous"]').click(function(){
            if($('.x_content').find('.pagination').attr('data-page') != 1){
                var nowPage = parseInt($('.x_content').find('.pagination').attr('data-page')) - 1;
                $('.x_content').find('.checkLi').removeClass('active');
                $('.x_content').find('.checkLi').each(function(){
                    if($(this).text() == nowPage){
                        $(this).parent('li').addClass('active');
                    }
                });
                $('.x_content').find('.pagination').attr('data-page', nowPage);
                requestData(url + '&page=' + nowPage);
            }
        });
        //下一页
        $('a[aria-label="Next"]').click(function(){
            if($('.x_content').find('.pagination').attr('data-page') != page){
                var nowPage = parseInt($('.x_content').find('.pagination').attr('data-page')) + 1;
                $('.x_content').find('.checkLi').removeClass('active');
                $('.x_content').find('.checkLi').each(function(){
                    if($(this).text() == nowPage){
                        $(this).parent('li').addClass('active');
                    }
                });
                $('.x_content').find('.pagination').attr('data-page', nowPage);
                requestData(url + '&page=' + nowPage);
            }
        });
    }else{
        $('.x_content').find('.pagination').html('');
    }
}

//searchAgents分页
function structurePagingSearchAgents(dataNum, url){
    if(dataNum > 0){
        var page = Math.ceil(dataNum / $('.user-list').attr('data-pagesize'));
        var pageHtml = '';
        //当前页为1，上一页不可点击
        if($('#selectUser').find('.pagination').attr('data-page') == 1){
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
            if(i == ($('#selectUser').find('.pagination').attr('data-page') - 1)){
                pageHtml += '<li class="checkLi active"><a href="javascript:;" class="checkPage">' + (i+1) + '</a></li>';
            }else{
                pageHtml += '<li class="checkLi"><a href="javascript:;" class="checkPage">' + (i+1) + '</a></li>';
            }
        }
        //当前页为最后一页，下一页不可点击
        if($('#selectUser').find('.pagination').attr('data-page') == page){
            pageHtml += '<li class="disabled">';
        }else{
            pageHtml += '<li>';
        }
        
        pageHtml += '<a href="javascript:;" aria-label="Next">\
                    <span aria-hidden="false">&raquo;</span>\
                </a>\
            </li>';
        $('#selectUser').find('.pagination').html(pageHtml);
        //分页事件
        $('#selectUser').find('.checkPage').click(function(){
            //切换页面
            $('#selectUser').find('.checkLi').removeClass('active');
            $(this).parent('li').addClass('active');
            //记录当前页数
            $('#selectUser').find('.pagination').attr('data-page', $(this).text());
            readyAgents(url + '&page=' + $(this).text());
        });
        //上一页
        $('a[aria-label="Previous"]').click(function(){
            if($('#selectUser').find('.pagination').attr('data-page') != 1){
                var nowPage = parseInt($('#selectUser').find('.pagination').attr('data-page')) - 1;
                $('#selectUser').find('.checkLi').removeClass('active');
                $('#selectUser').find('.checkLi').each(function(){
                    if($(this).text() == nowPage){
                        $(this).parent('li').addClass('active');
                    }
                });
                $('#selectUser').find('.pagination').attr('data-page', nowPage);
                readyAgents(url + '&page=' + nowPage);
            }
        });
        //下一页
        $('a[aria-label="Next"]').click(function(){
            if($('#selectUser').find('.pagination').attr('data-page') != page){
                var nowPage = parseInt($('#selectUser').find('.pagination').attr('data-page')) + 1;
                $('#selectUser').find('.checkLi').removeClass('active');
                $('#selectUser').find('.checkLi').each(function(){
                    if($(this).text() == nowPage){
                        $(this).parent('li').addClass('active');
                    }
                });
                $('#selectUser').find('.pagination').attr('data-page', nowPage);
                readyAgents(url + '&page=' + nowPage);
            }
        });
    }else{
        $('#selectUser').find('.pagination').html('');
    }
}

//聊天
function chat(id){
    var iWidth = 600;
    var iHeight = 400;
    //获得窗口的垂直位置 
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2; 
    //获得窗口的水平位置 
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; 
    var winObj = window.open('louhua_chat.html?id=' + id, 'Chat', 'height=' + iHeight + ', width=' + iWidth + ', top=' + iTop + ', left=' + iLeft + ', resizable=no, toolbar=no, scrollbars=no, menubar=no');
    var loop = setInterval(function() {
        if(winObj.closed) {
            clearInterval(loop);
            $.ajax({
                type: 'post',
                url: apiUrl + '/crmapi/closeconver/' + localStorage.getItem('conversationId'),
                data: {username: localStorage.getItem('username'), token: localStorage.getItem('token')},
                success: function(res){
                    if(res.status == 'ok'){
                        localStorage.removeItem('conversationId');
                    }
                },
                error: function(){

                }
            });
        }
    }, 1000);
}

//left sider共用
// 通过角色
var menuHtml = '<ul class="nav side-menu">\
    <li><a><i class="fa fa-home"></i> Home <span class="fa fa-chevron-down"></span></a>\
        <ul class="nav child_menu">';
if(localStorage.getItem('role') == 1){
    menuHtml += '<li><a href="louhua_adminlist.html">Admin List</a></li>\
            <li><a href="louhua_agentlist.html">Agent List</a></li>';
}else if(localStorage.getItem('role') == 2){
    menuHtml += '<li><a href="louhua_agentlist.html">Agent List</a></li>';
}
menuHtml += '</ul>\
    </li>\
    <li><a><i class="fa fa-edit"></i> Project Manage <span class="fa fa-chevron-down"></span></a>\
        <ul class="nav child_menu">\
            <li>\
                <a href="louhua_projectList.html">Project List</a>\
            </li>\
        </ul>\
    </li>\
    <li><a><i class="fa fa-edit"></i> House Manage <span class="fa fa-chevron-down"></span></a>\
        <ul class="nav child_menu">\
            <li>\
                <a href="louhua_ihave.html">I Have</a>\
            </li>\
            <li>\
                <a href="louhua_iwant.html">I Want</a>\
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
</ul>';
$('.menu_section').html(menuHtml);