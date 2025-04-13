$(document).on('keydown',function(event){
  if (!(trs.IsPC())) {
    return;
  }
  if(event.key){
    if(
      (
        event.key === 'p'&&
        event.ctrlKey
      )
      ||
      (
        event.keyCode === 80&&
        event.ctrlKey  
      )
    ){
      event.preventDefault();
      forPrintEventListenerFn('beforeprint')
      return;
    }
  }
});


//閽堝鏌愮粏瑙堝ぇ閲忔搷浣�
var XL_OPERATION_SET = {
  //閽堝 鏀跨瓥_鍥藉姟闄㈤儴闂ㄦ枃浠剁粏瑙�
  ZC_GWYBMWJ_Fn:function(eleOP){
    //澶撮儴妗嗘爣棰樸€佸彂鏂囧瓧鍙�
    var titleContent = '',
        documentNumberContent = ''
    ;
    $('.pctoubukuang1 td').each(function(i,o){
      switch($(this).text()){
        case '鏍嚶犅犻锛�':
          titleContent = $(this).next('td').text();
          break;
        case '鍙戞枃瀛楀彿锛�':
          documentNumberContent = $(this).next('td').text();
          break;
        default:
          break;
      }

    });
    var _oldStyleVale = eleOP.attr('style');
    
    if(
      eleOP.css('zoom')!=='1.7'
      ||eleOP.get(0).nodeName!=='DIV'
      ||eleOP.get(0).nodeName!=='TABLE'
    ){//濡傛灉瀹冧笉鏄鏂囧ぇ鏍囬灏卞鐞�
      eleOP.css('cssText',_oldStyleVale+';'+'zoom:1.8');
    }

    var eleArr = [];
    eleArr.push(eleOP);
    eleOP.find('span,font').each(function(i,o){
      eleArr.push($(o))
    })

    //澶ф爣棰榗ss
    var FIRST_LEVEL_TITLE_CSSO1 = {
      'line-height': 1.3,
      'zoom': 1.7,
      'font-size':'24px'
    }

    $.each(eleArr,function(index,ele){
        //澶ф爣棰�
        if (
            (
              $(ele).css('font-family').indexOf('瀹嬩綋') === 0 
              || $(ele).css('font-family').indexOf('瀹嬩綋') === 1
            ) 
            && $(ele).css('font-size') === '24px' 
            && 
            (
              $(ele).find('strong').length > 0 
              || $(ele).find('b').length > 0
              || $(ele).find('*[style]').filter(function(){return /font-weight: bold/.test($(this).attr('style')) }).length > 0
              ||$(ele).css('font-weight')==='700'
            )
        )
        {
          //濡傛灉瀹冩槸p鍏冪礌锛屽氨鐩存帴鎵ц
          if($(ele).get(0).nodeName === 'P'){
            $(ele).css(FIRST_LEVEL_TITLE_CSSO1);  
          }else{
            $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);   
          }
        }
        else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄1
          $(ele).text().replace(/\n*\s*/g,'')===titleContent
        ){
          //濡傛灉瀹冩槸p鍏冪礌锛屽氨鐩存帴鎵ц
          if($(ele).get(0).nodeName === 'P'){
            $(ele).css(FIRST_LEVEL_TITLE_CSSO1);  
          }else{
            $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);   
          }             
        }else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄2
          $(ele).text().replace(/\n*\s*/g,'')+$(ele).parents('span').next().text().replace(/\n*\s*/g,'') === titleContent
        ){
          $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);
        }else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄3
          $(ele).text().replace(/\n*\s*/g,'')+$(ele).next().text().replace(/\n*\s*/g,'') === titleContent
        ){
          //濡傛灉瀹冩槸p鍏冪礌锛屽氨鐩存帴鎵ц
          if($(ele).get(0).nodeName === 'P'){
            $(ele).css(FIRST_LEVEL_TITLE_CSSO1);  
            $(ele).next('p').css(FIRST_LEVEL_TITLE_CSSO1);
          }else{
            $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);
            $(ele).parents('p').next('p').css(FIRST_LEVEL_TITLE_CSSO1);
          }      
        }else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄4
          $(ele).text().replace(/\n*\s*/g,'')+$(ele).parents('p').next().text().replace(/\n*\s*/g,'') === titleContent
        ){
          $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);
          $(ele).parents('p').next('p').css(FIRST_LEVEL_TITLE_CSSO1);
        }
        
        //鍒ゆ柇鍙戞枃瀛楀彿鏄惁涓庡ぇ鏍囬鍦ㄥ悓涓€p娈佃惤
        if(
          (
            $(ele).text().replace(/\n/g,'')===documentNumberContent
            ||($(ele).text().replace(/\n/g,'')+$(ele).next('span').text().replace(/\n/g,''))===documentNumberContent
          )
          &&$(ele).parents('p').css('zoom')==='1.7'
        ){
          var _nextP = eleOP.clone();  
          _nextP.html($(ele))
          _nextP.css({
            'zoom':'1.8',
            'font-size':'',
            'line-height':'',
          });
          _nextP.find('br').remove();//濡傛灉鏈夊洖杞﹀氨鍒犳帀
          eleOP.after(_nextP.clone());
          eleOP.css('margin-bottom','0');//杩庡悎璇ョ粏瑙堝師鏈塻tyle锛岃鍙戞枃瀛楀彿涓庡ぇ鏍囬闈犺繎浜�
          $(ele).remove();
        }

        //淇敼绌烘钀借楂�
        if (
          $(ele).children().length === 1 
          && $(ele).children('br').length === 1
          &&
          (
            $(ele).css('zoom') !== '1.7'//涓嶈兘鏄鏂囧ぇ鏍囬
          )
        ) {
            $(ele).css('line-height', 1.8);
        }
    });

  },
  //閽堝 鏀跨瓥_鍥藉姟闄㈤儴闂ㄦ枃浠剁粏瑙� 鐏嫄
  ZC_GWYBMWJ_FirefoxFn:function(eleOP){
    //澶撮儴妗嗘爣棰樸€佸彂鏂囧瓧鍙�
    var titleContent = '',
        documentNumberContent = ''
    ;
    $('.pctoubukuang1 td').each(function(i,o){
      switch($(this).text()){
        case '鏍嚶犅犻锛�':
          titleContent = $(this).next('td').text();
          break;
        case '鍙戞枃瀛楀彿锛�':
          documentNumberContent = $(this).next('td').text();
          break;
        default:
          break;
      }

    });
    var _oldStyleVale = eleOP.attr('style');

    var eleArr = [];
    eleArr.push(eleOP);
    eleOP.find('span,font').each(function(i,o){
      eleArr.push($(o))
    })

    //澶ф爣棰榗ss
    var FIRST_LEVEL_TITLE_CSSO1 = {
      'line-height': 1.3,
      'font-size':'47px',
    }

    $.each(eleArr,function(index,ele){
        //澶ф爣棰�
        if (
            (
              $(ele).css('font-family').indexOf('瀹嬩綋') === 0 
              || $(ele).css('font-family').indexOf('瀹嬩綋') === 1
            ) 
            && $(ele).css('font-size') === '24px' 
            && 
            (
              $(ele).find('strong').length > 0 
              || $(ele).find('b').length > 0
              || $(ele).find('*[style]').filter(function(){return /font-weight: bold/.test($(this).attr('style')) }).length > 0
              ||$(ele).css('font-weight')==='700'
            )
        )
        {
          //濡傛灉瀹冩槸p鍏冪礌锛屽氨鐩存帴鎵ц
          if($(ele).get(0).nodeName === 'P'){
            $(ele).css(FIRST_LEVEL_TITLE_CSSO1);   
          }else{
            $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);   
          }

        }
        else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄1
          $(ele).text().replace(/\n*\s*/g,'')===titleContent
        ){
          //濡傛灉瀹冩槸p鍏冪礌锛屽氨鐩存帴鎵ц
          if($(ele).get(0).nodeName === 'P'){
            $(ele).css(FIRST_LEVEL_TITLE_CSSO1);   
          }else{
            $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);   
          }       
        }else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄2
          $(ele).text().replace(/\n*\s*/g,'')+$(ele).parents('span').next().text().replace(/\n*\s*/g,'') === titleContent
        ){
          $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);
        }else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄3
          $(ele).text().replace(/\n*\s*/g,'')+$(ele).next().text().replace(/\n*\s*/g,'') === titleContent
        ){
          //濡傛灉瀹冩槸p鍏冪礌锛屽氨鐩存帴鎵ц
          if($(ele).get(0).nodeName === 'P'){
            $(ele).css(FIRST_LEVEL_TITLE_CSSO1);  
            $(ele).next('p').css(FIRST_LEVEL_TITLE_CSSO1);
          }else{
            $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);
            $(ele).parents('p').next('p').css(FIRST_LEVEL_TITLE_CSSO1);
          }      
        }else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄4
          $(ele).text().replace(/\n*\s*/g,'')+$(ele).parents('p').next().text().replace(/\n*\s*/g,'') === titleContent
        ){
          $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);
          $(ele).parents('p').next('p').css(FIRST_LEVEL_TITLE_CSSO1);
        }
        
        else if(
          $(ele).css('font-size')!=='47px'
        ){
          $(ele).css({
            'font-size':'33px'
          });
        }
        
        //鍒ゆ柇鍙戞枃瀛楀彿鏄惁涓庡ぇ鏍囬鍦ㄥ悓涓€p娈佃惤
        if(
          (
            $(ele).text().replace(/\n/g,'')===documentNumberContent
            ||($(ele).text().replace(/\n/g,'')+$(ele).next('span').text().replace(/\n/g,''))===documentNumberContent
          )
          &&$(ele).parents('p').css('font-size')==='47px'
        ){
          var _nextP = eleOP.clone();  
          _nextP.html($(ele))
          _nextP.css({
            'font-size':'33px',
            'line-height':''
          });
          _nextP.find('br').remove();//濡傛灉鏈夊洖杞﹀氨鍒犳帀
          eleOP.after(_nextP.clone());
          eleOP.css('margin-bottom','0');//杩庡悎璇ョ粏瑙堝師鏈塻tyle锛岃鍙戞枃瀛楀彿涓庡ぇ鏍囬闈犺繎浜�
          $(ele).remove();
        }

        //淇敼绌烘钀借楂�
        if (
          $(ele).children().length === 1 
          && $(ele).children('br').length === 1
          &&
          (
            $(ele).css('font-size') !== '47px'//涓嶈兘鏄鏂囧ぇ鏍囬
          )
        ) {
            $(ele).css('line-height', 2);
        }
    });
  },
  //閽堝 淇℃伅鍏紑_鍥藉姟闄㈡枃浠� 缁嗚
  XXGK_GWYWJ_Fn:function(eleOP){

    //澶撮儴妗嗘爣棰樸€佸彂鏂囧瓧鍙�
    var titleContent = '',
        documentNumberContent = ''
    ;
    $('.pctoubukuang1 td').each(function(i,o){
      switch($(this).text()){
        case '鏍囥€€銆€棰橈細':
          titleContent = $(this).next('td').text();
          break;
        case '鍙戞枃瀛楀彿锛�':
          documentNumberContent = $(this).next('td').text();
          break;
        default:
          break;
      }
    });


    /* 
      濡傛灉璇ュ瓙鍏冪礌涓嶆槸p鍏冪礌锛屾槸table 閭ｅ氨鏌ョ湅td閲岀殑鍏冪礌鏄惁鏈夎p鍖呯潃锛屽鏋滄病p锛屽氨璁剧疆涓€涓猵锛堣В鍐虫潅涔辨棤绔犵殑table 鏃跺€欎笉鏀惧ぇ闂锛�
    */
    if(eleOP.get(0).nodeName==='TABLE'){
      if(eleOP.find('p').length===0){
        eleOP.find('td').each(function(i,o){
          $(o).html("<p>"+$(o).html()+"</p>");
        });
      }
    }    

    var _oldStyleVale = eleOP.attr('style');
    if(
      eleOP.css('zoom')!=='1.7'
      ||eleOP.get(0).nodeName!=='DIV'
      ||eleOP.get(0).nodeName!=='TABLE'
    ){//濡傛灉瀹冧笉鏄鏂囧ぇ鏍囬灏卞鐞�
      eleOP.css('cssText',_oldStyleVale+';'+'zoom:1.8');
    }

    var eleArr = [];
    eleArr.push(eleOP);
    eleOP.find('span,font').each(function(i,o){
      eleArr.push($(o))
    })

    //澶ф爣棰榗ss
    var FIRST_LEVEL_TITLE_CSSO1 = {
      'line-height': 1.3,
      'zoom': 1.7,
      'font-size':'24px'
    }


    /**
      娉細
      1锛屾煡鐪嬪ぇ鏍囬鍏冪礌閲屾槸鍚﹀寘鍚湁 鈥滃彂鏂囧瓧鍙封€濓紝濡傛灉鏈夐渶瑕佸鐞嗕竴涓�
      2锛岃嫢璇ユ钀藉寘鍚€滃彂鏂囧瓧鍙封€� 璇ユ柟娉曞垽鏂満鏅粯璁や笅涓€涓钀� 鈥滀笉鏄ぇ鏍囬鈥濆惁鍒欎細鏈夐棶棰�
      
      curEle 褰撳墠鍏冪礌
      curP 褰撳墠娈佃惤
    */
    function _ifHasDocumentNumberFn(curEle,curP){

        //濡傛灉curP 涓� p 鍏冪礌
        if(curP.get(0).nodeName !== 'P'){
          return;
        }

        //鍒ゆ柇鍙戞枃瀛楀彿鏄惁涓庡ぇ鏍囬鍦ㄥ悓涓€p娈佃惤
        if(
          curEle.text().replace(/\n/g,'')===documentNumberContent
          ||(curEle.text().replace(/\n/g,'')+curEle.next('span').text().replace(/\n/g,''))===documentNumberContent
        ){
          var _nextP = curP.clone();
          _nextP.html(curEle)
          _nextP.css({
            'zoom':'1.8',
            'font-size':'',
            'line-height':'',
          });
          _nextP.find('br').remove();//濡傛灉鏈夊洖杞﹀氨鍒犳帀
          curP.after(_nextP.clone());
          curEle.remove();
        }else if(
          curP.find('[style*="妤蜂綋_GB2312"]').length
        ){
          var _documentNumberEle = curP.find('[style*="妤蜂綋_GB2312"]')
          var _nextP = curP.clone();
          _nextP.html(_documentNumberEle)
          _nextP.css({
            'zoom':'1.8',
            'font-size':'',
            'line-height':'',
          });
          _nextP.find('br').remove();//濡傛灉鏈夊洖杞﹀氨鍒犳帀
          curP.after(_nextP.clone());
          _documentNumberEle.remove();
        }else if(
          curP.find('[style*="妤蜂綋"]').length
        ){
          var _documentNumberEle = curP.find('[style*="妤蜂綋"]')
          var _nextP = curP.clone();
          _nextP.html(_documentNumberEle)
          _nextP.css({
            'zoom':'1.8',
            'font-size':'',
            'line-height':'',
          });
          _nextP.find('br').remove();//濡傛灉鏈夊洖杞﹀氨鍒犳帀
          curP.after(_nextP.clone());
          _documentNumberEle.remove();
        }else if(
          curP.find('[face*=妤蜂綋_GB2312]').length
        ){
          var _documentNumberEle = curP.find('[face*=妤蜂綋_GB2312]')
          var _nextP = curP.clone();
          _nextP.html(_documentNumberEle)
          _nextP.css({
            'zoom':'1.8',
            'font-size':'',
            'line-height':'',
          });
          _nextP.find('br').remove();//濡傛灉鏈夊洖杞﹀氨鍒犳帀
          curP.after(_nextP.clone());
          _documentNumberEle.remove();
        }
    }
  
    $.each(eleArr,function(index, ele) {
    // $('#UCAP-CONTENT-FORPRINT p,#UCAP-CONTENT-FORPRINT span').each(function(index, ele) {
        //澶ф爣棰�
        if (
          (
            $(ele).css('font-family').indexOf('瀹嬩綋') === 0 
            || $(ele).css('font-family').indexOf('瀹嬩綋') === 1
          ) 
          && $(ele).css('font-size') === '24px' 
          && 
          (
            $(ele).find('strong').length > 0 
            || $(ele).find('b').length > 0
            || $(ele).find('*[style]').filter(function(){return /font-weight: bold/.test($(this).attr('style')) }).length > 0
            ||$(ele).css('font-weight')==='700'
          )
        )
        {
          //濡傛灉瀹冩槸p鍏冪礌锛屽氨鐩存帴鎵ц
          if($(ele).get(0).nodeName === 'P'){
            $(ele).css(FIRST_LEVEL_TITLE_CSSO1);  
          }else{
            $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);   
          }
          //鏌ョ湅鏄惁鏈夆€滃彂鏂囧瓧鍙封€�
          _ifHasDocumentNumberFn($(ele),eleOP);
        }
        else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄5
          $(ele).css('font-size') === '24px'
        ){
          //濡傛灉瀹冩槸p鍏冪礌锛屽氨鐩存帴鎵ц
          if($(ele).get(0).nodeName === 'P'){
            $(ele).css(FIRST_LEVEL_TITLE_CSSO1);  
          }else{
            $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);   
          }
          //鏌ョ湅鏄惁鏈夆€滃彂鏂囧瓧鍙封€�
          _ifHasDocumentNumberFn($(ele),eleOP);
        }
        else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄1
          $(ele).text().replace(/\n*\s*/g,'')===titleContent
        ){
          //濡傛灉瀹冩槸p鍏冪礌锛屽氨鐩存帴鎵ц
          if($(ele).get(0).nodeName === 'P'){
            $(ele).css(FIRST_LEVEL_TITLE_CSSO1);  
          }else{
            $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);   
          }
          //鏌ョ湅鏄惁鏈夆€滃彂鏂囧瓧鍙封€�
          _ifHasDocumentNumberFn($(ele),eleOP);
        }else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄2
          $(ele).text().replace(/\n*\s*/g,'')+$(ele).parents('span').next().text().replace(/\n*\s*/g,'') === titleContent
        ){
          $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);
          //鏌ョ湅鏄惁鏈夆€滃彂鏂囧瓧鍙封€�
          _ifHasDocumentNumberFn($(ele),eleOP);
        }else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄3
          $(ele).text().replace(/\n*\s*/g,'')+$(ele).next().text().replace(/\n*\s*/g,'') === titleContent
        ){
          //濡傛灉瀹冩槸p鍏冪礌锛屽氨鐩存帴鎵ц
          if($(ele).get(0).nodeName === 'P'){
            $(ele).css(FIRST_LEVEL_TITLE_CSSO1);  
            $(ele).next('p').css(FIRST_LEVEL_TITLE_CSSO1);
          }else{
            $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);
            $(ele).parents('p').next('p').css(FIRST_LEVEL_TITLE_CSSO1);
          }      
          //鏌ョ湅鏄惁鏈夆€滃彂鏂囧瓧鍙封€�
          _ifHasDocumentNumberFn($(ele),eleOP);
        }else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄4
          $(ele).text().replace(/\n*\s*/g,'')+$(ele).parents('p').next().text().replace(/\n*\s*/g,'') === titleContent
        ){
          $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);
          $(ele).parents('p').next('p').css(FIRST_LEVEL_TITLE_CSSO1);
          //鏌ョ湅鏄惁鏈夆€滃彂鏂囧瓧鍙封€�
          _ifHasDocumentNumberFn($(ele),eleOP);
        }



        //淇敼绌烘钀借楂�
        if (
          $(ele).children().length === 1 
          && $(ele).children('br').length === 1
          &&
          (
            $(ele).css('zoom') !== '1.7'//涓嶈兘鏄鏂囧ぇ鏍囬
          )
        ) {
            $(ele).css('line-height', 1.8);
        }
    });

  },
  //閽堝 淇℃伅鍏紑_鍥藉姟闄㈡枃浠� 缁嗚 鐏嫄
  XXGK_GWYWJ_FirefoxFn:function(eleOP){


    //澶撮儴妗嗘爣棰樸€佸彂鏂囧瓧鍙�
    var titleContent = '',
        documentNumberContent = ''
    ;
    $('.pctoubukuang1 td').each(function(i,o){
      switch($(this).text()){
        case '鏍囥€€銆€棰橈細':
          titleContent = $(this).next('td').text();
          break;
        case '鍙戞枃瀛楀彿锛�':
          documentNumberContent = $(this).next('td').text();
          break;
        default:
          break;
      }
    });

    var _oldStyleVale = eleOP.attr('style');

    var eleArr = [];
    eleArr.push(eleOP);
    eleOP.find('span,font').each(function(i,o){
      eleArr.push($(o))
    })

    //澶ф爣棰榗ss
    var FIRST_LEVEL_TITLE_CSSO1 = {
      'line-height': 1.3,
      'font-size':'47px',
    }


    /**
      娉細
      1锛屾煡鐪嬪ぇ鏍囬鍏冪礌閲屾槸鍚﹀寘鍚湁 鈥滃彂鏂囧瓧鍙封€濓紝濡傛灉鏈夐渶瑕佸鐞嗕竴涓�
      2锛岃嫢璇ユ钀藉寘鍚€滃彂鏂囧瓧鍙封€� 璇ユ柟娉曞垽鏂満鏅粯璁や笅涓€涓钀� 鈥滀笉鏄ぇ鏍囬鈥濆惁鍒欎細鏈夐棶棰�
      
      curEle 褰撳墠鍏冪礌
      curP 褰撳墠娈佃惤
    */
      function _ifHasDocumentNumberFn(curEle,curP){

        //濡傛灉curP 涓� p 鍏冪礌
        if(curP.get(0).nodeName !== 'P'){
          return;
        }

        //鍒ゆ柇鍙戞枃瀛楀彿鏄惁涓庡ぇ鏍囬鍦ㄥ悓涓€p娈佃惤
        if(
          curEle.text().replace(/\n/g,'')===documentNumberContent
          ||(curEle.text().replace(/\n/g,'')+curEle.next('span').text().replace(/\n/g,''))===documentNumberContent
        ){
          var _nextP = curP.clone();
          _nextP.html(curEle)
          _nextP.css({
            'font-size':'33px',
            'line-height':''
          });
          _nextP.find('br').remove();//濡傛灉鏈夊洖杞﹀氨鍒犳帀
          curP.after(_nextP.clone());
          curEle.remove();
        }else if(
          curP.find('[style*="妤蜂綋_GB2312"]').length
        ){
          var _documentNumberEle = curP.find('[style*="妤蜂綋_GB2312"]')
          var _nextP = curP.clone();
          _nextP.html(_documentNumberEle)
          _nextP.css({
            'font-size':'33px',
            'line-height':''
          });
          _nextP.find('br').remove();//濡傛灉鏈夊洖杞﹀氨鍒犳帀
          curP.after(_nextP.clone());
          _documentNumberEle.remove();
        }else if(
          curP.find('[style*="妤蜂綋"]').length
        ){
          var _documentNumberEle = curP.find('[style*="妤蜂綋"]')
          var _nextP = curP.clone();
          _nextP.html(_documentNumberEle)
          _nextP.css({
            'font-size':'33px',
            'line-height':''
          });
          _nextP.find('br').remove();//濡傛灉鏈夊洖杞﹀氨鍒犳帀
          curP.after(_nextP.clone());
          _documentNumberEle.remove();
        }else if(
          curP.find('[face*=妤蜂綋_GB2312]').length
        ){
          var _documentNumberEle = curP.find('[face*=妤蜂綋_GB2312]')
          var _nextP = curP.clone();
          _nextP.html(_documentNumberEle)
          _nextP.css({
            'font-size':'33px',
            'line-height':''
          });
          _nextP.find('br').remove();//濡傛灉鏈夊洖杞﹀氨鍒犳帀
          curP.after(_nextP.clone());
          _documentNumberEle.remove();
        }
    }

    $.each(eleArr,function(index, ele) {
    // $('#UCAP-CONTENT-FORPRINT p,#UCAP-CONTENT-FORPRINT span').each(function(index, ele) {
        //澶ф爣棰�
        if (
          (
            $(ele).css('font-family').indexOf('瀹嬩綋') === 0 
            || $(ele).css('font-family').indexOf('瀹嬩綋') === 1
          ) 
          && $(ele).css('font-size') === '24px' 
          && 
          (
            $(ele).find('strong').length > 0 
            || $(ele).find('b').length > 0
            || $(ele).find('*[style]').filter(function(){return /font-weight: bold/.test($(this).attr('style')) }).length > 0
            ||$(ele).css('font-weight')==='700'
          )
        )
        {
          //濡傛灉瀹冩槸p鍏冪礌锛屽氨鐩存帴鎵ц
          if($(ele).get(0).nodeName === 'P'){
            $(ele).css(FIRST_LEVEL_TITLE_CSSO1);   
          }else{
            $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);   
          } 
          //鏌ョ湅鏄惁鏈夆€滃彂鏂囧瓧鍙封€�
          _ifHasDocumentNumberFn($(ele),eleOP);
        }
        else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄5
          $(ele).css('font-size') === '24px'
        ){
          //濡傛灉瀹冩槸p鍏冪礌锛屽氨鐩存帴鎵ц
          if($(ele).get(0).nodeName === 'P'){
            $(ele).css(FIRST_LEVEL_TITLE_CSSO1);  
          }else{
            $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);   
          }
          //鏌ョ湅鏄惁鏈夆€滃彂鏂囧瓧鍙封€�
          _ifHasDocumentNumberFn($(ele),eleOP);
        } 
        else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄1
          $(ele).text().replace(/\n*\s*/g,'')===titleContent
        ){
          //濡傛灉瀹冩槸p鍏冪礌锛屽氨鐩存帴鎵ц
          if($(ele).get(0).nodeName === 'P'){
            $(ele).css(FIRST_LEVEL_TITLE_CSSO1);   
          }else{
            $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);   
          }
          //鏌ョ湅鏄惁鏈夆€滃彂鏂囧瓧鍙封€�
          _ifHasDocumentNumberFn($(ele),eleOP);
        }else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄2
          $(ele).text().replace(/\n*\s*/g,'')+$(ele).parents('span').next().text().replace(/\n*\s*/g,'') === titleContent
        ){
          $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);
          //鏌ョ湅鏄惁鏈夆€滃彂鏂囧瓧鍙封€�
          _ifHasDocumentNumberFn($(ele),eleOP);
        }else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄3
          $(ele).text().replace(/\n*\s*/g,'')+$(ele).next().text().replace(/\n*\s*/g,'') === titleContent
        ){
          //濡傛灉瀹冩槸p鍏冪礌锛屽氨鐩存帴鎵ц
          if($(ele).get(0).nodeName === 'P'){
            $(ele).css(FIRST_LEVEL_TITLE_CSSO1);  
            $(ele).next('p').css(FIRST_LEVEL_TITLE_CSSO1);
          }else{
            $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);
            $(ele).parents('p').next('p').css(FIRST_LEVEL_TITLE_CSSO1);
          }      
          //鏌ョ湅鏄惁鏈夆€滃彂鏂囧瓧鍙封€�
          _ifHasDocumentNumberFn($(ele),eleOP);
        }else if(//鐢ㄥご閮ㄦ淇℃伅杩囨护澶ф爣棰橈紝鐜拌薄4
          $(ele).text().replace(/\n*\s*/g,'')+$(ele).parents('p').next().text().replace(/\n*\s*/g,'') === titleContent
        ){
          $(ele).parents('p').css(FIRST_LEVEL_TITLE_CSSO1);
          $(ele).parents('p').next('p').css(FIRST_LEVEL_TITLE_CSSO1);
          //鏌ョ湅鏄惁鏈夆€滃彂鏂囧瓧鍙封€�
          _ifHasDocumentNumberFn($(ele),eleOP);
        }
        else if(
          $(ele).css('font-size')!=='47px'
        ){
          $(ele).css({
            'font-size':'33px'
          });
        }


        //淇敼绌烘钀借楂�
        if (
          $(ele).children().length === 1 
          && $(ele).children('br').length === 1
          &&
          (
            $(ele).css('font-size') !== '47px'//涓嶈兘鏄鏂囧ぇ鏍囬
          )
        ) {
            $(ele).css('line-height', 2);
        }
    });
  },
}


