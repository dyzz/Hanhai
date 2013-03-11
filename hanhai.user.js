// ==UserScript==
// @name          Hanhai
// @description   Add Keyboard Shortcuts for bbs*.ustc.edu.cn
// @include       http://bbs*.ustc.edu.cn/*
// @icon          http://jknp-hanhai.googlecode.com/hg/icon.png
// @author        Zhong Zhuang <dyzz@mail.ustc.edu.cn>
// @website       http://code.google.com/p/jknp-hanhai/
// @version       0.999
// ==/UserScript==

var BoardName;
// list of threads on board page
var ThreadList;
// link to threads
var ThreadLink;
// list of posts on thread view
var PostList;
// list of quotes
var QuoteList;
// positions of each thread 
var Positions;

// url to prev/next page
var hasPrev;
var PrevPage;
var hasNext;
var NextPage;

var current=0;
var max;

var triggerScroll = true;



var debug = true;

var origin_color = '#F5F5F5';
var mark_color ='#CCD1DD';
// var mark_post = '#DEDEDE';
var mark_post =  '#E8E8E8';

function dev(msg)
{
    if(debug) 
    {alert( msg);}
}


function isBoard () 
{
    return( (/^http(s)?:\/\/bbs([\d])?.ustc.edu.cn\/cgi\/bbs(t)?doc(.)*/i.test(document.location)) 
	    // ||
	    // (/^http(s)?:\/\/bbs([\d])?.ustc.edu.cn\/cgi\/bbsgetmsg/i.test(document.location))
	  );
}

function isThread()
{
    return(/^http(s)?:\/\/bbs([\d])?.ustc.edu.cn\/cgi\/bbstcon(.)*/i.test(document.location));
}

function isSingleThread()
{
    return(/^http(s)?:\/\/bbs([\d])?.ustc.edu.cn\/cgi\/bbscon(.)*/i.test(document.location));
}

function isLeft()
{
    return(/^http(s)?:\/\/bbs([\d])?.ustc.edu.cn\/cgi\/bbsleft/i.test(document.location));
}

function markerBoard(i)
{
    ThreadList.snapshotItem(i).style.backgroundColor = mark_color;
    // document.location.replace ='current-'+current;
}

function unmarkerBoard(i)
{
    ThreadList.snapshotItem(i).style.backgroundColor = origin_color; 
}

function findPos(obj) 
{
    var curleft = 0;
    var curtop = 0;
    if (obj.offsetParent) {
	do {
	    curleft += obj.offsetLeft;
	    curtop += obj.offsetTop;
	} while (obj = obj.offsetParent);
	return [curleft,curtop];
    }
}

function scrollToPost(i)
{
    var t = PostList.snapshotItem(i);
    if(i>0){
	var pos = findPos(t);
	window.scrollTo(pos[0],pos[1]-10);
    } else {
	window.scrollTo(0,0);
    }
}

function markerPost(i)
{
    PostList.snapshotItem(i).style.backgroundColor = mark_post;
    scrollToPost(i);
}

function unmarkerPost(i)
{
    PostList.snapshotItem(i).style.backgroundColor = origin_color;
}


