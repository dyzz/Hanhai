var c=true,e=null,g=false,h,i,j,k,l,m,n,o,p,q=0,r,s="#F5F5F5",t="#CCD1DD",u="#E8E8E8";function v(a){i.snapshotItem(a).style.backgroundColor=t}function w(a){var b=0,d=0;if(a.offsetParent){do{b+=a.offsetLeft;d+=a.offsetTop}while(a=a.offsetParent);return[b,d]}}function x(a){k.snapshotItem(a).style.backgroundColor=u;var b=k.snapshotItem(a);if(a>0){a=w(b);window.scrollTo(a[0],a[1]-10)}else window.scrollTo(0,0)}function y(a){return a.outerHTML||(new XMLSerializer).serializeToString(a)}
function z(){var a=document.evaluate("//a[@class='next']",document,e,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,e);if(a.snapshotLength>0){a=y(a.snapshotItem(0));p=a=a.replace(/\&amp;/g,"&").match(/(?:href=")(.*)(?=")/)[1];o=c}else o=g;a=document.evaluate("//a[@class='prev']",document,e,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,e);if(a.snapshotLength>0){a=y(a.snapshotItem(0));n=a=a.replace(/\&amp;/g,"&").match(/(?:href=")(.*)(?=")/)[1];m=c}else m=g}
var A='<ul style="margin:0;text-align:left;"><li>j/k \u4e0a\u4e0b\u9009\u62e9\u5e16\u5b50</li><li>n/p \u7ffb\u9875</li><li>l\u6216\u8005\u56de\u8f66 \u540c\u4e3b\u9898\u6253\u5f00 L \u4ec5\u6253\u5f00\u5f53\u524d\u7684\u4e3b\u9898</li><li>t\u5207\u6362\u540c\u4e3b\u9898\u6a21\u5f0f</li><li>r\u5237\u65b0</li><li>w\u53d1\u5e16</li><li>s\u663e\u793a\u7248\u9762\u641c\u7d22</li><li>\u7a7a\u683c\u5207\u6362\u5907\u9009\u9879</li><li>h\u663e\u793a\u5e2e\u52a9</li></ul>',B='<ul style="margin:0;text-align:left;"><li>j/k \u4e0a\u4e0b\u9009\u62e9\u56de\u590d </li><li>n/p \u7ffb\u9875 </li><li>r\u56de\u590d\u5f53\u524d\u4e3b\u9898 R\u56de\u590d\u697c\u4e3b </li><li>q\u8fd4\u56de\u4e0a\u4e00\u9875 </li><li>s\u663e\u793a\u7248\u9762\u641c\u7d22</li><li>\u7a7a\u683c\u5207\u6362\u5907\u9009\u9879</li><li>h\u663e\u793a\u5e2e\u52a9</li></ul>';
function C(a){var b=document.createElement("div");b.id="help";b.style.cssText="text-align:center;position:absolute;top:50%;left: 50%;width:16em;height:14em;opacity:1;margin-top: -9em;margin-left: -15em;border: 1px solid #ccc;background-color: #f0f0f0;";b.innerHTML=a;document.body.appendChild(b);var d,f=20;window.setTimeout(function(){d=window.setInterval(function(){if(f>0){b.style.opacity=""+f/20;f--}else{window.clearInterval(d);document.body.removeChild(b)}},25)},2E3)}
function D(a){var b=a.which;if(a.target.id!="board_sel")switch(b){case 106:case 74:if(q<r){i.snapshotItem(q).style.backgroundColor=s;q+=1;v(q)}else o&&window.open(p+"&highlight=top","_self");break;case 107:case 75:if(q>0){i.snapshotItem(q).style.backgroundColor=s;q-=1;v(q)}else m&&window.open(n+"&highlight=bot","_self");break;case 108:case 13:document.location.hash="current-"+q;window.open(j[q][0],"_self");break;case 76:document.location.hash="current-"+q;window.open(j[q][1],"_self");break;case 110:case 78:o&&
window.open(p,"_self");break;case 112:case 80:m&&window.open(n,"_self");break;case 104:case 72:C(A);break;case 116:case 84:window.open(document.location.toString().indexOf("bbstdoc")==-1?"/cgi/bbstdoc?board="+h:"/cgi/bbsdoc?board="+h,"_self");break;case 115:case 83:E();break;case 114:case 82:document.location.hash="current-"+q;document.location.reload(c);break;case 119:case 87:document.location="/cgi/bbspst?board="+h;break;case 27:F()}}
function G(){l=document.evaluate("//div[@class='quote']",document,e,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,e)}var H=g;function I(){k=document.evaluate("//table[@class='bbsconbody']",document,e,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,e);r=k.snapshotLength-1;x(q);G();z()}function J(a){return k.snapshotItem(a).innerHTML.match(/bbspst(.*)fn=[A-Z0-9]*/)[0].replace(/\&amp;/g,"&")}function K(a){a=a?J(q):J(0);window.open("/cgi/"+a,"_self")}var L;
function M(a){for(var b="",d=a.length,f=0;f<d;f++)b+="<li>"+a[f][0]+"</li>";return'<ol style="margin:0px;float:left; ">'+b+"</ol>"}var N=[],O=g;
function P(a){O=g;a=a.responseText;N=[];a.replace(/[^<]*(<a href=([^>]+)>([^<]+)<\/a>)/g,function(){N.push(Array.prototype.slice.call(arguments,1,4))});var b=N.length;if(b>9){N=N.slice(0,9);b=9}if(N.length>0){a=M(N);if(N.length==1)document.location=N[0][1]}else{var d=[];a.replace(/url=([^']+)/g,function(f,Y){d.push(Y)});if(d.length==0)a="Not found!";else{document.location=d[0];a="Redirecting..."}}document.getElementById("suggest").innerHTML=a;O=c}var Q;
function R(){var a=document.getElementById("board_sel").value;if(a.length>0){var b=new XMLHttpRequest;a="board="+a;b.open("POST","/cgi/bbssel?"+a,c);b.onreadystatechange=function(){if(b.readyState==4&&b.status==200){Q=0;P(b)}};b.send(a)}}
function S(a){switch(a.which){case 27:F();break;case 32:var b=document.getElementById("board_sel");b.value=b.value.slice(0,-1);if(O)if(N.length==0)break;else{var d=Q;b.value=N[d][2];L&&clearTimeout(L);var f=parseInt(d.toString());L=setTimeout(function(){document.location=N[f][1]},800);Q=(Q+1)%N.length}break;default:L&&clearTimeout(L);L=setTimeout(R,500)}a.stopPropagation();a.preventDefault()}
function E(){var a=document.createElement("div");a.id="board_input";a.className="dummy";a.style.cssText="text-align:center;position:absolute;top:50%;left: 50%;width:16em;height:18em;margin-top: -9em;margin-left: -15em;border: 1px solid #ccc;background-color: #f3f3f3; display:none";a.innerHTML='<form><input type="text" id="board_sel" name="board_sel" autocomplete="off" /><br/><span style="color:#555">\u7a7a\u683c\u952e\u81ea\u52a8\u8865\u5168</span></form><div id="suggest" ></div>';a.addEventListener("keyup",
S,c);document.body.appendChild(a);if(a=document.getElementById("board_input")){a.style.display="";setTimeout("document.getElementById('board_sel').focus()",100)}}function F(){var a=document.getElementById("board_input");a.style.display="none";document.body.removeChild(a)}
function aa(a){var b=a.which;if(a.target.id!="board_sel")switch(b){case 106:case 74:document.removeEventListener("scroll",T,c);if(q<r){k.snapshotItem(q).style.backgroundColor=s;q+=1;x(q)}else o&&window.open(p,"_self");document.addEventListener("scroll",T,c);break;case 107:case 75:document.removeEventListener("scroll",T,c);if(q>0){k.snapshotItem(q).style.backgroundColor=s;q-=1;x(q)}else m&&window.open(n,"_self");document.addEventListener("scroll",T,c);break;case 104:case 72:C(B);break;case 110:case 78:o&&
window.open(p,"_self");break;case 112:case 80:m&&window.open(n,"_self");break;case 115:case 83:E();break;case 116:case 84:document.removeEventListener("scroll",T,c);b=l.snapshotLength;if(b!=0){var d;d=H?"":"none";H=!H;for(var f=0;f<b;f++)l.snapshotItem(f).style.display=d;x(q)}document.addEventListener("scroll",T,c);break;case 114:K(c);break;case 82:K(g);break;case 113:case 81:history.go(-1);break;default:return}a.stopPropagation()}
function ba(a){var b=a.which;if(a.target.id!="board_sel")switch(b){case 115:case 83:E();break;case 114:K(c);break;case 82:K(g);break;case 113:case 81:history.go(-1);break;default:return}a.stopPropagation()}
function T(){var a;a=navigator.userAgent.indexOf("Firefox")==-1?document.body.scrollTop:document.body.parentNode.scrollTop;for(var b=k.snapshotLength,d=0;d<b;d++){var f=k.snapshotItem(d);if(w(f)[1]>a){if(d!=q){k.snapshotItem(d).style.backgroundColor=u;k.snapshotItem(q).style.backgroundColor=s;q=d}break}}}
if(/^http(s)?:\/\/bbs([\d])?.ustc.edu.cn\/cgi\/bbs(t)?doc(.)*/i.test(document.location)){var U=document.evaluate("/html/body[@class='postlist_body']/div[1][@class='info']/span[2]/strong",document,e,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,e);if(U.snapshotItem(0))h=U.snapshotItem(0).innerHTML;i=document.evaluate("//tr[@class='new' or @class='old' or @class ='m' or @class ='M' or @class='B' or @class='b' or @class='G' or @class='g']",document,e,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,e);r=i.snapshotLength-
1;q=/&highlight=bot/i.exec(document.location)?r:0;var V=document.location.hash.match(/#current-(\d+)/i);if(V)q=parseInt(V[1]);v(q);var W=document.evaluate("//td[@class='title']",document,e,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,e);j=[];for(var X=0;X<W.snapshotLength;X++){var Z=W.snapshotItem(X).innerHTML.replace(/\&amp;/g,"&").split("</a>");if(Z.length>2){var ca=Z[0].match(/(?:href=")(.*)(?=")/)[1],$=Z[1].match(/(?:href=")(.*)(?=")/)[1];j[X]=[ca,$]}else{$=Z[0].match(/(?:href=")(.*)(?=")/)[1];j[X]=
[$,$]}}var da=j.length-r-1;for(X=0;X<da;X++)j.shift();z();document.getElementsByClassName("reload")[0].href="javascript:document.location.reload(true)";document.addEventListener("keypress",D,c);window.focus()}else if(/^http(s)?:\/\/bbs([\d])?.ustc.edu.cn\/cgi\/bbstcon(.)*/i.test(document.location)){I();G();document.addEventListener("scroll",T,c);document.addEventListener("keypress",aa,c);window.focus()}else if(/^http(s)?:\/\/bbs([\d])?.ustc.edu.cn\/cgi\/bbscon(.)*/i.test(document.location)){I();document.addEventListener("keypress",
ba,c)};