//涓轰簡鎵撳嵃鏃跺€欙紝姝ｆ枃瀛椾綋鍚屾瘮鏀惧ぇ
function forPrintFontSizeFn(beforeprint){
  if (!(trs.IsPC())) {
    return;
  }

  var oldHTMLStr = $('#UCAP-CONTENT').html();
  if($('#UCAP-CONTENT-FORPRINT').length===0){
    $('#UCAP-CONTENT').after('<div id="UCAP-CONTENT-FORPRINT"></div>')
  }

  if(beforeprint==='beforeprint'){

    $('#UCAP-CONTENT-FORPRINT').html(oldHTMLStr);

    $('#UCAP-CONTENT-FORPRINT').show();
    
  }else{
    $('#UCAP-CONTENT-FORPRINT').hide().html(oldHTMLStr).attr('class',$('#UCAP-CONTENT').attr('class'));
    $('#UCAP-CONTENT-FORPRINT #player_video').html('');//骞叉帀瑙嗛锛屽洜涓哄姞瑙嗛鏈夐棶棰�
    $('#UCAP-CONTENT-FORPRINT #player_video').remove();
  }
  
  //涓虹伀鐙愭祻瑙堝櫒鍗曠嫭鍐欑殑 _setFn()鏂规硶
  function _setForFirefoxFn(eleOP){

    var _oldStyleVale = eleOP.attr('style');
    if(eleOP.find('img').length===0){
      if(
        $('body').hasClass('XXGK_GWYWJ')//閽堝 淇℃伅鍏紑_鍥藉姟闄㈡枃浠� 缁嗚 XXGK_GWYWJ
        // ||$('body').hasClass('GWYGBXL')//閽堝 鍥藉姟闄㈠叕鎶ョ粏瑙� GWYGBXL 20230824 璇存殏涓嶄笂绾�
        ||$('body').hasClass('ZYYGWJ')//閽堝 涓ぎ鏈夊叧鏂囦欢_缁嗚 ZYYGWJ
      ){

        XL_OPERATION_SET.XXGK_GWYWJ_FirefoxFn(eleOP);

      }else if(
        $('body').hasClass('ZC_GWYBMWJ')//閽堝 鏀跨瓥_鍥藉姟闄㈤儴闂ㄦ枃浠剁粏瑙� ZC_GWYBMWJ
      ){

        XL_OPERATION_SET.ZC_GWYBMWJ_FirefoxFn(eleOP);

      }else{

        eleOP.css('cssText',_oldStyleVale+';'+'font-size:30px !important;');

      }
    }else if(
      //鏈夊浘鐗囷紝浣嗗浘鐗囦笉鏄敓鍍诲瓧鐨勬椂鍊欙紝鍐嶆搷浣�
      eleOP.find('img').length>0
      &&
      (
        Number(eleOP.find('img').attr('data-width'))>20
        &&Number(eleOP.find('img').attr('data-height'))>20
      )
    ){
      //璇ユ钀藉彲鑳藉瓨鍦ㄥ涓猧mg
      eleOP.find('img').each(function(i,o){
        $(this).wrap('<span class="imgParentEle"></span>');//瑙ｅ喅涓€涓猵娈佃惤鍖呯潃澶氫釜鍥剧墖鐨勯棶棰�
        $(this).get(0).onload=function(){
          var _thisImgWidth = $(this).get(0).width;
          var _thisImgHeight = $(this).get(0).height;

          if(_thisImgHeight<1000){
            $(this).parent('.imgParentEle').addClass('page-break-inside');
          }

          $(this).parent('.imgParentEle').height(_thisImgHeight);
          $(this).css({
            'position':'absolute',
            'left':'50%',
            'margin-left':-(_thisImgWidth/2)
          })
          
        }
      });
      //end of each
    }

  }
  // end of _setForFirefoxFn

  function _setFn(eleOP){

    //濡傛灉鏄伀鐙愭祻瑙堝櫒
    if(/(firefox)/i.test(window.navigator.userAgent)){
      _setForFirefoxFn(eleOP);
      return;
    }
    
    var _oldStyleVale = eleOP.attr('style');
    if(
      eleOP.find('img').length===0
      ||
      (//鎴栬€呴偅涓浘灞炰簬鐢熷兓瀛椾竴绫荤殑灏忓浘
        eleOP.find('img').filter(function(){
          return (
            Number($(this).attr('data-width'))<=20
            &&Number($(this).attr('data-height'))<=20
          )
        }).length>0
      )
    ){

      if(
        $('body').hasClass('XXGK_GWYWJ')//閽堝 淇℃伅鍏紑_鍥藉姟闄㈡枃浠� 缁嗚 XXGK_GWYWJ
        // ||$('body').hasClass('GWYGBXL')//閽堝 鍥藉姟闄㈠叕鎶ョ粏瑙� GWYGBXL 20230824 璇存殏涓嶄笂绾�
        ||$('body').hasClass('ZYYGWJ')//閽堝 涓ぎ鏈夊叧鏂囦欢_缁嗚 ZYYGWJ
      ){

        XL_OPERATION_SET.XXGK_GWYWJ_Fn(eleOP);

      }else if(

        $('body').hasClass('ZC_GWYBMWJ')//閽堝 鏀跨瓥_鍥藉姟闄㈤儴闂ㄦ枃浠剁粏瑙� ZC_GWYBMWJ

      ){
        XL_OPERATION_SET.ZC_GWYBMWJ_Fn(eleOP);
      }else{
        eleOP.css('cssText',_oldStyleVale+';'+'zoom:1.55');
      }
    }else if(

      //鏈夊浘鐗囷紝浣嗗浘鐗囦笉鏄敓鍍诲瓧鐨勬椂鍊欙紝鍐嶆搷浣�
      eleOP.find('img').length>0
      &&
      (
        Number(eleOP.find('img').attr('data-width'))>20
        &&Number(eleOP.find('img').attr('data-height'))>20
      )

    ){
      //璇ユ钀藉彲鑳藉瓨鍦ㄥ涓猧mg
      eleOP.find('img').each(function(i,o){
        $(this).wrap('<span class="imgParentEle"></span>');//瑙ｅ喅涓€涓猵娈佃惤鍖呯潃澶氫釜鍥剧墖鐨勯棶棰�

        var _width = $(this).attr('data-width');
        var _height = $(this).attr('data-height');

        if(_height<1000){
          $(this).parent('.imgParentEle').addClass('page-break-inside');
        }
                
        if(
          _height
          &&Number(_height)!==0
        ){
          $(this).css({
            'position':'absolute',
            'left':'50%',
            'margin-left':-(_width/2)
          })
          $(this).parent('.imgParentEle').height(_height);
        }else{
          $(this).get(0).onload=function(){
            var _thisImgWidth = $(this).get(0).width;
            var _thisImgHeight = $(this).get(0).height;

            $(this).parent('.imgParentEle').height(_thisImgHeight);
            $(this).css({
              'position':'absolute',
              'left':'50%',
              'margin-left':-(_thisImgWidth/2)
            })
          }
        }

      });
      //end of each
    }

  }
  // end of _setFn

  //濡傛灉鏈� .trs_paper_default 鍏冪礌鐨勮瘽 ,娉ㄩ噴浜�20230919 鍘熷洜锛岃繖閽熷垽鏂笉閫傜敤缁嗚澶嶆潅澶氬彉鐨刣om缁撴瀯
  // if($('#UCAP-CONTENT-FORPRINT .trs_paper_default').length>0){
  //   $('#UCAP-CONTENT-FORPRINT .trs_paper_default>*').each(function(i,o){
  //     _setFn($(o));
  //   });
  // }else{
  //   $('#UCAP-CONTENT-FORPRINT>*').each(function(i,o){
  //     _setFn($(o));
  //   });
  // }
  ;(function _findPEleFn($oP){
    if(
        ($oP.children('.trs_paper_default').length===1)
        ||($oP.children('.govdata').length===1&&$oP.children().length===1)
        ||($oP.children('[style="TEXT-ALIGN: justify"]').length===1&&$oP.children().length===1)
        ||($oP.children('.FCK__ShowTableBorders').length===1&&$oP.children().length===1)
        ||($oP.children('tbody').length===1&&$oP.children().length===1)
        ||($oP.children('tr').length===1&&$oP.children().length===1)
        ||($oP.children('td').length===1&&$oP.children().length===1)
        ||($oP.children('font').length===1&&$oP.children().length===1)
        ||($oP.children('span').length===1&&$oP.children().length===1)
    ){
      _findPEleFn($oP.children())
    }else{
      $oP.children().each(function(i,o){
        _setFn($(o));
      });
    }
  })($('#UCAP-CONTENT-FORPRINT'));


}