function getBoardName()
{
    var board=document.evaluate("/html/body[@class='postlist_body']/div[1][@class='info']/span[2]/strong",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    if(board.snapshotItem(0)) {
	BoardName=board.snapshotItem(0).innerHTML;	
    }
}

// toggle board view
function toggleView()
{
    var loc=document.location.toString();
    var link;
    // normal view
    if(loc.indexOf("bbstdoc") == -1) {
	link = "/cgi/bbstdoc?board="+BoardName;
    } else {
	link = "/cgi/bbsdoc?board="+BoardName;
    }
    window.open(link,'_self');
}

function backtoBoard()
{
    // var link = "/cgi/bbstdoc?board="+BoardName;
    // window.open(link,'_self');
    history.go(-1);
}

function getLinks()
{
    var Titles = document.evaluate("//td[@class='title']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    ThreadLink = new Array();
    for (var i = 0; i < Titles.snapshotLength; i++) {
	var thisTitle = Titles.snapshotItem(i);
	var rawlinks = thisTitle.innerHTML.replace(/\&amp;/g,'&').split("</a>");
	if(rawlinks.length>2)
	{ 
	    var origin = (rawlinks[0].match(/(?:href=")(.*)(?=")/))[1];
	    var full = (rawlinks[1].match(/(?:href=")(.*)(?=")/))[1];
	    ThreadLink[i] = [origin,full];
	}
	else
	{
	    var full = (rawlinks[0].match(/(?:href=")(.*)(?=")/))[1];
	    ThreadLink[i] = [full,full];
	}
    }
    var fix = ThreadLink.length - max - 1;
    for (var i = 0; i<fix; i++) {
	ThreadLink.shift();
    }
}

function enterThread(i)
{
    var link = (ThreadLink[i])[1];
    window.open(link,'_self');
}

function enterFullThread(i)
{
    var link = (ThreadLink[i])[0];
    window.open(link,'_self');
}

function outerHTML(node){
    return node.outerHTML || new XMLSerializer().serializeToString(node);
}

function getPN()
{
    var next =  document.evaluate("//a[@class='next']",document,null,
				  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    if(next.snapshotLength>0)
    {
	var str = outerHTML(next.snapshotItem(0));
	var res = (str.replace(/\&amp;/g,'&').match(/(?:href=")(.*)(?=")/))[1];
	NextPage = res;
	hasNext = true;
    } else {
	hasNext = false;
    }
    
    var prev = document.evaluate("//a[@class='prev']",document,null,
				 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    if(prev.snapshotLength>0)
    {
	var str = outerHTML(prev.snapshotItem(0));
	var res = (str.replace(/\&amp;/g,'&').match(/(?:href=")(.*)(?=")/))[1];
	PrevPage = res;
	hasPrev = true;
    } else {
	hasPrev = false;	
    }


}

function getThreads()
{
    ThreadList = document.evaluate("//tr[@class='new' or @class='old' or @class ='m' or @class ='M' or @class='B' or @class='b' or @class='G' or @class='g']",document,null,
				   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    max = ThreadList.snapshotLength-1;
    if(/&highlight=bot/i.exec(document.location)) 
    {
	current = max;
    } else {
	current = 0;
    }    
    var hash = document.location.hash;
    var match = hash.match(/#current-(\d+)/i);
    if(match) {
	current = parseInt(match[1]);
    } 
    markerBoard(current);	
    getLinks();
    getPN();    
}

var helpBoard = "<ul style=\"margin:0;text-align:left;\">"
		+ "<li>j/k 上下选择帖子</li>"
		+ "<li>n/p 翻页</li>"
		+ "<li>l或者回车 同主题打开 L 仅打开当前的主题</li>"
		+ "<li>t切换同主题模式</li>"
		+ "<li>r刷新</li>"
		+ "<li>w发帖</li>"
		+ "<li>s显示版面搜索</li>"
		+ "<li>空格切换备选项</li>"
		+ "<li>h显示帮助</li>"
		+ "</ul>";

var helpThread ="<ul style=\"margin:0;text-align:left;\">"
                + "<li>j/k 上下选择回复 </li>"
                + "<li>n/p 翻页 </li>"
                + "<li>r回复当前主题 R回复楼主 </li>"
                + "<li>q返回上一页 </li>"
		+ "<li>s显示版面搜索</li>"
		+ "<li>空格切换备选项</li>"
		+ "<li>h显示帮助</li>"
		+ "</ul>";

function displayHelp(content)
{
    var help = document.createElement("div");
    help.id = "help";
    help.style.cssText = "text-align:center;position:absolute;top:50%;left: 50%;width:16em;height:14em;opacity:1;margin-top: -9em;margin-left: -15em;border: 1px solid #ccc;background-color: #f0f0f0;";
    help.innerHTML = content;
    document.body.appendChild(help);
    var fade;
    var counter=20;
    window.setTimeout(
	function(){
	    fade=window.setInterval(
		function ()
		{
		    if (counter>0) 
		    {
			help.style.opacity=""+(counter/20);counter--;
		    } else {
			window.clearInterval(fade);document.body.removeChild(help);
		    }
		}
		,25)}
	,2000);
}

function KeyHandlerBoard(e)
{
    var w=e.which;
    if(e.target.id!="board_sel"){
	switch(w)
	{
	    // "j" or "J"
	case 106:
	case 74:
	    if(current<max){
		unmarkerBoard(current);
		current+=1;
		markerBoard(current);
	    } else if(hasNext) {
		window.open(NextPage+"&highlight=top","_self");
	    }	    
	    break;
	    // "k" or "K"
	case 107:
	case 75:
	    if(current>0){
		unmarkerBoard(current);
		current-=1;
		markerBoard(current);
	    } else if(hasPrev) {
		window.open(PrevPage+"&highlight=bot","_self");	    
	    }
	    break;
	    // "l" or "enter"
	case 108:
	case 13:
	    document.location.hash = "current-"+current;
	    enterFullThread(current);
	    break;
	    // "L"
	case 76:
	    document.location.hash = "current-"+current;
	    enterThread(current);
	    break;
	    // "n" or "N"
	case 110:
	case 78:
	    if(hasNext) {
		window.open(NextPage,"_self");
	    }
	    break;
	    // "p" or "P"
	case 112:
	case 80:
	    if(hasPrev) {
		window.open(PrevPage,"_self");	    
	    }
	    break;
	    // "h" or "H"
	case 104:
	case 72:
	    displayHelp(helpBoard);
	    break;
	    // "t" or "T"
	case 116:
	case 84:
	    toggleView();
	    break;
	    // "s" or "S"
	case 115:
	case 83:
	    showForm();
	    break;
	    // "r" or "R"
	case 114:
	case 82:
	    document.location.hash = "current-"+current;
	    document.location.reload(true);
	    break;
	    // "w" or "W"
	case 119:
	case 87:
	    document.location="/cgi/bbspst?board="+BoardName;
	    break;
	    // "ESC""
	case 27:
	    hideForm();
	    break;
	default:
	    return;
	};
	
    }
    // e.stopPropagation();
}

function getQuotes()
{
    // TODO
    QuoteList = document.evaluate("//div[@class='quote']",document,null,
				 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}

var showQuote = false;

function toggleQuote()
{
    var len = QuoteList.snapshotLength;
    if( len == 0 ) 
    {
	return;
    } else {
	var vis ;
	if(showQuote) { vis ="";} else {vis="none";};
	showQuote = !showQuote;
	for(var i=0;i<len;i++) 
	{
	    (QuoteList.snapshotItem(i)).style.display = vis;
	}
    }
    markerPost(current);

}


function getPosts()
{
    PostList = document.evaluate("//table[@class='bbsconbody']",document,null,
				 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    max = PostList.snapshotLength-1;
    markerPost(current);
    getQuotes();
    getPN();
}

function getReplyURL(i)
{
    var post = PostList.snapshotItem(i);
    // bbspst?board=CS&amp;fn=M4D2AC048    
    var res = post.innerHTML.match(/bbspst(.*)fn=[A-Z0-9]*/);
    return ((res[0]).replace(/\&amp;/g,'&'));
}

function replyPost(toCurrent)
{
    var url;
    if(toCurrent) {
	url=getReplyURL(current);
    } else {
	url=getReplyURL(0);
    }
    window.open("/cgi/"+url,"_self");
}

var timeoutHandler;

function buildCompletion(matches)
{
    var completion = "";
    var len = matches.length;
    for(var i=0;i<len;i++)
    {
    	var html = (matches[i])[0];
    	// var name = row.cells[2].innerHTML;
    	completion = completion + ("<li>"+html+"</li>");
    }
    completion = "<ol style=\"margin:0px;float:left; \">" + completion + "</ol>";
    return completion;
}

var matches=[];
var ready=false;

function showSuggestion(xhr)
{
    ready=false;
    var response = xhr.responseText;
    matches = [];
    response.replace(/[^<]*(<a href=([^>]+)>([^<]+)<\/a>)/g, function () {
			 matches.push(Array.prototype.slice.call(arguments, 1, 4));
		     });
    var len = matches.length;
    if(len>9) {
	matches = matches.slice(0,9);
	len=9;
    }
    var completion;
    if(matches.length > 0 )
    {
	completion = buildCompletion(matches);
	if (matches.length == 1 ) 
	{
	    var link = (matches[0])[1];
	    document.location = link;
	}
    } else {
	// meta refresh url=bbsdoc?board=blah
	var meta = [];
	response.replace( /url=([^']+)/g , function () {
			 meta.push(arguments[1]);
		     } );
	if(meta.length==0) {
	    completion = "Not found!";
	} else {
	    document.location = meta[0];
	    completion = "Redirecting...";
	}
    }
    var suggest = document.getElementById('suggest');
    suggest.innerHTML = completion;
    ready=true;
}

var match_idx ;

function doRequest()
{
    var name = document.getElementById('board_sel').value;
    if(name.length>0) {
	var xhr = new XMLHttpRequest();
	var url = "/cgi/bbssel";
	var params = "board="+name;
	//alert(params);
	xhr.open("POST", url+"?"+params, true);
	xhr.onreadystatechange = function() {//Call a function when the state changes.
	    if(xhr.readyState == 4 && xhr.status == 200) {
		match_idx = 0;
		showSuggestion(xhr);
	    }
	};
	xhr.send(params);
    }
}


function doXHR (e)
{
    var w=e.which;
    var ESC=27;
    var enter=13;
    var up=38;
    var down=40;
    var ctrl=17;
    var space=32;
    switch(w)
    {
    case ESC:
	hideForm();
	break;
    case space:
	var input = document.getElementById('board_sel');
	input.value= input.value.slice(0, -1);
	if(ready) {
	    if(matches.length==0) {
		break;
	    } else {
		var cur = match_idx;
		input.value=(matches[cur])[2];
		// goto match
		if(timeoutHandler) {
		    clearTimeout(timeoutHandler);
		}
		var value = parseInt(cur.toString());
		timeoutHandler = setTimeout(function(){document.location=(matches[value])[1];},800);
		match_idx = (match_idx+1)%(matches.length);
	    }
	}
	break;
    default :
	if(timeoutHandler) {
	    clearTimeout(timeoutHandler);
	}
	timeoutHandler = setTimeout(doRequest, 500);
    }
    e.stopPropagation();
    e.preventDefault();
}


function insert_form()
{
    var form = document.createElement("div");
    form.id = "board_input";
    form.className = "dummy";
    form.style.cssText = "text-align:center;position:absolute;top:50%;left: 50%;width:16em;height:18em;margin-top: -9em;margin-left: -15em;border: 1px solid #ccc;background-color: #f3f3f3; display:none";
    form.innerHTML =
	'<form>'
	+ '<input type="text" id="board_sel" name="board_sel" autocomplete="off" /><br/>'
	+ '<span style="color:#555">空格键自动补全</span>'
	+ '</form>'
	+ '<div id="suggest" ></div>';
    form.addEventListener('keyup', doXHR,true);
    document.body.appendChild(form);
}

function showForm()
{
    insert_form();
    var form = document.getElementById('board_input');
    if(form) {
	form.style.display="";
	setTimeout("document.getElementById('board_sel').focus()",100);
    }
}

function hideForm()
{
    var form = document.getElementById("board_input");
    form.style.display="none";
    document.body.removeChild(form);
}


function KeyHandlerThread(e)
{
    var w=e.which;
    if(e.target.id!="board_sel"){
	switch(w)
	{
	    // "j" or "J"
	case 106:
	case 74:
	    document.removeEventListener("scroll",FollowScroll,true);
	    // triggerScroll = false;
	    if(current<max){
		unmarkerPost(current);
		current+=1;
		markerPost(current);
	    } else if(hasNext) {
		window.open(NextPage,"_self");
	    }
	    document.addEventListener("scroll",FollowScroll,true);
	    // triggerScroll = true;
	    break;
	    // "k" or "K"
	case 107:
	case 75:
	    document.removeEventListener("scroll",FollowScroll,true);
	    // triggerScroll = false;
	    if(current>0){
		unmarkerPost(current);
		current-=1;
		markerPost(current);
	    }  else if(hasPrev) {
		window.open(PrevPage,"_self");	    
	    }
	    document.addEventListener("scroll",FollowScroll,true);
	    // triggerScroll = true;
	    break;
	    // "h" or "H"
	case 104:
	case 72:
	    displayHelp(helpThread);
	    break;
	    // "n" or "N"
	case 110:
	case 78:
	    if(hasNext) {
		window.open(NextPage,"_self");
	    }
	    break;
	    // "p" or "P"
	case 112:
	case 80:
	    if(hasPrev) {
		window.open(PrevPage,"_self");	    
	    }
	    break;
	    // "s" or "S"
	case 115:
	case 83:
	    showForm();
	    break;
	    // "t" or "T"
	case 116:
	case 84:
	    document.removeEventListener("scroll",FollowScroll,true);
	    toggleQuote();
	    document.addEventListener("scroll",FollowScroll,true);
	    break;
	    // "r"
	case 114:
	    replyPost(true);
	    break;
	    // "R"
	case 82:
	    replyPost(false);
	    break;
	    // "q" or "Q"
	case 113:
	case 81:
	    backtoBoard();
	    break;
	default:
	    return;
	}
    }
    e.stopPropagation();
}
    
function KeyHandlerSThread(e)
{
    var w=e.which;
    if(e.target.id!="board_sel"){
	switch(w)
	{
	    // "s" or "S"
	case 115:
	case 83:
	    showForm();
	    break;
	    // "r"
	case 114:
	    replyPost(true);
	    break;
	    // "R"
	case 82:
	    replyPost(false);
	    break;
	    // "q" or "Q"
	case 113:
	case 81:
	    backtoBoard();
	    break;
	default:
	    return;
	}
    }
    e.stopPropagation();
}

// function createDocumentFragmentByString(str) {  
//     var range = document.createRange()  ;
//     range.setStartAfter(document.body)  ;
//     return range.createContextualFragment(str)  ;
// }  

// function createDoc(str) {  
//     var html = str.replace(/<!DOCTYPE.*?>/, '').replace(/<html.*?>/, '').replace(/<\/html>.*/, '')  ;
//     var htmlDoc  = document.implementation.createDocument(null, 'html', null)  ;
//     var fragment = createDocumentFragmentByString(html)  ;
//     htmlDoc.documentElement.appendChild(htmlDoc.importNode(fragment, true))  ;
//     return htmlDoc  ;
// }  




function FollowScroll()        
{       
    var current_top;
    if (navigator.userAgent.indexOf("Firefox")==-1)
    {	
	current_top = document.body.scrollTop;
    } else {
	current_top = document.body.parentNode.scrollTop;    
    };
    var max = PostList.snapshotLength;
    for(var i=0;i<max;i++) 
    {
	var item = PostList.snapshotItem(i);
	var item_top = (findPos(item))[1];
	if(item_top>current_top) 
	{
	    if(i!=current)
	    {
		PostList.snapshotItem(i).style.backgroundColor = mark_post;
		PostList.snapshotItem(current).style.backgroundColor = origin_color;
		current = i;
	    }	    
	    break;
	}	
    }

}            


if(isBoard()){     
    getBoardName();
    getThreads();    
    // fix refresh button issuse
    var elements = document.getElementsByClassName("reload"); 
    (elements[0]).href = "javascript:document.location.reload(true)";
    document.addEventListener("keyup",KeyHandlerBoard,true);    
    window.focus();
} else if (isThread()) {            
    // document.body.focus();        
    // getBoardName();
    // alert(BoardName);    
    // document.getElementById("findex").focus();
    getPosts();     
    getQuotes();
    // Positions = [];
    // var len = PostList.snapshotLength;
    // for(var i=0;i<len;i++) 
    // {
    // 	Positions.push(findPos(PostList.snapshotItem(i)));
    // }
    // if (navigator.userAgent.indexOf("Firefox")==-1)
    // { 
	document.addEventListener("scroll",FollowScroll,true); 
    // }
    document.addEventListener("keyup",KeyHandlerThread,true);    
    window.focus();
} else if (isSingleThread()) {
    getPosts();        
    document.addEventListener("keyup",KeyHandlerSThread,true);
}    
;







