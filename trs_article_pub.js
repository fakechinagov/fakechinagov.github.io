;$(function(){

	// 鏀跨瓥绫绘枃浠朵富棰樺垎绫诲鐞�
	$('.zcwj_ztfl').each(function (){
	  var t = $.trim($(this).text()) || '';
	  if (t.length >0) {
		$(this).text($(this).text().replace('涓婚鍒嗙被\\', ''));
	  }
	});
	
	//瀛椾綋澶т腑灏�
  
	  // $(".index_switchsize .medium").css({
	  // 	color:'#ff0000'
	  // });
	  $(".index_switchsize span").click(function(){
  
		  // $(this).css({
		  // 	color:'#ff0000'
		  // }).siblings().css({
		  // 	color:'#666'
		  // });
  
		  //鑾峰彇para鐨勫瓧浣撳ぇ灏�
		  var thisEle = $(".pages_content p,.pages_content,.pages_content font,.pages_content span,.pages_content div").css("font-size");
		  //parseFloat鐨勭浜屼釜鍙傛暟琛ㄧず杞寲鐨勮繘鍒讹紝10灏辫〃绀鸿浆涓�10杩涘埗
		  var textFontSize = parseFloat(thisEle , 10);
		  //javascript鑷甫鏂规硶
		  var unit = thisEle.slice(-2); //鑾峰彇鍗曚綅
		  var cName = $(this).attr("class");
		  if(cName.indexOf('bigger') != -1){
				  textFontSize = 30;
			  $(this).addClass('on').siblings().removeClass('on')
		  }else if(cName.indexOf('big') != -1){
				  textFontSize = 25;
			  $(this).addClass('on').siblings().removeClass('on')
		  }
		  else if(cName.indexOf('default') != -1){
				//   textFontSize = 16;
				  location.reload();
			  $(this).addClass('on').siblings().removeClass('on')
		  }
		  //璁剧疆para鐨勫瓧浣撳ぇ灏�
		  $(".pages_content p,.pages_content,.pages_content font,.pages_content span,.pages_content div").css("font-size",  textFontSize + unit );
	  });
  
	  $(".index_switchsize .default").click(function(){
		  $(".pages_content p,.pages_content,.pages_content font,.pages_content span,.pages_content div").css("font-size","16px");
	  });
  
  
	//鎵撳嵃
	var printAreaCount = 0;
	var removePrintArea = function (id) {
	  $("iframe#" + id).remove();
	};
	$.fn.printArea = function () {
	  var ele = $(this);
	  var idPrefix = "printArea_";
	  removePrintArea(idPrefix + printAreaCount);
	  printAreaCount++;
	  var iframeId = idPrefix + printAreaCount;
	  var iframeStyle = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;';
	  iframe = document.createElement('IFRAME');
	  $(iframe).attr({
		style: iframeStyle,
		id: iframeId
	  });
	  document.body.appendChild(iframe);
	  var doc = iframe.contentWindow.document;
	  $(document).find("link").filter(function () {
		return $(this).attr("rel").toLowerCase() == "stylesheet" && $(this).attr('href').indexOf('mobile')<=0;
	  }).each(function () {
		doc.write('<link type="text/css" rel="stylesheet" href="' + $(this).attr("href") + '"/>');
	  });
	  $('style').each(function (){
		doc.write('<style>' + $(this).html() + '</style>');
	  });
	  doc.write('<div class="' + $(ele).attr("class") + '" style="width: ' + $(ele).width() + 'px">' + $(ele).html() + '</div>');
	  $('[data-print=js]').each(function (){
		doc.write('<script type="text/javascript" src="' + $(this).attr("src") + '"></script>');
	  });
	  doc.close();
	  var frameWindow = iframe.contentWindow;
	  frameWindow.close();
	  frameWindow.focus();
	  setTimeout(function (){
		frameWindow.print();
	  },500)
	}
	$(".customPrintIco").click(function(){
	  $(".printArea").printArea();
	});
  
  var list01li = $('.list01 li');
		var li_len = list01li.length;
		if(li_len == 0)
		$('.xg-list').hide();
  
  
	  $('.pages_content img').parent('span').css('text-indent',0)
  
  
  //榧犳爣婊戣繃鍙橀€忔槑
	  function HoverFade(butn){
		  $(butn).hover(
			  function(){
				  $(this).fadeTo(200,.8)
			  },
			  function(){
				  $(this).fadeTo(200,1)
			  }
		  )
	  }
	  HoverFade('.butn,.newPicture dl');
  
  
	  //鍥炲埌椤堕儴
	  $(".back_top").hide();//棣栧厛灏�.back_top闅愯棌
	  $(window).scroll(function() {
				  if ($(window).scrollTop() > 0) {$(".back_top").fadeIn(400);
				  } else { $(".back_top").fadeOut(400); }
	  });//褰撴粴鍔ㄦ潯鐨勪綅缃浜庤窛椤堕儴100鍍忕礌浠ヤ笅鏃讹紝璺宠浆閾炬帴鍑虹幇锛屽惁鍒欐秷澶�
	  $(".back_top a").click(function() {
				  $('body,html').animate({scrollTop: 0},200);
				  return false;
	  }); //褰撶偣鍑昏烦杞摼鎺ュ悗锛屽洖鍒伴〉闈㈤《閮ㄤ綅缃�
  
  
  
  
		  //璁剧疆宸︿晶鏈€灏忛珮搴�
		  var leftHeight=$('.leftPart').height();
		  var rightHeight=$('.rightPart').height();
		  if(leftHeight<rightHeight){
			  $('.leftPart').height(rightHeight);
		  }
  
	  // 鏀跨瓥鏂囦欢缁嗚
	  if ($('.jiedu-blk').length > 0) {
		if ($('ul.jiedu_list li').length <= 0) {
		  $('.jiedu-blk').hide();
		}
	  }
  
  })
  