//鎭㈠鍒版甯哥粏瑙�
function returnNotPrintStateFn(){

  $('body').removeClass('printing');
  $('#UCAP-CONTENT').show();
  $('#UCAP-CONTENT-FORPRINT').hide();
  // switch($('.index_switchsize span.on').index()){
  //   case 0:
  //     $('body').removeClass('printingFontSizeDefault');
  //   break;
  //   case 1:
  //     $('body').removeClass('printingFontSizeBig');
  //   break;
  //   case 2:
  //     $('body').removeClass('printingFontSizeBigger');
  //   break;
  // }

  /* 
  澶撮儴妗�
  閽堝 淇℃伅鍏紑_鍥藉姟闄㈡枃浠� 缁嗚 XXGK_GWYWJ
  閽堝 鏀跨瓥_鍥藉姟闄㈤儴闂ㄦ枃浠剁粏瑙� ZC_GWYBMWJ
  */
  $('body.XXGK_GWYWJ .pctoubukuang1,body.ZC_GWYBMWJ .pctoubukuang1').eq(0).html(
    $('body.XXGK_GWYWJ .pctoubukuang1,body.ZC_GWYBMWJ .pctoubukuang1').eq(1).html()
  )
  $('body.XXGK_GWYWJ .pctoubukuang1,body.ZC_GWYBMWJ .pctoubukuang1').eq(1).html('');

  if(document.querySelector('#forPrintIMGID')){
    document.querySelector('#forPrintIMGID').remove();
  }
  // $('.locationHref').hide();
}

