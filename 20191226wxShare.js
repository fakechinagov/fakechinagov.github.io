/**
 * @St. 2018-07-01 
 * 淇寰俊浜屾鍒嗕韩涓嶇敓鏁堢殑bug 
 * src: http://www.xinhuanet.com/global/public/wxShare.js
 * bk: http://www.xinhuanet.com/global/public/wxShare.bk.js
 */
var wxShareHref = window.location.href;

if (/\?from=/ig.test(wxShareHref)) {
    var noJump = /nojump/ig.test(wxShareHref);
    if (noJump == false) {
        window.location.href = wxShareHref.split('?from=')[0];
    }
}

var json_wx = {
    'jsonpurl': (function (callback) {
        //http://api.home.news.cn/wx/jsapi.do?callback=sdfsdf&mpId=367&url=http%3A%2F%2Fapp.news.cn%2Fweixintest%2F;
        var str,
            //  loc = wxShareHref;
            //str = "http://api.home.news.cn/wx/jsapi.do?callback=" + "cb" + "&mpId=367&url=" + loc;

            loc = wxShareHref.substring(0, wxShareHref.indexOf('#') < 0 ? undefined : wxShareHref.indexOf('#'));
        //str = "http://api.home.news.cn/wx/jsapi.do?callback=" + "cb" + "&mpId=368&url=" + loc + '&t=' + new Date().getTime();
        str = "https://api.home.news.cn/wx/jsapi.do?callback=cb" + "&mpId=376&url=" + encodeURIComponent(loc);
        return str;
    })(),
    'createTag': function (url) {
        var tag = document.createElement("script");
        tag.src = url;
        document.querySelector("body").appendChild(tag);
    }
};

