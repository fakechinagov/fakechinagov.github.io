/* 鏀垮簻缃戠珯pub.js
* 1.IsIE8锛氭槸鍚e8娴忚鍣�
* 2.IsPC锛氭槸鍚C绔�
* 3.PcBackTop锛歅C绔洖鍒伴《閮�
* 4.Debounce锛氶槻鎶�
* 6.MobiBackTop锛氭墜鏈虹鍥炲埌椤堕儴
*/

var trs = (function () {
  function IsIE8() {
    var isIE = userAgentInfo.indexOf("compatible") > -1 && userAgentInfo.indexOf("MSIE") > -1;
    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgentInfo);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion <= 8) {
        return;
      }
    }
  }
  function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }
  function debounce(fn,wait){
    var timer = null;
    return function(){
      if(timer !== null){
        clearTimeout(timer);
      }
      timer = setTimeout(fn,wait);
    }
  }
  function PcBackTop() {
    var dom = '<div id="back_top" class="back_top"><a>鍥炲埌椤堕儴</a></div>'
    $('#back_top').remove()
    if (IsPC()) {
      $('body').append(dom)
    }
    $(window).scroll(function () {
      if ($(window).scrollTop() > 0) {
        $("#back_top").fadeIn(400);
      } else { $("#back_top").fadeOut(400); }
    });
    $("#back_top").click(function () {
      $('body,html').animate({ scrollTop: 0 }, 200);
      return false;
    });
  }
  function MobiBackTop() {
    var dom = '<div id="mobi_back_top" class="m_back_top pchide"><a>鍥炲埌椤堕儴</a></div>'
    $('#mobi_back_top').remove()
    if (!IsPC()) {
      $('body').append(dom)
    }else{
      $('#mobi_back_top').remove()
    }
    $(window).scroll(function () {
      if ($(window).scrollTop() > 0) {
        $("#mobi_back_top").fadeIn(400);
      } else { $("#mobi_back_top").fadeOut(400); }
    });
    $("#mobi_back_top").click(function () {
      $('body,html').animate({ scrollTop: 0 },200);
      return false;
    });
  }
  function SearchFn(){
    $('#searchBtn').on('click',function(){
      var winWidth = $(window).width();
      $(this).toggleClass('active');
      $('.header .searchBox').toggleClass('active');
      if($(this).hasClass('active')){
        $('.search_mi').focus()
      }
      if ($("#iframe_header").length > 0 && $('.header >.pchide:visible').length >0) {
        $("#iframe_header_p",parent.document).height(Math.ceil($("#iframe_header").outerHeight()*winWidth/750));
      }
    })
  }
  function Tabs (dom) {
    var index = null
    $(dom+' .nav').on('mouseover','span',function(){
      index = $(this).index()
      $(this).addClass('active').siblings().removeClass('active');
      $(dom).find('.ctx .item').eq(index).addClass('active').siblings().removeClass('active');
    })
  }
  function H5Banner () {

  }

  return {
    IsPC: IsPC,
    IsIE8: IsIE8,
    PcBackTop: PcBackTop,
    MobiBackTop:MobiBackTop,
    SearchFn: SearchFn,
    Tabs: Tabs,
    H5Banner: H5Banner
  }
})();

/*** 娉ㄥ唽鐧诲綍绛�  ***/
function gettime() {
  var d = new Date();
  var formatNumber = function(num) {
    return num > 0 && num < 10 ? '0' + num : num;
  };
  return d.getFullYear() + "" + formatNumber(d.getMonth() + 1) + formatNumber(d.getDate()) + formatNumber(d.getHours()) + formatNumber(d.getMinutes()) + formatNumber(d.getSeconds());
}

function GetQueryString(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = decodeURI(window.location.search).substr(1).match(reg);
  if(r!=null)return  r[2]; return null;
}

var servicecode = GetQueryString("servicecode");
// var gourl = document.referrer;
var gourl = encodeURI(top.location.href);
var time = GetQueryString("time");
var sign = GetQueryString("sign");
var showname = GetQueryString("showname");
if(servicecode==null||servicecode==""||time==null||time==""||sign==null||sign==""){
  servicecode = "trs";
  time = gettime();
  sign = hex_md5(servicecode + 'CfQ9MR5u' + time);
}