//鏄惁闅愯棌鍥剧墖鍙婂浘鐗囪鏄�
function isPrintPictureAndCaptionFn(){
  if(isPrintPictureAndCaptionFn.NONE_THIS_FUNCTION_CHANNELS.indexOf(INFO_FLAG.channelinfo)!==-1){
    return;
  }

  var isFunctionPlay = false;
  if(
    $('#UCAP-CONTENT img').length>0
  ){
    isFunctionPlay = true;
  }

  //鏌ョ湅鏄惁鏈� 闅愯棌鐨勫浘鐗囷紝姝ｆ枃涓湁闅愯棌鍥剧墖锛屽拷鐣ユ帀
  if($('#UCAP-CONTENT img').length>0){
    var imgParentArr = [];
    $('#UCAP-CONTENT img').each(function(i,o){
      if($(o).parent().is(':hidden')){
        imgParentArr.push('none');
      }else{
        imgParentArr.push('block');
      }
    });
    isFunctionPlay = imgParentArr.some(function(o,i){return o==='block' });
  }

  if(!isFunctionPlay){
    return;
  }

  var _is = confirm('鎵撳嵃瑕佸幓鎺夊浘鐗囧強鍥剧墖璇存槑锛岀偣鈥滅‘瀹氣€濓紝鍚﹀垯璇风偣鈥滃彇娑堚€�');//鐐瑰嚮纭畾涓哄幓鎺夛紝鐐瑰嚮鍙栨秷涓烘甯告墦鍗�

  if(_is){
    $('#UCAP-CONTENT-FORPRINT img').each(function(i,o){
      $(this).parents('p').addClass('docImgEleO');
    });
  }else{
    $('#UCAP-CONTENT-FORPRINT img').each(function(i,o){
      $(this).parents('p').removeClass('docImgEleO');
    });
  }

}
// 涓嶉渶瑕佸幓鎺夊浘鐗囩殑鏍忕洰锛屽敮涓€鏍囪瘑+鏍忕洰id
isPrintPictureAndCaptionFn.NONE_THIS_FUNCTION_CHANNELS =  [
  // '鍥捐В411653400','鍥捐В鏀跨瓥5265729228','鍥剧墖鏈€鏂�5264629207','涓ぎ鏈夊叧鏂囦欢9ebcb280979147c3b4614eafe4b0fd0a','鍥藉姟闄㈡枃浠�2bb3ea4d28344828be4d912cab858efb','鍥藉姟闄㈤儴闂ㄦ枃浠�47995','鍥藉姟闄㈡枃浠�2bb3ea4d28344828be4d912cab858efb3563','鍥捐В鏀跨瓥52657','瑙ｈ80228c04f821459aa13a3c90c2f31f97','鍥藉姟闄㈠叕鎶�','鍥藉姟闄㈠叕鎶�1954199916745','琛屾斂娉曡搴�50658','鑷劧鍦扮悊28c0fd0ba5464f01ab8e17bfa57bb69313300','涓ぎ鏈夊叧鏂囦欢9ebcb280979147c3b4614eafe4b0fd0a3224',
  // '鎵撳嵃娴嬭瘯060132410',
  "鍥剧墖鏈€鏂�5264629207","瑙嗛鏈€鏂�5264729208","鏀跨瓥5257929198","鏈€鏂癳dcdb45ea087470abd787b67d3a730413220","鍥捐В鏀跨瓥5265729228","涓ぎ鏈夊叧鏂囦欢9ebcb280979147c3b4614eafe4b0fd0a3224","琛屾斂娉曡搴�506583539","琛屾斂娉曡搴撴悳绱㈢粨鏋滈〉506643540","鐧界毊涔d721613fe0e437f9d6f2a97caadce003219","瑙ｈ80228c04f821459aa13a3c90c2f31f973227","涓撳3b356d70e8d946248e62756e98a9254e3228","閮ㄩ棬e107c7d07e0543de87f20aa10ccb9b363229","濯掍綋400483230","鍥藉姟闄㈡斂绛栨枃浠跺簱479943562","鍥藉姟闄㈡枃浠�2bb3ea4d28344828be4d912cab858efb3563","鎵嬫満绔�487823707","鍥藉姟闄㈤儴闂ㄦ枃浠�479953709","鏀跨瓥搴撶儹鎼滆瘝32328","鐑棬鎼滅储32329","閲嶈鏀跨瓥涓炬帾鍙婂疄鏂芥晥鏋淿3258632586","瀵艰_3271532715","鍔犲ぇ瀹忚鏀跨瓥璋冩帶鍔涘害32587","瀵艰_3259232592","鏀跨瓥32593","浼樺寲瀹屽杽閮ㄥ垎闃舵鎬х◣璐逛紭鎯犳斂绛朹3267432674","鎺ㄥ姩缁忔祹鎸佺画鍥炲崌鍚戝ソ鐨勪竴鎵规斂绛栨帾鏂�32675","鍑哄彴绉佸嫙鎶曡祫鍩洪噾鐩戠潱绠＄悊鏉′緥32676","寤虹珛鍋ュ叏鏀垮簻涓庡悇绫讳紒涓氬父鎬佸寲娌熼€氫氦娴佹満鍒�32677","缁熺鐢ㄥソ璐㈡斂閲戣瀺鏀跨瓥绛夎皟鎺у伐鍏烽潬鍓嶅崗鍚屽彂鍔�32678","瑙ｈ32595","棣栭〉-鍔犲ぇ瀹忚鏀跨瓥璋冩帶鍔涘害 瑙ｈ璇勮32742","鏁堟灉32596","棣栭〉-鍔犲ぇ瀹忚鏀跨瓥璋冩帶鍔涘害 瀹炴柦鏁堟灉32747","鐫€鍔涙墿澶у唴闇€32588","瀵艰_3260232602","鏀跨瓥_3260332603","寤剁画鍜屼紭鍖栨柊鑳芥簮姹借溅杞﹁締璐疆绋庡噺鍏嶆斂绛�32679","淇冭繘瀹跺眳娑堣垂32680","淇冭繘姹借溅鍜岀數瀛愪骇鍝佹秷璐�32728","鍔犲揩鎭㈠鍜屽垱鏂版秷璐瑰満鏅�32681","鎵╁ぇ鏈夋晥鎶曡祫32682","瑙ｈ_3260532605","棣栭〉-鐫€鍔涙墿澶у唴闇€ 瑙ｈ璇勮32743","鏁堟灉_3260632606","棣栭〉-鐫€鍔涙墿澶у唴闇€ 瀹炴柦鏁堟灉32748","鍔犲揩寤鸿鐜颁唬鍖栦骇涓氫綋绯�32589","瀵艰_3259732597","鏀跨瓥_3259832598","鍔犲揩鎺ㄨ繘鍏呯數鍩虹璁炬柦寤鸿32684","淇冭繘鏂拌兘婧愭苯杞︿骇涓氶珮璐ㄩ噺鍙戝睍鏋勫缓楂樿川閲忓厖鐢靛熀纭€璁炬柦浣撶郴32685","鍔犲ぇ鍔涘害鏀寔绉戞妧鍨嬩紒涓氳瀺璧�32686","鏀寔鎻愬崌鏁板瓧鍖栨櫤鑳藉寲姘村钩32688","瑙ｈ_3260032600","棣栭〉-鍔犲揩寤鸿鐜颁唬鍖栦骇涓氫綋绯� 瑙ｈ璇勮32744","鏁堟灉_3260132601","棣栭〉-鍔犲揩寤鸿鐜颁唬鍖栦骇涓氫綋绯� 瀹炴柦鏁堟灉32749","杩涗竴姝ユ繁鍖栨敼闈╂墿澶у紑鏀�32590","瀵艰_3260732607","鏀跨瓥_3260832608","鎺ㄥ姩澶栬锤绋宠妯′紭缁撴瀯_3269132691","寤鸿鍏ㄥ浗缁熶竴澶у競鍦篲3269232692","鍔犲ぇ鍔涘害绋冲璐�32700","瑙ｈ_3261032610","棣栭〉-杩涗竴姝ユ繁鍖栨敼闈╂墿澶у紑鏀� 瑙ｈ璇勮32745","鏁堟灉_3261132611","棣栭〉-杩涗竴姝ユ繁鍖栨敼闈╂墿澶у紑鏀� 瀹炴柦鏁堟灉32750","鐫€鍔涗繚闅滃拰鏀瑰杽姘戠敓32591","瀵艰_3261232612","鏀跨瓥_3261332613","鍥藉鍔╁璐锋鍏嶆伅鍙婃湰閲戝欢鏈熷伩杩�32703","浼樺寲璋冩暣绋冲氨涓氭斂绛栨帾鏂藉叏鍔涗績鍙戝睍鎯犳皯鐢�32704","鍔犲己鍖讳繚鍩洪噾浣跨敤甯告€佸寲鐩戠32705","瑙ｈ_3261532615","棣栭〉-鐫€鍔涗繚闅滃拰鏀瑰杽姘戠敓 瑙ｈ璇勮32746","鏁堟灉_3261632616","棣栭〉-鐫€鍔涗繚闅滃拰鏀瑰杽姘戠敓 瀹炴柦鏁堟灉32751","鏀跨瓥20213217","鏂囦欢搴撹浆2014淇℃伅鍏紑涓撴爮0ed0bd6eef0241a8822e20866115d7043222","鍥藉姟闄㈡枃浠跺叕鎶ユ悳绱㈡ā鍧楁殏鏈敤5b606fe588f544f0a14be0cf6d945bbe3223","鍥捐В9cf3d9d185c340fb9ade1db311a1f5863226","涓婚鏈嶅姟c7f4c4770c3f4d688aa25baa19976c903231","鍙屽垱鏀跨瓥姹囬泦鍙戝竷瑙ｈ骞冲彴609e327cb9634d069cebe37ae723c5493232","鍔炰簨鎸囧崡638d7b712e4f4bf99e0c52493a387c3e3233","鍥藉姟闄㈡枃浠�346cd43d0c4a47bfbd3f86f1750f22aa3234","閮ㄥ鏂囦欢a44b0d90bc944e499d55a2b385084ed83235","鍙戝睍鏀归潻濮攄3681596be0649c1a5c2f8d39411b1453236","鏁欒偛閮�6e95fa924e3442e490e8b459bd2990be3237","绉戞妧閮╝f1c2fc83b8c4cecb50417246bc610753238","宸ヤ笟鍜屼俊鎭寲閮�9c5271c864764e4d9aa2b276f49a303c3239","璐㈡斂閮╢6f1007b977b4d4f8b7500b098a21dee3240","浜哄姏璧勬簮绀句細淇濋殰閮�3f192075960c49adb30f74a8db4088d13241","鍐滀笟閮�9ed23f36814949f086407e66ddfa28d73242","鍟嗗姟閮╢bff098a51ba4cbb849055dead028af83243","鏂囧寲閮╝80a86208b3d48bbb2365b21ef1a55493244","浜烘皯閾惰189db714eb08451795761ca5ba28c9db3245","瀹¤缃�50a075d03f9b4cff8c549a6c26d876b33246","绋庡姟鎬诲眬6a0efbd4f8ea4d58bdd03c49d42fe1b13247","宸ュ晢鎬诲眬ec5f7165905941d1ae0af9c9ba0902f93248","閾剁洃浼�689af297fb1a45c69e6b8644508559783249","璇佺洃浼歛14fc36ba2d649be93d428aef36ab5e83250","淇濈洃浼�5111a4d14bde4fc4b2095ea03af442d93251","濯掍綋瑙ｈ9d39d5387a4c404fb5fb646adabd4fc13252","鎼滅储椤甸潰fe391de4c6c04ddcbbdc9d4b2359e0543253","鍦版柟鏂囦欢4ee078576bb74bee8fb797629de1d2a03254","鍖椾含3315b23361bc40cdb255addc2d51e5783255","澶╂触3bb10af01c234b0583b548909e427f653256","娌冲寳93e5391250574628874bda0b6bd98e563257","灞辫タ8bfb0ffb9dda424c9b1f682f72335e933258","鍐呰挋鍙d3a120eab7549b5927d9a88c1bc75293259","杈藉畞99e6e947f1084a4da3bbfe52121d67173260","鍚夋灄a85166791b174727b112be93d9c294dd3261","榛戦緳姹�51a50733d7474cec8231e0dcbe31cc0b3262","涓婃捣24152b1352dc417cae842c7398c6800b3263","姹熻嫃e39c8516e1f84834b12e34431b1baff33264","娴欐睙41878ed7a6104edba63279301701f57a3265","瀹夊窘e19a33120f31438c91b49c6230b9a15e3266","绂忓缓22e04edd7292400b94fe9d134d8e7e773267","姹熻タ83e519ca59ad4c7e862e05a7596ebebb3268","灞变笢3ce706c7dd824997af2af8e57b2f78f83269","娌冲崡86bc77d353a24028b1063a617fab91f83270","婀栧寳b52e7e5b75074a9c9c9a87cc991b82053271","婀栧崡9724b65b856b4d6bb75b9ea40d51b4523272","骞夸笢fb31712ca85b4ff998c2f473fcfc8b873273","骞胯タ5b2458ac8a3e4d4686ae0a9d47cc16d43274","娴峰崡83dddcb369b24b2abea97abdb68f38d73275","閲嶅簡3fa86c41a4e0433ab8a2812c60ce609d3276","鍥涘窛1817a1334f234eaaa5df285179e43b733277","璐靛窞89b27b4c39c444139ca4e735f685b6353278","浜戝崡1aba8b61e5164cfdb0ae297e6898db2d3279","瑗胯棌a7a877a3e86a4e07b1997b180497ea083280","闄曡タ21a2490ea3eb41359019ebb444406c0d3281","鐢樿們327e33ba895e4b839b046a5b6a87133b3282","闈掓捣82295ef37b8141aca0b506fc4a6d2c233283","瀹佸6526d6f394e841358c976dfe61e9c7643284","鏂扮枂75107718e09e4132b53684738d42d55e3285","棣欐腐24e493a9105f40aabbbda1168fb710c93286","婢抽棬3317cf91b5e1459287bbcc38da93df283287","鍙版咕621a0880a6484ad2bc2ee6cb476f876f3288","鏂扮枂鐢熶骇寤鸿鍏靛洟99fc163590904211a7ee131d3cac0c503289","鏉冨▉瑙ｈ0e3b8e22f83c46f19266d2f553b31cdc3290","鍙屽垱鍔ㄦ€乫f835106f0ee4268915df994e81542373291","鏀跨瓥鏂囦欢b52159f30a584467910e5668cda266de3292","鍥藉姟闄㈡枃浠舵竻鐞嗕笓鏍�2937815af62147b78828ade1b4e8719b3293","绠€鏀挎斁鏉冭繖浜斿勾407113328","楂樺眰澹伴煶407123329","瑙嗛407133330","鏀跨瓥鏂囦欢407143331","鏈€鏂拌繘灞�407153332","閮ㄩ棬涓炬帾407163333","鍦版柟涓炬帾407173334","绠€鏀挎斁鏉冩柊瑙傚療407193335","瑙ｈ璇勮407363336","绠€鏀挎斁鏉冨湴鏂规斂搴滃贰绀�407203337","鍥藉姟闄㈢潱鏌ョ湅绠€鏀挎斁鏉�407183338","绠€鏀挎斁鏉冩墜鏈虹増407353339","楂樺眰澹伴煶澶у浘407393938","澶у浘宓岄拡407343340","鐩綍鏌ヨ408023341","鍥藉姟闄㈡湁鍏抽儴闂ㄥ拰鐪佸尯甯傛斂搴滃叕甯冪殑2017骞翠簰鑱旂綉鏀垮姟鏈嶅姟宸ヤ綔浠诲姟杩涘害琛�410443379","閮ㄩ棬410473380","鍦版柟410483381","鎵嬫満鐗堟湰410493382","鍦板浘410543383","鍦版柟鍥藉姟闄㈡湁鍏抽儴闂ㄥ拰鐪佸尯甯傛斂搴滃叕甯冪殑2017骞翠簰鑱旂綉鏀垮姟鏈嶅姟宸ヤ綔浠诲姟杩涘害琛�411373384","鎵嬫満鐗堟湰411383385","閮ㄩ棬鍦版柟淇℃伅鍏紑涓撴爮404913386","閮ㄩ棬鍦版柟淇℃伅鍏紑涓撴爮404933387","鐩稿叧鏂囦欢404923388","鍥藉姟闄㈡湁鍏抽儴闂ㄥ拰鐪佸尯甯傛斂搴滃叕甯冪殑鍔犲揩鎺ㄨ繘浜掕仈缃戞斂鍔℃湇鍔″伐浣滄柟妗�410433389","鍦板浘宓岄拡410563390","鍦板浘410553391","鎵嬫満鐗堟湰410503392","閮ㄩ棬410453393","鍦版柟410463394","鍏姤47300e72f7394fafbed3f977cb99385d3411","鍥藉姟闄㈠叕鎶�19541999167453413","鏀垮簻閮ㄩ棬鍏姤169863412","鍦版柟鏀垮簻鍏姤169873414","鍏姤鍙充晶402593415","璧勬枡177313218","澶嶅伐澶嶄骇鏀寔鏀跨瓥涓€閿煡495263511","鍥藉姟闄㈡枃浠�495273512","鍏朵粬鏂囦欢495283513","鏀跨瓥瑙ｈ495293514","閮ㄩ棬鏂囦欢495153515","鏈€鏂版斂绛�495223516","鎵嬫満鐗堟湰495233517","绋冲矖灏变笟鏀寔鏀跨瓥涓€閿煡495923552","鏈€鏂版斂绛�496013553","鏉冨▉鍥炲簲496023554","鍥捐В绋冲矖496033555","鎵嬫満鐗堟湰496043556","涓ぎ鏈夊叧鏂囦欢495933557","鍥藉姟闄㈠強鏈夊叧鏂囦欢495943558","閮ㄩ棬鏂囦欢495953559","鍏朵粬鏂囦欢495963560","鏀跨瓥瑙ｈ495973561","鏀垮簻淇℃伅鍏紑鍒跺害500513550","2019骞存斂搴滀俊鎭叕寮€宸ヤ綔骞村害鎶ュ憡490693937","涓ぎ璐㈢粡棰嗗灏忕粍浼氳407013225","鍥藉姟闄㈠父鍔′細461203416","鍥藉姟闄㈣仈闃茶仈鎺ф満鍒�495163936","鍚勫湴鐤儏闃叉帶鏀跨瓥鎺柦涓撴爮20980","鍥藉姟闄㈡斂绛栦緥琛屽惞椋庝細461213417","绉掓噦鍥藉姟闄�461223418","鏀跨瓥鍔ㄨ461293474","鏀跨瓥涓撻461303437","鍥藉姟闄㈣仈闃茶仈鎺ф満鍒舵枃浠�495053551","鏀垮簻淇℃伅鍏紑骞冲彴496223541","鎵嬫満绔�501263542","瑙勫垝淇℃伅5150120583","鍥芥皯缁忔祹鍜岀ぞ浼氬彂灞曡鍒�5150220584","涓撻」瑙勫垝5150320585","鍥藉瑙勭珷搴�202228948","閮ㄩ棬瑙勭珷202228949","鍦版柟鏀垮簻瑙勭珷202228950","淇℃伅鍏紑bb58acb3b48f442e873bb0852939bc5417063","鍗曚釜鏍忕洰gc32417636","淇℃伅鍏紑鐩綍铏氭爮鐩甮c33117641","淇℃伅鍏紑鎸囧崡gc33017640","鐩稿叧娉曡鏂囦欢gc32717639","鏀垮簻淇℃伅鍏紑鐩綍gc32617638","鏀垮簻淇℃伅鍏紑鎸囧崡gc32517637","鍦版柟閮ㄩ棬閾炬帴4049417642","鐩稿叧娉曡鏂囦欢20981","淇℃伅鍏紑涓撴爮xml21048","鍥藉姟闄㈡枃浠秅c16017490","缁熻XML9a875c4e880049e99228d6c70022871117645","鍥藉姟闄㈢粍缁囨満鏋刧c30017622","鍥藉姟闄c30417626","鍥藉姟闄㈠姙鍏巺gc30517627","鍥藉姟闄㈢粍鎴愰儴闂╣c30317625","鍥藉姟闄㈢洿灞炵壒璁炬満鏋刧c30717629","鍥藉姟闄㈢洿灞炴満鏋刧c30117623","鍥藉姟闄㈠姙浜嬫満鏋刧c32017632","鍥藉姟闄㈢洿灞炰簨涓氬崟浣峠c30817630","鍥藉姟闄㈤儴濮旂鐞嗙殑鍥藉灞€gc30217624","鍥藉姟闄㈣浜嬪崗璋冩満鏋刧c32117633","鍏朵粬gc30617628","缁煎悎鏀垮姟gc18817511","鏀垮姟鍏紑4447417643","鏀垮姟鐫ｆ煡gc19617519","搴旀€ョ鐞唃c19517518","鐢靛瓙鏀垮姟gc19417517","鏂囩宸ヤ綔gc19317516","淇濆瘑宸ヤ綔gc19217515","淇¤gc19117514","鍙備簨鏂囧彶gc19017513","鍏朵粬gc18917512","鍥芥皯缁忔祹绠＄悊銆佸浗鏈夎祫浜х洃绠c18717510","瀹忚缁忔祹gc20317526","缁忔祹浣撳埗鏀归潻gc20217525","缁熻gc20117524","鐗╀环gc20017523","鍥芥湁璧勪骇鐩戠gc19917522","閲嶅ぇ寤鸿椤圭洰gc19717520","鍏朵粬gc19817521","璐㈡斂銆侀噾铻嶃€佸璁c18617509","璐㈡斂gc21217535","绋庡姟gc21117534","閾惰gc21017533","璐у竵锛堝惈澶栨眹锛塯c20917532","璇佸埜gc20817531","淇濋櫓gc20717530","绀句細淇＄敤浣撶郴寤鸿gc20617529","瀹¤gc20517528","鍏朵粬gc20417527","鍥藉湡璧勬簮銆佽兘婧恎c18517508","鍦熷湴gc22017543","鐭夸骇gc21917542","姘磋祫婧恎c21817541","娴锋磱gc21717540","鐓ょ偔gc21617539","鐭虫补涓庡ぉ鐒舵皵gc21517538","鐢靛姏gc21417537","鍏朵粬gc21317536","鍐滀笟銆佹灄涓氥€佹按鍒ゞc18417507","鍐滀笟銆佺暅鐗т笟銆佹笖涓歡c22417547","鏋椾笟gc22317546","姘村埄gc22217545","鍏朵粬gc22117544","宸ヤ笟銆佷氦閫歡c18317506","鏈烘鍒堕€犱笌閲嶅伐涓歡c23617559","杞诲伐绾虹粐gc23517558","鍖栧伐gc23417557","鍥介槻宸ヤ笟gc23317556","鑸ぉ銆佽埅绌篻c23217555","淇℃伅浜т笟锛堝惈鐢典俊锛塯c23117554","鍏矾gc23017553","姘磋繍gc22917552","閾佽矾gc22817551","姘戣埅gc22717550","閭斂gc22617549","鍏朵粬gc22517548","鍟嗚锤銆佹捣鍏炽€佹梾娓竒c18217505","瀵瑰缁忚锤鍚堜綔gc24217565","鍥藉唴璐告槗gc24117564","娴峰叧gc24017563","妫€楠屻€佹鐤玤c23917562","鏃呮父gc23817561","鍏朵粬gc23717560","甯傚満鐩戠銆佸畨鍏ㄧ敓浜х洃绠c18117504","宸ュ晢gc24917571","璐ㄩ噺鐩戠潱gc24817570","鏍囧噯gc24717569","椋熷搧鑽搧鐩戠gc24617568","瀹夊叏鐢熶骇鐩戠gc24517567","鍏朵粬gc24317566","鍩庝埂寤鸿銆佺幆澧冧繚鎶c18017503","鍩庡競瑙勫垝gc25517577","鍩庝埂寤鸿锛堝惈浣忔埧锛塯c25417576","鐜鐩戞祴銆佷繚鎶や笌娌荤悊gc25317575","鑺傝兘涓庤祫婧愮患鍚堝埄鐢╣c25217574","姘旇薄銆佹按鏂囥€佹祴缁樸€佸湴闇噂c25117573","鍏朵粬gc25017572","绉戞妧銆佹暀鑲瞘c17917502","绉戞妧gc25917581","鏁欒偛gc25817580","鐭ヨ瘑浜ф潈gc25717579","鍏朵粬gc25617578","鏂囧寲銆佸箍鐢点€佹柊闂诲嚭鐗坓c17817501","鏂囧寲gc26417586","鏂囩墿gc26317585","鏂伴椈鍑虹増gc26217584","骞挎挱銆佺數褰便€佺數瑙唃c26117583","鍏朵粬gc26017582","鍗敓銆佷綋鑲瞘c17717500","鍗敓gc26817590","鍖昏嵂绠＄悊gc26717589","浣撹偛gc26617588","鍏朵粬gc26517587","浜哄彛涓庤鍒掔敓鑲层€佸濂冲効绔ュ伐浣済c17617499","浜哄彛涓庤鍒掔敓鑲瞘c27117593","濡囧コ鍎跨gc27017592","鍏朵粬gc26917591","鍔冲姩銆佷汉浜嬨€佺洃瀵焔c17517498","鍔冲姩灏变笟gc27817600","绀句細淇濋殰gc27717599","浜轰簨宸ヤ綔gc27617598","鍐涜浆瀹夌疆gc27517597","鍏朵粬gc27217594","鐩戝療gc27417596","绾犳琛屼笟涓嶆涔嬮gc27317595","鍏畨銆佸畨鍏ㄣ€佸徃娉昰c17417497","鍏畨gc28217604","鍥藉瀹夊叏gc28117603","鍙告硶gc28017602","鍏朵粬gc27917601","姘戞斂銆佹壎璐€佹晳鐏緂c17317496","鍑忕伨鏁戠伨gc28917611","浼樻姎瀹夌疆gc28817610","绀句細绂忓埄gc28717609","琛屾斂鍖哄垝涓庡湴鍚峠c28617608","绀惧洟绠＄悊gc28517607","鎵惰传gc28417606","鍏朵粬gc28317605","姘戞棌銆佸畻鏁檊c17217495","姘戞棌浜嬪姟gc29117613","瀹楁暀浜嬪姟gc29017612","瀵瑰浜嬪姟gc17117494","澶栦氦銆佸浜媑c29417616","鍥介檯鏉＄害銆佸浗闄呯粍缁噂c29317615","鍏朵粬gc29217614","娓境鍙颁鲸宸ヤ綔gc17017493","娓境宸ヤ綔gc29717619","瀵瑰彴宸ヤ綔gc29617618","渚ㄥ姟宸ヤ綔gc29517617","鍥介槻gc16917492","鍥介槻鍔ㄥ憳gc29817620","鍥介槻寤鸿gc29917621","鍏朵粬gc16817491","绾歌川鐩綍涓嬭浇d3025bd07cce40cda3358626d42770a417489","绋夸欢鏁寸悊鏍忕洰璇峰嬁鍒犻櫎gc31017631","鍥藉姟闄㈠叕鎶�17713","鏈熸绠＄悊e24379e4cb3349238e4dbdefc0e2c49519491","2023骞村叕鎶�28994","1814_2023.08.2032806","1813_2023.08.1032780","1812_2023.07.3032729","1811_2023.07.2032671","1810_2023.07.1032585","1809_2023.06.3032529","1808_2023.06.2032450","1807_2023.06.1032434","1806_2023.05.3032407","1805_2023.05.2032348","1804_2023.05.1032326","1803_2023.04.3032322","1802_2023.04.2029275","1801_2023.04.1029273","1800_2023.03.3029269","1799_2023.03.2029192","1798_2023.03.1029188","1797_2023.02.2829187","1796_2023.02.2029186","1795_2023.02.1029185","1794_2023.01.3028998","1793_2023.01.2028996","1792_2023.01.1028995","2022骞村叕鎶�28810","1790_2022.12.2028853","1789_2022.12.1028844","1788_2022.11.3028843","1787_2022.11.2028842","1786_2022.11.1028841","1785_2022.10.3028840","1784_2022.10.2028839","1783_2022.10.1028838","1782_2022.09.3028837","1781_2022.09.2028836","1780_2022.09.1028835","1779_2022.08.3028834","1778_2022.08.2028833","1777_2022.08.1028832","1776_2022.07.3028831","1775_2022.07.2028830","1774_2022.07.1028829","1773_2022.06.3028828","1772_2022.06.2028827","1771_2022.06.1028826","1770_2022.05.3028825","1769_2022.05.2028824","1768_2022.05.1028823","1767_2022.04.3028822","1766_2022.04.2028821","1765_2022.04.1028820","1764_2022.03.3028819","1763_2022.03.2028818","1762_2022.03.1028817","1761_2022.02.2828816","1760_2022.02.2028815","1759_2022.02.1028814","1758_2022.01.3028813","1757_2022.01.2028812","1756_2022.01.1028811","2021骞村叕鎶�19524","1754_2021.12.2028809","1753_2021.12.1028808","1752_2021.11.3028807","1751_2021.11.2028806","1750_2021.11.1028805","1749_2021.10.3028804","1748_2021.10.2028803","1747_2021.10.1028802","1746_2021.09.3028801","1745_2021.09.2028800","1744_2021.09.1021468","1743_2021.08.3019533","1742_2021.08.2019534","1741_2021.08.1019535","1740_2021.07.3019536","1739_2021.07.2019537","1738_2021.07.1019539","1737_2021.06.3019540","1736_2021.06.2019541","1735_2021.06.1019542","1734_2021.05.3019543","1733_2021.05.2019544","1732_2021.05.1019545","1731_2021.04.3019546","1730_2021.04.2019547","1729_2021.04.1019548","1728_2021.03.3019525","1727_2021.03.2019526","1726_2021.03.1019527","1725_2021.02.2819528","1724_2021.02.1019529","1723_2021.02.1019530","1722_2021.01.3019531","1721_2021.01.2019532","1720_2021.01.1019538","2020骞村叕鎶�19549","1718_2020.12.2019557","1717_2020.12.1019558","1716_2020.11.3019559","1715_2020.11.2019560","1714_2020.11.1019561","1713_2020.10.3019562","1712_2020.10.2019564","1711_2020.10.1019565","1710_2020.09.3019566","1709_2020.09.2019567","1708_2020.09.1019568","1707_2020.08.3019569","1706_2020.08.2019570","1705_2020.08.1019571","1704_2020.07.3019572","1703_2020.07.2019573","1702_2020.07.1019575","1701_2020.06.3019576","1700_2020.06.2019577","1699_2020.06.1019578","1698_2020.05.3019579","1697_2020.05.2019580","1696_2020.05.1019581","1695_2020.04.3019582","1694_2020.04.2019583","1693_2020.04.1019584","1692_2020.03.3019550","1691_2020.03.2019551","1690_2020.03.1019552","1689_2020.02.2919553","1688_2020.02.2019554","1687_2020.02.1019555","1686_2020.01.3019556","1685_2020.01.2019563","1684_2020.01.1019574","2019骞村叕鎶�19585","1682_2019.12.2019593","1681_2019.12.1019594","1680_2019.11.3019595","1679_2019.11.2019596","1678_2019.11.1019597","1677_2019.10.3019598","1676_2019.10.2019600","1675_2019.10.1019601","1674_2019.09.3019602","1673_2019.09.2019603","1672_2019.09.1019604","1671_2019.08.3019605","1670_2019.08.2019606","1669_2019.08.1019607","1668_2019.07.3019608","1667_2019.07.2019609","1666_2019.07.1019612","1665_2019.06.3019613","1664_2019.06.2019614","1663_2019.06.1019615","1662_2019.05.3019616","1661_2019.05.2019617","1660_2019.05.1019618","1659_2019.04.3019619","1658_2019.04.2019620","1657_2019.04.1019621","1656_2019.03.3019586","1655_2019.03.2019587","1654_2019.03.1019588","1653_2019.02.2819589","1652_2019.02.2019590","1651_2019.02.1019591","1650_2019.01.3019592","1649_2019.01.2019599","1648_2019.01.1019611","2018骞村叕鎶�19624","1646_2018.12.2019633","1645_2018.12.1019634","1644_2018.11.3019635","1643_2018.11.2019636","1642_2018.11.1019637","1641_2018.10.3019638","1640_2018.10.2019640","1639_2018.10.1019641","1638_2018.09.3019642","1637_2018.09.2019643","1636_2018.09.1019644","1635_2018.08.3019645","1634_2018.08.2019646","1633_2018.08.1019647","1632_2018.07.3019648","1631_2018.07.2019649","1630_2018.07.1019651","1629_2018.06.3019652","1628_2018.06.2019653","1627_2018.06.1019654","1626_2018.05.3019655","1625_2018.05.2019656","1624_2018.05.1019657","1623_2018.04.3019658","1622_2018.04.2019659","1621_2018.04.1019660","1620_2018.03.3019625","1619_2018.03.2019626","1618_2018.03.1019627","1617_2018.02.2819628","1616_2018.02.2019629","1615_2018.02.1019630","1614_2018.01.3019632","1613_2018.01.2019639","1612_2018.01.1019650","2017骞村叕鎶�19661","1610_2017.12.2019671","1609_2017.12.1019672","1608_2017.11.3019673","1607_2017.11.2019674","1606_2017.11.1019675","1605_2017.10.3019676","1604_2017.10.2019678","1603_2017.10.1019679","1602_2017.09.3019680","1601_2017.09.2019681","1600_2017.09.1019682","1599_2017.08.3019683","1598_2017.08.2019684","1597_2017.08.1019685","1596_2017.07.3019686","1595_2017.07.2019687","1594_2017.07.1019689","1593_2017.06.3019690","1592_2017.06.2019691","1591_2017.06.1019692","1590_2017.05.3019693","1589_2017.05.2019694","1588_2017.05.1019695","1587_2017.04.3019696","1586_2017.04.2019697","1585_2017.04.1019698","1584_2017.03.3019664","1583_2017.03.2019665","1582_2017.03.1019666","1581_2017.02.2819667","1580_2017.02.2019668","1579_2017.02.1019669","1578_2017.01.3019670","1577_2017.01.2019677","1576_2017.01.1019688","2016骞�0b1401fa6fab4bc4a0e8d1610598ee5919699","1574_2016.12.2019710","1573_2016.12.1019711","1572_2016.11.3019712","1571_2016.11.2019713","1570_2016.11.1019715","1569_2016.10.3019716","1568_2016.10.2019720","1567_2016.10.1019721","1566_2016.09.3019722","1565_2016.09.2019723","1564_2016.09.1019724","1563_2016.08.3019725","1562_2016.08.2019726","1561_2016.08.1019727","1560_2016.07.3019728","1559_2016.07.2019729","1558_2016.07.1019732","1557_2016.06.3019733","1556_2016.06.2019734","1555_2016.06.1019735","1554_2016.05.3019736","1553_2016.05.2019737","1552_2016.05.1019738","1551_2016.04.3019739","1550_2016.04.2019740","1549_2016.04.1019741","1548_2016.03.3019701","1547_2016.03.2019702","1546_2016.03.1019703","1545_2016.02.2919704","1544_2016.02.1919705","1543_2016.02.1019707","1542_2016.01.3019709","1541_2016.01.2019719","1540_2016.01.1019731","2015骞碽c85ba8d7d90477e9c621b4e64d8019d19742","1538_2015.12.2019755","1537_2015.12.1019756","1536_2015.11.3019757","1535_2015.11.2019758","1534_2015.11.1019759","1533_2015.10.3019760","1532_2015.10.2019762","1531_2015.10.1019763","1530_2015.09.3019764","1529_2015.09.2019765","1528_2015.09.1019766","1527_2015.08.3019767","1526_2015.08.2019768","1525_2015.08.1019769","1524_2015.07.3019770","1523_2015.07.2019771","1522_2015.07.1019773","1521_2015.06.3019774","1520_2015.06.2019775","1519_2015.06.1019776","1518_2015.05.3019777","1517_2015.05.2019778","1516_2015.05.1019779","1515_2015.04.3019780","1514_2015.04.2019781","1513_2015.04.1019782","1512_2015.03.3019748","1511_2015.03.2019749","1510_2015.03.1019750","1509_2015.02.2819751","1508_2015.02.2019752","1507_2015.02.1019753","1506_2015.01.3019754","1505_2015.01.2019761","1504_2015.01.1019772","2014骞�5dab5771f9844aeb8aa9f0aaf746ca5519783","1502_2014.12.2019792","1501_2014.12.1019793","1500_2014.11.3019794","1499_2014.11.2019795","1498_2014.11.1019796","1497_2014.10.3019797","1496_2014.10.2019799","1495_2014.10.1019800","1494_2014.09.3019801","1493_2014.09.2019802","1492_2014.09.1019803","1491_2014.08.3019804","1490_2014.08.2019805","1489_2014.08.1019806","1488_2014.07.3019807","1487_2014.07.2019808","1486_2014.07.1019810","1485_2014.06.3019811","1484_2014.06.2019812","1483_2014.06.1019813","1482_2014.05.3019814","1481_2014.05.2019815","1480_2014.05.1019816","1479_2014.04.3019817","1478_2014.04.2019818","1477_2014.04.1019819","1476_2014.03.3019785","1475_2014.03.2019786","1474_2014.03.1019787","1473_2014.02.2819788","1472_2014.02.2019789","1471_2014.02.1019790","1470_2014.01.3019791","1469_2014.01.2019798","1468_2014.01.1019809","2013骞�498c159164e748028a50df76fa22abee19820","1466_2013.12.2019829","1465_2013.12.1019830","1464_2013.11.3019831","1463_2013.11.2019832","1462_2013.11.1019833","1461_2013.10.3019834","1460_2013.10.2019836","1459_2013.10.1019837","1458_2013.09.3019838","1457_2013.09.2019839","1456_2013.09.1019840","1455_2013.08.3019841","1454_2013.08.2019842","1453_2013.08.1019843","1452_2013.07.3019844","1451_2013.07.2019845","1450_2013.07.1019847","1449_2013.06.3019848","1448_2013.06.2019849","1447_2013.06.1019850","1446_2013.05.3019851","1445_2013.05.2019852","1444_2013.05.1019853","1443_2013.04.3019854","1442_2013.04.2019855","1441_2013.04.1019856","1440_2013.03.3019822","1439_2013.03.2019823","1438_2013.03.1019824","1437_2013.02.2819825","1436_2013.02.2019826","1435_2013.02.1019827","1434_2013.01.3019828","1433_2013.01.2019835","1432_2013.01.1019846","2012骞�6c88e402c72b40d28f5434467a785dda19857","1430_2012.12.2019865","1429_2012.12.1019866","1428_2012.11.3019867","1427_2012.11.2019868","1426_2012.11.1019869","1425_2012.10.3019870","1424_2012.10.2019872","1423_2012.10.1019873","1422_2012.09.3019874","1421_2012.09.2019875","1420_2012.09.1019876","1419_2012.08.3019877","1418_2012.08.2019878","1417_2012.08.1019879","1416_2012.07.3019880","1415_2012.07.2019881","1414_2012.07.1019883","1413_2012.06.3019884","1412_2012.06.2019885","1411_2012.06.1019886","1410_2012.05.3019887","1409_2012.05.2019888","1408_2012.05.1019889","1407_2012.04.3019890","1406_2012.04.2019891","1405_2012.04.1019892","1404_2012.03.3019858","1403_2012.03.2019859","1402_2012.03.1019860","1401_2012.02.2919861","1400_2012.02.2019862","1399_2012.02.1019863","1398_2012.01.3019864","1397_2012.01.2019871","1396_2012.01.1019882","2011骞磂ebd422908ce476a85b746871ac58f5b19893","1394_2011.12.2019901","1393_2011.12.1019902","1392_2011.11.3019903","1391_2011.11.2019904","1390_2011.11.1019905","1389_2011.10.3019906","1388_2011.10.2019908","1387_2011.10.1019909","1386_2011.09.3019910","1385_2011.09.2019911","1384_2011.09.1019912","1383_2011.08.3019913","1382_2011.08.2019914","1381_2011.08.1019915","1380_2011.07.3019916","1379_2011.07.2019917","1378_2011.07.1019919","1377_2011.06.3019920","1376_2011.06.2019921","1375_2011.06.1019922","1374_2011.05.3019923","1373_2011.05.2019924","1372_2011.05.1019925","1371_2011.04.3019926","1370_2011.04.2019927","1369_2011.04.1019928","1368_2011.03.3019894","1367_2011.03.2019895","1366_2011.03.1019896","1365_2011.02.2819897","1364_2011.02.2019898","1363_2011.02.1019899","1362_2011.01.3019900","1361_2011.01.2019907","1360_2011.01.1019918","2010骞�597d5c9cd29148c69c6bb88502be7f7519929","1358_2010.12.2019938","1357_2010.12.1019939","1356_2010.11.3019940","1355_2010.11.2019941","1354_2010.11.1019942","1353_2010.10.3019943","152_2010.10.2019945","1351_2010.10.1019946","1350_2010.09.3019947","1349_2010.09.2019948","1348_2010.09.1019949","1347_2010.08.3019950","1346_2010.08.2019951","1345_2010.08.1019952","1344_2010.07.3019953","1343_2010.07.2019954","1342_2010.07.1019956","1341_2010.06.3019957","1340_2010.06.2019958","1339_2010.06.1019959","1338_2010.05.3019960","1337_2010.05.2019961","1336_2010.05.1019962","1335_2010.04.3019963","1334_2010.04.2019964","1333_2010.04.1019965","1332_2010.03.3019931","1331_2010.03.2019932","1330_2010.03.1019933","1329_2010.02.2819934","1328_2010.02.2019935","1327_2010.02.1019936","1326_2010.01.3019937","1325_2010.01.2019944","1324_2010.01.1019955","2009骞磃42fc22e284640c782bcd4569c4b420c19966","1322_2009.12.2019974","1321_2009.12.1019975","1320_2009.11.3019976","1319_2009.11.2019977","1318_2009.11.1019978","1317_2009.10.3019979","1316_2009.10.2019981","1315_2009.10.1019982","1314_2009.09.3019983","1313_2009.09.2019984","1312_2009.09.1019985","1311_2009.08.3019986","1310_2009.08.2019987","1309_2009.08.1019988","1308_2009.07.3019989","1307_2009.07.2019990","1306_2009.07.1019992","1305_2009.06.3019993","1304_2009.06.2019994","1303_2009.06.1019995","1302_2009.05.3019996","1301_2009.05.2019997","1300_2009.05.1019998","1299_2009.04.3019999","1298_2009.04.2020000","1297_2009.04.1020001","1296_2009.03.3019967","1295_2009.03.2019968","1294_2009.03.1019969","1293_2009.02.2819970","1292_2009.02.2019971","1291_2009.02.1019972","1290_2009.01.3019973","1289_2009.01.2019980","1288_2009.01.1019991","2008骞�311507a44cf9437ab0f8713ee885c02d20002","1286_2008.12.2020010","1285_2008.12.1020011","1284_2008.11.3020012","1283_2008.11.2020013","1282_2008.11.1020014","1281_2008.10.3020015","1280_2008.10.2020017","1279_2008.10.1020018","1278_2008.09.3020019","1277_2008.09.2020020","1276_2008.09.1020021","1275_2008.08.3020022","1274_2008.08.2020023","1273_2008.08.1020024","1272_2008.07.3020025","1271_2008.07.2020026","1270_2008.07.1020028","1269_2008.06.3020029","1268_2008.06.2020030","1267_2008.06.1020031","1266_2008.05.3020032","1265_2008.05.2020033","1264_2008.05.1020034","1263_2008.04.3020035","1262_2008.04.2020036","1261_2008.04.1020037","1260_2008.03.3020003","1259_2008.03.2020004","1258_2008.03.1020005","1257_2008.02.2920006","1256_2008.02.2020007","1255_2008.02.1020008","1254_2008.01.3020009","1253_2008.01.2020016","1252_2008.01.1020027","2007骞�90b257f8d27e4f49a5ee4d5a04dc5a1d20038","1250_2007.12.2020046","1249_2007.12.1020047","1248_2007.11.3020048","1247_2007.11.2020049","1246_2007.11.1020050","1245_2007.10.3020051","1244_2007.10.2020053","1243_2007.10.1020054","1242_2007.09.3020055","1241_2007.09.2020056","1240_2007.09.1020057","1239_2007.08.3020058","1238_2007.08.2020059","1237_2007.08.1020060","1236_2007.07.3020061","1235_2007.07.2020062","1234_2007.07.1020064","1233_2007.06.3020065","1232_2007.06.2020066","1231_2007.06.1020067","1230_2007.05.3020068","1229_2007.05.2020069","1228_2007.05.1020070","1227_2007.04.3020071","1226_2007.04.2020072","1225_2007.04.1020073","1224_2007.03.3020039","1223_2007.03.2020040","1222_2007.03.1020041","1221_2007.02.2820042","1220_2007.02.2020043","1219_2007.02.1020044","1218_2007.01.3020045","1217_2007.01.2020052","1216_2007.01.1020063","2006骞磂8a7c146233a42b8b1786bec7a8d76d020074","1214_2006.12.2020082","1213_2006.12.1020083","1212_2006.11.3020084","1211_2006.11.2020085","1210_2006.11.1020086","1209_2006.10.3020087","1208_2006.10.2020089","1207_2006.10.1020090","1206_2006.09.3020091","1205_2006.09.2020092","1204_2006.09.1020093","1203_2006.08.3020094","1202_2006.08.2020095","1201_2006.08.1020096","1200_2006.07.3020097","1199_2006.07.2020098","1198_2006.07.1020100","1197_2006.06.3020101","1196_2006.06.2020102","1195_2006.06.1020103","1194_2006.05.3020104","1193_2006.05.2020105","1192_2006.05.1020106","1191_2006.04.3020107","1190_2006.04.2020108","1189_2006.04.1020109","1188_2006.03.3020075","1187_2006.03.2020076","1186_2006.03.1020077","1185_2006.02.2820078","1184_2006.02.2020079","1183_2006.02.1020080","1182_2006.01.3020081","1181_2006.01.2020088","1180_2006.01.1020099","2005骞�9fb4e84c022943639f9959d95f88c4ba20110","1178_2005.12.2020118","1177_2005.12.1020119","1176_2005.11.3020120","1175_2005.11.2020121","1174_2005.11.1020122","1173_2005.10.3020123","1172_2005.10.2020125","1171_2005.10.1020126","1170_2005.09.3020127","1169_2005.09.2320128","1168_2005.09.1020129","1167_2005.08.3020130","1166_2005.08.2020131","1165_2005.08.1020132","1164_2005.07.3020133","1163_2005.07.2020134","1162_2005.07.1020136","1161_2005.06.3020137","1160_2005.06.2020138","1159_2005.06.1020139","1158_2005.05.3020140","1157_2005.05.2020141","1156_2005.05.1020142","1155_2005.04.3020143","1154_2005.04.2020144","1153_2005.04.1020145","1152_2005.03.3020111","1151_2005.03.2020112","1150_2005.03.1020113","1149_2005.02.2820114","1148_2005.02.2020115","1147_2005.02.1020116","1146_2005.01.3020117","1145_2005.01.2020124","1144_2005.01.1020135","2004骞碼71453dac7f1410c9d9f2a449991470420146","1142_2004.12.2020155","1141_2004.12.1020156","1140_2004.11.3020157","1139_2004.11.2020158","1138_2004.11.1020159","1137_2004.10.3020160","1136_2004.10.2020162","1135_2004.10.1020163","1134_2004.09.3020164","1133_2004.09.2020165","1132_2004.09.1020166","1131_2004.08.3020167","1130_2004.08.2020168","1129_2004.08.1020169","1128_2004.07.3020170","1127_2004.07.2020171","1126_2004.07.1020173","1125_2004.06.3020174","1124_2004.06.2020175","1123_2004.06.1020176","1122_2004.05.3020177","1121_2004.05.2020178","1120_2004.05.1020179","1119_2004.04.3020180","1118_2004.04.2020181","1117_2004.04.1020182","1116_2004.03.3020148","1115_2004.03.2020149","1114_2004.03.1020150","1113_2004.02.2920151","1112_2004.02.2020152","1111_2004.02.1020153","1110_2004.01.3020154","1109_2004.01.2020161","1108_2004.01.1020172","2003骞碿9a42e513b17447eb8e82ef814c68e3020183","1106_2003.12.2020192","1105_2003.12.1020193","1104_2003.11.3020194","1103_2003.11.2020195","1102_2003.11.1020196","1101_2003.10.3020197","1100_2003.10.2020199","1099_2003.10.1020200","1098_2003.09.3020201","1097_2003.09.2020202","1096_2003.09.1020203","1095_2003.08.3020204","1094_2003.08.2020205","1093_2003.08.1020206","1092_2003.07.3020207","1091_2003.07.2020208","1090_2003.07.1020210","1089_2003.06.3020211","1088_2003.06.2020212","1087_2003.06.1020213","1086_2003.05.3020214","1085_2003.05.2020215","1084_2003.05.1020216","1083_2003.04.3020217","1082_2003.04.2020218","1081_2003.04.1020219","1080_2003.03.3020185","1079_2003.03.2020186","1078_2003.03.1020187","1077_2003.02.2820188","1076_2003.02.2020189","1075_2003.02.1020190","1074_2003.01.3020191","1073_2003.01.2020198","1072_2003.01.1020209","2002骞�7c23664487a04276ac4c9c3b81077ec420220","1070_2002.12.2020229","1069_2002.12.1020230","1068_2002.11.3020231","1067_2002.11.2020232","1066_2002.11.1020233","1065_2002.10.3020234","1064_2002.10.2020236","1063_2002.10.1020237","1062_2002.09.3020238","1061_2002.09.2020239","1060_2002.09.1020240","1059_2002.08.3020241","1058_2002.08.2020242","1057_2002.08.1020243","1056_2002.07.3020244","1055_2002.07.2020245","1054_2002.07.1020247","1053_2002.06.3020248","1052_2002.06.2020249","1051_2002.06.1020250","1050_2002.05.3020251","1049_2002.05.2020252","1048_2002.05.1020253","1047_2002.04.3020254","1046_2002.04.2020255","1045_2002.04.1020256","1044_2002.03.3020222","1043_2002.03.2020223","1042_2002.03.1020224","1041_2002.02.2820225","1040_2002.02.2020226","1039_2002.02.1020227","1038_2002.01.3020228","1037_2002.01.2020235","1036_2002.01.1020246","2001骞磃05ee9f0c7e143b780f36ef7e0df996b20257","1034_2001.12.2020266","1033_2001.12.1020267","1032_2001.11.3020268","1031_2001.11.2020269","1030_2001.11.1020270","1029_2001.10.3020271","1028_2001.10.2020273","1027_2001.10.1020274","1026_2001.09.3020275","1025_2001.09.2020276","1024_2001.09.1020277","1023_2001.08.3020278","1022_2001.08.2020279","1021_2001.08.1020280","1020_2001.07.3020281","1019_2001.07.2020282","1018_2001.07.1020284","1017_2001.06.3020285","1016_2001.06.2020286","1015_2001.06.1020287","1014_2001.05.3020288","1013_2001.05.2020289","1012_2001.05.1020290","1011_2001.04.3020291","1010_2001.04.2020292","1009_2001.04.1020293","1008_2001.03.3020259","1007_2001.03.2020260","1006_2001.03.1020261","1005_2001.02.2820262","1004_2001.02.2020263","1003_2001.02.1020264","1002_2001.01.3020265","1001_2001.01.2020272","1000_2001.01.1020283","2000骞�105184082e6c494bbca0be3cc9b3fc0420294","998_2000.12.2020302","997_2000.12.1020303","996_2000.11.3020304","995_2000.11.2020305","994_2000.11.1020306","993_2000.10.3020307","992_2000.10.2020309","991_2000.10.1020310","990_2000.09.3020311","989_2000.09.2020312","988_2000.09.1020313","987_2000.08.3020314","986_2000.08.2020315","985_2000.08.1020316","984_2000.07.3020317","983_2000.07.2020318","982_2000.07.1020320","981_2000.06.3020321","980_2000.06.2020322","979_2000.06.1020323","978_2000.05.3020324","977_2000.05.2020325","976_2000.05.1020326","975_2000.04.3020327","974_2000.04.2020328","973_2000.04.1020329","972_2000.03.3020295","971_2000.03.2020296","970_2000.03.1020297","969_2000.02.2920298","968_2000.02.2020299","967_2000.02.1020300","966_2000.01.3020301","965_2000.01.2020308","964_2000.01.1020319","鍥藉姟闄㈠叕鎶ュ鍒妌ew32307","20191澧炲垔e1fd6935b5cf4f3da4aca7a1125d23e319623","20171澧炲垔f5cd257ace6941ffaffaebec2067b64b19700","20162澧炲垔51e12637e8934a178389db417ffe803319746","20161澧炲垔74423fb38dcc4b18b548e4572ee8f8ab19747","20151澧炲垔c02cd3b6ed3b4697b567c6cb3d7e076319784","20141澧炲垔e4669b9c0c344e51bf3de47796f0448219821","20111澧炲垔a4873768cab045a2a1494524d7acab6b19930","200512澧炲垔2693a99a3e6c42b0af556a0973b80dac20147","200412澧炲垔cbaab264e1b4426581c493176d7ad1c020184","200312澧炲垔92c2abc0174d40faa3a8ad9f65f5361720221","20021澧炲垔361e2475e82e4233b6f55a8e680c136220258","鍏姤鍏叡椤甸潰ad89dd4485914355a9ef185dec80581e19496","寮曠敤鍏叡灏�10f1dc2b202a41bc926fde085b0895c419499","寮曠敤鍏叡澶碽5865d191c104f57b317c8eb7ae9f4ed19500","寮曠敤鍏叡澶�9c45b2e8b20145269bbf3940301c715019501","鐏拌壊搴曢儴78d93dd7bf9b4bb69e94b93961700d2519513","鍥藉姟闄㈠叕鎶ュ彸渚�810eb5635136491ab2bde5a9fb8a406119514","鍏叡澶�74b55374f5264665a72ec389de23523f19517","鍏姤鍏叡鍙虫爮4025819518","璺ㄥ煙涓棿椤�4653119495","鍥芥儏5258129202","鍏氬拰鍥藉鏈烘瀯5259229242","浜烘皯鏀垮崗5259729243","缁忔祹5259829244","绀句細5259429245","鍘嗗彶5259329246","浜烘枃5259529247","鍦扮悊5259629248","鍥芥儏202113285","娉曞緥娉曡5145020457","浜虹墿璧勬枡2cee30485e934328a1f22718c0d7498f13286","浣撹偛杩愬姩ad3bd0e9b969432ab63403cd3e524a0713287","鍗敓浜嬩笟fb347b9d95034adbba44efacd0c9134013288","鏂囧寲浜嬩笟24cce0f32ac64bf08e3d5f14761f25bd13289","鏁欒偛浜嬩笟036b4760812e4fdf8a57afe78365496313290","鐜淇濇姢9fbae68cb01848e59437ecaee74d26cb13291","绉戝鎶€鏈�5e78240812bb407ba550d6e23832cb4113292","浜烘皯鐢熸椿26c8140f40cb484b90b2ccaec1b96dd113293","缁忔祹2f1daf90cced433ab249c0cc1f39767c13294","鍙告硶fd3fc5458494447f9e4dcca05bec10f513295","澶栦氦653851c180ed4b2aac2c23325917953713296","瀹楁暀姒傚喌a90caf5bb9b342a2a33d187cda15f24b13297","浜哄彛姘戞棌涓庝範淇�81c04f12dc71431d8d1792e7ab92c08013298","鍘嗗彶姒傚喌d26f996e765b431ba9dfb5efaf8f467213299","鑷劧鍦扮悊28c0fd0ba5464f01ab8e17bfa57bb69313300","绀句細鍥綋13e6ff67a98243ce96185fb9e30a068013301","浜烘皯鏀垮崗e90e2a98049340d691702ebd615ffac613302","鍏氬拰鍥藉鏈烘瀯4d45d7ab1dac423eaa8dc231cb93607513303","鍥藉鍒跺害a9ed72af72604a889495d4fc4db4dc5a13304","涓浗姒傚喌ac560b7c82dd4df0af6ed00fffa360b513305","涓浗绠€鍐礱9ece302f3644349a14c0cd77e82b9d213306","鍘嗗彶涓婄殑浠婂ぉe935817acbcd47dc931d2684c61c2a9613307","鐩撮€氬湴鏂筨81042504b8546edad9f6e8ed976f0ba13308","鍦版柟_鍙虫爮b1b6417f34a946e2b64f4f8a93da99ba13309","寰€骞�4055713310","娴嬭瘯4055813311","鍥芥儏鐩稿叧9f1e20ad3a6e4826b1f69daf14791c0813312","鍏氬拰鍥藉棰嗗鏈烘瀯4606913313","浜烘皯娉曢櫌鍜屼汉姘戞瀵熼櫌4607013314","涓崕浜烘皯鍏卞拰鍥戒富甯�4607113315","涓崕浜烘皯鍏卞拰鍥藉浗鍔￠櫌4607213316","鍥藉鐩戝療濮斿憳浼�4607313317","涓崕浜烘皯鍏卞拰鍥戒腑澶啗浜嬪鍛樹細4607513318","涓浗鍏变骇鍏氱鍗佷節灞婁腑澶瀵兼満鏋�4625113319","绗崄涓夊眾鍏ㄥ浗浜烘皯浠ｈ〃澶т細甯稿姟濮斿憳浼�4625213320","涓浗鍏变骇鍏氫腑澶啗浜嬪鍛樹細4607413321","涓浗浜烘皯鏀挎不鍗忓晢浼氳绗崄涓夊眾鍏ㄥ浗濮斿憳浼�4706113322","搴曢儴4725313323","涓崕浜烘皯鍏卞拰鍥藉浗姝�4116913332","鍥芥瓕宓岄拡4118013333","涓嬭浇4117913334","鎵嬫満鐗�4118113335","绠€浠�4117013336","瑙嗛4117113337","鏀跨瓥娉曡4117313338","鐩稿叧鎶ラ亾4117413339","鐩稿叧瑙勫畾5085813340","鐩稿叧璧勬枡5086013341","搴嗙涓浗鍏变骇鍏氭垚绔�100鍛ㄥ勾涓撻5111013342","棣栭〉5111113343","澶уご鏉�5111213344","澶у浘5111313345","鏈€鏂版姤閬�5111413346","瑙嗛5111513347","瀛︿範璐交5111613348","搴嗙娲诲姩5111713349","搴嗙娲诲姩瀹夋帓5111813350","鐩稿叧鍥鹃泦5111913351","瀛﹀厷鍙插姙瀹炰簨5112013352","閮ㄩ棬5112113353","鍦版柟5112213354","鍥鹃泦5112313355","鏈€鏂版姤閬�5112413356","瑙嗛5112513357","瀛︿範璐交5112613358","搴嗙娲诲姩5112713359","搴嗙娲诲姩瀹夋帓5112813360","鐩稿叧鍥鹃泦5112913361","瀛﹀厷鍙插姙瀹炰簨5113013362","閮ㄩ棬5113113363","鍦版柟5113213364","鍥鹃泦5113313365","搴嗙涓浗鍏变骇鍏氭垚绔�100鍛ㄥ勾涓撻5113413366","瀛﹀厷鍙插姙瀹炰簨5115413367","閮ㄩ棬5115513368","鍦版柟5115613369","鍥鹃泦5115713370","棣栭〉5113513371","澶уご鏉�5113613372","澶у浘5113713373","鏈€鏂版姤閬�5113813374","瑙嗛5113913375","瀛︿範璐交5114013376","搴嗙娲诲姩5114113377","搴嗙娲诲姩瀹夋帓5114213378","鐩稿叧鍥鹃泦5114313379","瀛﹀厷鍙插姙瀹炰簨5114413380","閮ㄩ棬5114513381","鍦版柟5114613382","鍥鹃泦5114713383","鏈€鏂版姤閬�5114813384","瑙嗛5114913385","瀛︿範璐交5115013386","搴嗙娲诲姩5115113387","搴嗙娲诲姩瀹夋帓5115213388","鐩稿叧鍥鹃泦5115313389"
];