function cb(data) {
    if (data.code !== 200) console.log("shibai");
    // console.log(data);
    wx.config({
        debug: false, // 寮�鍚皟璇曟ā寮�,璋冪敤鐨勬墍鏈塧pi鐨勮繑鍥炲�间細鍦ㄥ鎴风alert鍑烘潵锛岃嫢瑕佹煡鐪嬩紶鍏ョ殑鍙傛暟锛屽彲浠ュ湪pc绔墦寮�锛屽弬鏁颁俊鎭細閫氳繃log鎵撳嚭锛屼粎鍦╬c绔椂鎵嶄細鎵撳嵃銆�
        appId: data.content.appId, // 蹇呭～锛屽叕浼楀彿鐨勫敮涓�鏍囪瘑
        timestamp: data.content.timestamp, // 蹇呭～锛岀敓鎴愮鍚嶇殑鏃堕棿鎴�
        nonceStr: data.content.nonceStr, // 蹇呭～锛岀敓鎴愮鍚嶇殑闅忔満涓�
        signature: data.content.signature, // 蹇呭～锛岀鍚嶏紝瑙侀檮褰�1
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 蹇呭～锛岄渶瑕佷娇鐢ㄧ殑JS鎺ュ彛鍒楄〃锛屾墍鏈塉S鎺ュ彛鍒楄〃瑙侀檮褰�2

        /*
         * 娉ㄦ剰锛�
         * 1. 鎵�鏈夌殑JS鎺ュ彛鍙兘鍦ㄥ叕浼楀彿缁戝畾鐨勫煙鍚嶄笅璋冪敤锛屽叕浼楀彿寮�鍙戣�呴渶瑕佸厛鐧诲綍寰俊鍏紬骞冲彴杩涘叆鈥滃叕浼楀彿璁剧疆鈥濈殑鈥滃姛鑳借缃�濋噷濉啓鈥淛S鎺ュ彛瀹夊叏鍩熷悕鈥濄��
         * 2. 濡傛灉鍙戠幇鍦� Android 涓嶈兘鍒嗕韩鑷畾涔夊唴瀹癸紝璇峰埌瀹樼綉涓嬭浇鏈�鏂扮殑鍖呰鐩栧畨瑁咃紝Android 鑷畾涔夊垎浜帴鍙ｉ渶鍗囩骇鑷� 6.0.2.58 鐗堟湰鍙婁互涓娿��
         * 3. 甯歌闂鍙婂畬鏁� JS-SDK 鏂囨。鍦板潃锛歨ttp://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
         *
         * 寮�鍙戜腑閬囧埌闂璇﹁鏂囨。鈥滈檮褰�5-甯歌閿欒鍙婅В鍐冲姙娉曗�濊В鍐筹紝濡備粛鏈兘瑙ｅ喅鍙�氳繃浠ヤ笅娓犻亾鍙嶉锛�
         * 閭鍦板潃锛歸eixin-open@qq.com
         * 閭欢涓婚锛氥�愬井淇S-SDK鍙嶉銆戝叿浣撻棶棰�
         * 閭欢鍐呭璇存槑锛氱敤绠�鏄庣殑璇█鎻忚堪闂鎵�鍦紝骞朵氦浠ｆ竻妤氶亣鍒拌闂鐨勫満鏅紝鍙檮涓婃埅灞忓浘鐗囷紝寰俊鍥㈤槦浼氬敖蹇鐞嗕綘鐨勫弽棣堛��
         */

    });
    wx.ready(function () {

        // config淇℃伅楠岃瘉鍚庝細鎵цready鏂规硶锛屾墍鏈夋帴鍙ｈ皟鐢ㄩ兘蹇呴』鍦╟onfig鎺ュ彛鑾峰緱缁撴灉涔嬪悗锛宑onfig鏄竴涓鎴风鐨勫紓姝ユ搷浣滐紝鎵�浠ュ鏋滈渶瑕佸湪椤甸潰鍔犺浇鏃跺氨璋冪敤鐩稿叧鎺ュ彛锛屽垯椤绘妸鐩稿叧鎺ュ彛鏀惧湪ready鍑芥暟涓皟鐢ㄦ潵纭繚姝ｇ‘鎵ц銆傚浜庣敤鎴疯Е鍙戞椂鎵嶈皟鐢ㄧ殑鎺ュ彛锛屽垯鍙互鐩存帴璋冪敤锛屼笉闇�瑕佹斁鍦╮eady鍑芥暟涓��
        // 1 鍒ゆ柇褰撳墠鐗堟湰鏄惁鏀寔鎸囧畾 JS 鎺ュ彛锛屾敮鎸佹壒閲忓垽鏂�
        wx.checkJsApi({
            jsApiList: [
                'getNetworkType',
                'previewImage'
            ],
            success: function (res) {
                //alert(JSON.stringify(res));
            }
        });

        var shareTit = document.querySelector(".share-title").innerHTML.trim();
		shareTit = shareTit.replace('<br>', '');
		shareTit = shareTit.replace('&nbsp;', '');
        var sharesum = document.querySelector(".share-substr").innerHTML.trim();
        //var shareImg = document.querySelector(".share-img").getElementsByTagName("img")[0].src||document.querySelector(".share-img").src;
        var shareImg = document.querySelector(".share-img").nodeName.toLowerCase() === "div" ? document.querySelector(".share-img").querySelector("img").src : document.querySelector(".share-img").src


        var shareUrl = wxShareHref;
        //alert("鍥剧墖"+shareImg)
        /*//console.log("鏍囬"+shareTit)
            //console.log("鎽樿"+sharesum)
            //console.log("閾炬帴"+shareUrl)*/
        // 2. 鍒嗕韩鎺ュ彛
        // 2.1 鐩戝惉鈥滃垎浜粰鏈嬪弸鈥濓紝鎸夐挳鐐瑰嚮銆佽嚜瀹氫箟鍒嗕韩鍐呭鍙婂垎浜粨鏋滄帴鍙�
        wx.onMenuShareAppMessage({
            title: shareTit,
            desc: sharesum,
            link: shareUrl,
            imgUrl: shareImg,
            trigger: function (res) {
                // 涓嶈灏濊瘯鍦╰rigger涓娇鐢╝jax寮傛璇锋眰淇敼鏈鍒嗕韩鐨勫唴瀹癸紝鍥犱负瀹㈡埛绔垎浜搷浣滄槸涓�涓悓姝ユ搷浣滐紝杩欐椂鍊欎娇鐢╝jax鐨勫洖鍖呬細杩樻病鏈夎繑鍥�
                //alert('鐢ㄦ埛鐐瑰嚮鍙戦�佺粰鏈嬪弸');
            },
            success: function (res) {
                //alert('宸插垎浜�');
            },
            cancel: function (res) {
                //alert('宸插彇娑�');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });

        // 2.2 鐩戝惉鈥滃垎浜埌鏈嬪弸鍦堚�濇寜閽偣鍑汇�佽嚜瀹氫箟鍒嗕韩鍐呭鍙婂垎浜粨鏋滄帴鍙�
        wx.onMenuShareTimeline({
            title: shareTit,
            link: shareUrl,
            imgUrl: shareImg,
            trigger: function (res) {
                // 涓嶈灏濊瘯鍦╰rigger涓娇鐢╝jax寮傛璇锋眰淇敼鏈鍒嗕韩鐨勫唴瀹癸紝鍥犱负瀹㈡埛绔垎浜搷浣滄槸涓�涓悓姝ユ搷浣滐紝杩欐椂鍊欎娇鐢╝jax鐨勫洖鍖呬細杩樻病鏈夎繑鍥�
                ///alert('鐢ㄦ埛鐐瑰嚮鍒嗕韩鍒版湅鍙嬪湀');
            },
            success: function (res) {
                //alert('宸插垎浜�');
            },
            cancel: function (res) {
                //alert('宸插彇娑�');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });

        // 2.3 鐩戝惉鈥滃垎浜埌QQ鈥濇寜閽偣鍑汇�佽嚜瀹氫箟鍒嗕韩鍐呭鍙婂垎浜粨鏋滄帴鍙�
        wx.onMenuShareQQ({
            title: shareTit,
            desc: sharesum,
            link: shareUrl,
            imgUrl: shareImg,
            trigger: function (res) {
                //alert('鐢ㄦ埛鐐瑰嚮鍒嗕韩鍒癚Q');
            },
            complete: function (res) {
                //alert(JSON.stringify(res));
            },
            success: function (res) {
                //alert('宸插垎浜�');
            },
            cancel: function (res) {
                //alert('宸插彇娑�');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });

        // 2.4 鐩戝惉鈥滃垎浜埌寰崥鈥濇寜閽偣鍑汇�佽嚜瀹氫箟鍒嗕韩鍐呭鍙婂垎浜粨鏋滄帴鍙�
        wx.onMenuShareWeibo({
            title: shareTit,
            desc: sharesum,
            link: shareUrl,
            imgUrl: shareImg,
            trigger: function (res) {
                //alert('鐢ㄦ埛鐐瑰嚮鍒嗕韩鍒板井鍗�');
            },
            complete: function (res) {
                //alert(JSON.stringify(res));
            },
            success: function (res) {
                ///alert('宸插垎浜�');
            },
            cancel: function (res) {
                //alert('宸插彇娑�');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });

        // 2.5 鐩戝惉鈥滃垎浜埌QZone鈥濇寜閽偣鍑汇�佽嚜瀹氫箟鍒嗕韩鍐呭鍙婂垎浜帴鍙�
        wx.onMenuShareQZone({
            title: shareTit,
            desc: sharesum,
            link: shareUrl,
            imgUrl: shareImg,
            trigger: function (res) {
                //alert('鐢ㄦ埛鐐瑰嚮鍒嗕韩鍒癚Zone');
            },
            complete: function (res) {
                //alert(JSON.stringify(res));
            },
            success: function (res) {
                //alert('宸插垎浜�');
            },
            cancel: function (res) {
                //alert('宸插彇娑�');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });
    });
    wx.error(function (res) {
        // config淇℃伅楠岃瘉澶辫触浼氭墽琛宔rror鍑芥暟锛屽绛惧悕杩囨湡瀵艰嚧楠岃瘉澶辫触锛屽叿浣撻敊璇俊鎭彲浠ユ墦寮�config鐨刣ebug妯″紡鏌ョ湅锛屼篃鍙互鍦ㄨ繑鍥炵殑res鍙傛暟涓煡鐪嬶紝瀵逛簬SPA鍙互鍦ㄨ繖閲屾洿鏂扮鍚嶃��
        /*console.log(res,error);*/
    });

}

/*
鍚姩寰俊鍒嗕韩 
//json_wx.createTag(json_wx.jsonpurl);
*/

//---浠呯Щ鍔ㄧ鏃跺惎鍔ㄥ井淇″垎浜�
(function (isM) {
    var _mob = isM || false;
    _mob ? (json_wx.createTag(json_wx.jsonpurl)) : null;
})((function (w) {
    var ua = w.navigator.userAgent.toLowerCase(),
        isMatchMob = /phone|pad|pod|iphone|ipod|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone|micromessenger/gi.test(ua) ? true : false;;
    return isMatchMob;
})(window));