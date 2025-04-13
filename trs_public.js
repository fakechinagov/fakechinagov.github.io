// JavaScript Document
$(function(){
		//璁剧疆宸︿晶鏈€灏忛珮搴�
		function minHeight(){
			var leftHeight=$('.leftPart').height();
			var rightHeight=$('.rightPart').height();
			if(leftHeight<rightHeight){
				$('.leftPart').height(rightHeight);
			}
		};
		minHeight();
		
		//闈㈠寘灞戠涓€涓姞绮�
		function breadcrumbNav(){
			$('.BreadcrumbNav a:first').css('font-weight','bold');
		};
		breadcrumbNav()
		
		//tab鏍囬绗竴涓病鏈夊乏鍐呰窛绂�
		function channelTab(){
			$('div.channel_tab2 span:first').css('padding-left','0px');
		};
		channelTab()
		
		//甯稿姟闄㈠垪琛ㄤ笅鍒掔嚎鏈€鍚庝竴涓幓鎺�
		function cwhybox2(){
			$('.cwhybox2 ul li:last').css('border-bottom','none');
		};
		cwhybox2()

		// 鍘婚櫎缁嗚鐨則itle
		$(".pages_content img").attr("title", "")
})