//浜�20230825锛岃鏂规硶鏀逛负鍙墽琛宲rint()
function forPrintEventListenerFn(flag){
  forPrintEventListenerBFFn.flag = flag;
  if (!(trs.IsPC())) {
    return;
  }

  //涓轰簡鍏煎鐏嫄锛屼簬20230830绉诲埌 forPrintEventListenerFn 涓墽琛岋紝鍘熸潵鍦╢orPrintEventListenerBFFn涓�
  //璁剧疆瀛楀彿
  forPrintFontSizeFn('beforeprint');
  //鏄惁闅愯棌鍥剧墖
  // isPrintPictureAndCaptionFn(); //鏆傛椂鍘绘帀闅愬浘鍔熻兘20230911

  print();

}

//浜�20230825锛岃鏂规硶鏀逛负鍙仛鐩戝惉鎵撳嵃鍓嶅悗锛屽鐞嗙悙纰庨棶棰�
function forPrintEventListenerBFFn(flag){
  if (!(trs.IsPC())) {
    return;
  }
  
  if(flag==='beforeprint'){

    // clearTimeout(forPrintEventListenerBFFn.timer1);


    $('body').addClass('printing');
    $('#UCAP-CONTENT').hide();
    $('#UCAP-CONTENT-FORPRINT').show();


    switch($('.index_switchsize span.on').index()){
      case 0:
        $('body').addClass('printingFontSizeDefault');
      break;
      case 1:
        $('body').addClass('printingFontSizeBig');
      break;
      case 2:
        $('body').addClass('printingFontSizeBigger');
      break;
    }
    // $('.locationHref').text(decodeURI(location.href)).show();

    /* 
    澶撮儴妗�
    閽堝 淇℃伅鍏紑_鍥藉姟闄㈡枃浠� 缁嗚 XXGK_GWYWJ
    閽堝 鏀跨瓥_鍥藉姟闄㈤儴闂ㄦ枃浠剁粏瑙� ZC_GWYBMWJ
    */
    $('body.XXGK_GWYWJ .pctoubukuang1,body.ZC_GWYBMWJ .pctoubukuang1').eq(1).html(
      $('body.XXGK_GWYWJ .pctoubukuang1,body.ZC_GWYBMWJ .pctoubukuang1').eq(0).html()
    )
    $('body.XXGK_GWYWJ .pctoubukuang1,body.ZC_GWYBMWJ .pctoubukuang1').eq(0).html('');

    /* 
    閽堝 鏀跨瓥_鍥藉姟闄㈤儴闂ㄦ枃浠剁粏瑙� ZC_GWYBMWJ
    */
    if(//濡傛灉涓€涓猵娈佃惤閲屾湁涓斾粎鏈変竴涓猙r 鏃跺€欏氨骞叉帀瀹�
      $('#UCAP-CONTENT-FORPRINT p').eq(0).find('*').length===1
      &&$('#UCAP-CONTENT-FORPRINT p').eq(0).find('br').length===1
    ){
      $('#UCAP-CONTENT-FORPRINT p').eq(0).find('br').remove();
    }


    //濡傛灉鏄伀鐙愭祻瑙堝櫒
    // if(/(firefox)/i.test(window.navigator.userAgent)){
    //   $('body.XXGK_GWYWJ .pctoubukuang1:eq(1)').css({
    //     'margin': '40px 55px',
    //     'width': 'auto'
    //   });
    // }

    //涓哄吋瀹瑰浘鐗囧洖娴佽繃绋嬩腑鍑虹幇閿欒
    // forPrintEventListenerBFFn.timer1 = setTimeout(function(){
    //   print();
    //   // forPrintEventListenerBFFn.timer = setTimeout(function(){returnNotPrintStateFn()},200);
    // },100);

    
  }else if(flag==='afterprint'){

    returnNotPrintStateFn();

  }
}
$(window).on('beforeprint',function(){
  forPrintEventListenerBFFn('beforeprint');
});
$(window).on('afterprint',function(){
  forPrintEventListenerBFFn('afterprint');
});



//涓烘鏂囧尯鍏ㄤ綋鎵€鏈夊浘鐗囷紝璧嬪€煎楂�
$('#UCAP-CONTENT img').each(function(i,o){
  var _width = $(this).width();
  var _height = $(this).height();

  if(
    _width!==0
    &&_height!==0
  ){
    $(this).attr({
      'data-width':_width,
      'data-height':_height,
    })
  }else{
    $(this).get(0).onload = function(){
      _width = $(this).width();
      _height = $(this).height();
      $(this).attr({
        'data-width':_width,
        'data-height':_height,
      });

    }      
  }
  //end of else 
});


$(window).on('load', function() {  
  forPrintFontSizeFn();  
});