$(function (){
  idm.config({
    debug: false, // 寮€鍚皟璇曟ā寮�,璋冪敤鐨勬墍鏈塧pi鐨勮繑鍥炲€间細鍦ㄥ鎴风alert
    url:'https://user.www.gov.cn',		// 蹇呭～锛宨dm鍦板潃
    servicecode: servicecode, 				// 蹇呭～锛屾帴鍏ヤ唬鐮�
    time: time,
    sign: sign,	// 蹇呭～锛岀鍚�
    success:function(){	// 鍥炶皟鍑芥暟锛堟垚鍔燂級
      isloginNew();
    },
    fail:function(r)	{	// 鍥炶皟鍑芥暟(澶辫触)
      $(".nologin").removeClass("hide");
    }
  });

  $('#userreg, #userreg1').click(function(){
    idm.user.openreg ({
      redirect:true,
      gourl: gourl,// 涓氬姟鍦板潃锛氶潪蹇呭～銆傚洖璋冩€诲叆鍙ｅ皢浠p鍙傛暟杩斿洖
      extargs: ''		// 鎵╁睍鍙傛暟锛氶潪蹇呭～銆傚洖璋冨皢鍥炰紶
    });
  });
  $('#userlogin, #userlogin1').click(function(){
    idm.user.openlogin ({
      redirect:true,
      gourl: gourl,// 涓氬姟鍦板潃锛氶潪蹇呭～銆傚洖璋冩€诲叆鍙ｅ皢浠p鍙傛暟杩斿洖
      extargs: ''		// 鎵╁睍鍙傛暟锛氶潪蹇呭～銆傚洖璋冨皢鍥炰紶
    });
  });
  $('#usercenter').click(function(){
    idm.user.openedit ({
      // gourl: gourl	// 绁ㄦ嵁锛氶潪蹇呭～銆�
    });
  });
  $('#showname1').click(function(){ // wap
    idm.user.open ({
      ticket: ''	// 绁ㄦ嵁锛氶潪蹇呭～銆�
    });
  });
  $("#logout, #logOutBtn1").click(function(){
    idm.user.logout({
      success:function(){	// 鍥炶皟鍑芥暟锛堟垚鍔燂級
        if(gourl!=null&&gourl!=""){
          top.location.href = gourl;
        }else{
          top.location.href = 'https://user.www.gov.cn';
        }
      },
      fail:function(r)	{	// 鍥炶皟鍑芥暟(澶辫触)

      }
    });
  });
  $("#logOutBtn1").click(function(){ // wap
    idm.user.logout({
      success:function(){	// 鍥炶皟鍑芥暟锛堟垚鍔燂級
        var gourlM = GetQueryString("gourl");
        if(gourlM!=null&&gourlM!=""){
          top.location.href = gourlM;
        }else{
          top.location.href = 'https://user.www.gov.cn';
        }
      },
      fail:function(r)	{	// 鍥炶皟鍑芥暟(澶辫触)

      }
    });
  });

  // 鏌ョ湅鐢佃剳鐗�
  $('#godesktop').on('click', function () {
    var isShowPc = localStorage.setItem('isShowPc', true)
    $("meta[name='viewport']").attr("content", "width=1280, target-densitydpi=device-dpi")
    $('body').append('<div id="showMobi" class="showMobi"><img src="/images/trs_mobiIcon.png" ignoreapd="true" />杩斿洖鎵嬫満鐗�</div>')
  });
  // 杩斿洖鎵嬫満鐗�
  $('body').on('click', '#showMobi', function () {
    var isShowPc = localStorage.setItem('isShowPc', false)
    $("meta[name='viewport']").attr("content", "width=750, user-scalable=no, target-densitydpi=device-dpi")
    $('#showMobi').remove()
  });

});

function isloginNew(){
  idm.user.islogin ({
    success:function(r){	// 鍥炶皟鍑芥暟锛堟垚鍔燂級
      var showname = r.showname;
      if(showname==undefined){
        showname = "****";
      }
      //娉ㄦ剰 杩欎釜鑴辨晱鎵嬫満鍙疯繘琛屼簡淇敼 椤甸潰涓婃樉绀哄彧鑳借揪鍒板叓涓瓧绗�
      if(showname.length==11){
        showname = showname.replace('****','*');
      }else{
        showname = "  "+showname;
      }
      $("#showname, #showname1").html(showname);
      $(".yeslogin").removeClass("hide");
      $(".nologin").addClass("hide");
    },
    fail:function(r)	{	// 鍥炶皟鍑芥暟(澶辫触)
      $(".nologin").removeClass("hide");
      $(".yeslogin").addClass("hide");
    }
  });
}

