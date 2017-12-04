define(function () {
    var clickDan = function () {
        //判断是否未登录
        clickJinDanView();
    };
    //纪录中奖类型和中奖id
    var jinDanType;
    var jinDanId;
    var jdJDurl; //纪录

    /**
     * 中奖结果层
     */
    var jiangPinResult = function () {
        var str = '';
        str += '<div class="bg-mask"></div>';
        str += '<div class="jiangPinResult">';
        str += '<img class="gongxi" src="../../images/zaJinDan/gx.png" alt="恭喜你" title="恭喜">';
        str += '<p></p>';
        str += '<img class="imgJiangPin" src="" alt="奖品" title="奖品">';
        str += '<div><button class="btn_Get" style="text-align: center; line-height: 40px">领取奖品</button><button class="colseJiangPin"  style="text-align: center; line-height: 40px" >再砸一次</button></a>';
        // str += '<img class="colseJiangPin" src="images/close.png" alt="关闭" title="关闭">';
        str += '</div>';

        $('body').css({'overflow': 'hidden'});
        $('body').prepend(str);


        var base = new Base64();
        // var oHttp = localStorage.oHttp;
        // var token = localStorage.oToken;


        //请求数据 以及设置奖品名称和奖品图片
        getPrize(base, oHttp, 3, oToken, function () {

            //设置按钮类型
            if (jinDanType == 3) {
                // console.log(jinDanType);
                $('.btn_Get').text('领取奖品');
            } else {
                // console.log(jinDanType);
                $('.btn_Get').text('中奖纪录');
            }

            //点击领取奖品，跳转到列表
            $('.btn_Get').click(function () {
                if (jinDanType == 3) {
                    window.location.href = 'fillInformation.html?token=' + oToken + '&prizeid=' + jinDanId + '&prizetype=' + jinDanType;
                }
                // //跳转到京东优惠券url
                // else if (jinDanType == 5) {
                //     window.location.href = jdJDurl;
                // }
                else {
                    window.location.href = "../winningLog.html?token=" + oToken;
                }
            })
        });

        setTimeout(function () {
            $('.jiangPinResult').addClass('active');
        }, 200);
    };

    var alertLogin = function () {
        var str = '';
        str += '<div class="bg-mask"></div>';
        str += '<div class="inputInfo">';
        str += '<img class="colseLogin" src="../../images/close.png" alt="关闭">';
        str += '<p class="inputInfoTitle">输入用户信息</p>';
        str += '<div class="userNameDiv">';
        str += '<label for="nameInput">用户名:</label>';
        str += '<input class="nameInput" name="nameInput" id="nameInput" type="text" value="admin" placeholder="请输入用户名">';
        str += '</div>';
        str += '<div class="phoneDiv">';
        str += '<label for="phoneInput">手机号:</label>';
        str += '<input class="phoneInput" name="phoneInput" id="phoneInput" type="text" value="13868686868" placeholder="请输入手机号号码">';
        str += '</div>';
        str += '<input class="submitTijiao" type="button" value="提交">';
        str += '</div>';

        $('body').css({'overflow': 'hidden'});
        $('body').prepend(str);

        setTimeout(function () {
            $('.inputInfo').addClass('active');
        }, 200);

        //点击切换另一个弹窗
        $('.submitTijiao').click(function () {
            var phoneNumber = $('.phoneInput').val();
            var userName = $('.nameInput').val();
            if (phoneNumber === '' || userName === '') {
                alert('信息不能为空！');
            } else {
                if (isRightPhoneNumber(phoneNumber)) {
                    $('.bg-mask').remove();
                    $('.inputInfo').remove();
                    $('body').css({overflow: 'hidden'});
                    $('.tishiChouJiang').html(userName + ', 你好!点击金蛋抽奖<span class="loginOutSpan">退出<span>');
                    $('body').css({'overflow': 'visible'});
                } else {
                    alert('电话号码格式不正确!');
                }
            }
        });
    };

    var isRightPhoneNumber = function (val) {
        var re = /^(13[0-9]{9})|(15[0-9][0-9]{8})|(18[0-9][0-9]{8})|(17[0][0-9]{8})|(14[7][0-9]{8})$/;
        if (!re.test(val)) {
            return 0;
        } else {
            return 1;
        }
    };

    /**
     * 砸金蛋动画图层
     */
    var clickJinDanView = function (callback) {
        var str = '';
        str += '<div class="bg-mask"></div>';
        str += '<div class="chouJiang">';
        str += '<p class="chouJiangTishi">请稍等...</p>';
        str += '<img class="caiDai" src="../../images/zaJinDan/caidai.png" alt="彩带">';
        str += '<img class="imgDan" src="../../images/zaJinDan/egg2.png" alt="砸蛋" title="砸蛋">';
        str += '<img class="imgChuiZi" src="../../images/zaJinDan/chuizi.png" alt="锤子">';
        str += '</div>';

        $('body').css({'overflow': 'hidden'});
        $('body').prepend(str);

        //砸金蛋的延迟时间
        setTimeout(function () {
            $('.bg-mask').remove();
            $('.chouJiang').remove();
            jiangPinResult(callback);
        }, 1250);
    };

    /**
     * 进行抽奖
     * @param base
     * @param oHttp
     * @param level
     * @param token
     * @param callback
     */

    function getPrize(base, oHttp, level, token, callback) {
        var date = new Date();

        var data = {"level": level, "token": token, "time": date.getTime()};
        var baseData = base.encode(JSON.stringify(data));
        //去掉特殊的斜杠，已保证url地址的正确性
        baseData = baseData.replace(new RegExp("/", "gm"), "*");
        var url = '/luckGame/doIt/';
        url = oHttp + url + baseData;
        // console.log(url);
        $.ajax({
            url: url,
            type: "POST",
            success: function (res) {
                res = JSON.parse(res);
                // console.log(res);
                if (res.code == 1) {
                    //设置中奖图片
                    $(".jiangPinResult .imgJiangPin").attr("src", res.resData.centerImgUrl);

                    // prizeProductTitle设置中奖标题
                    $(".jiangPinResult>p").text(res.resData.name);

                    //获取后台返回的奖品类型和id
                    jinDanType = res.resData.type;
                    jinDanId = res.resData.luckGameLogId;

                    // //纪录 京东优惠券url
                    // if (jinDanType == 5) {
                    //     jdJDurl = res.resData.url;
                    // }


                    // 如果有回调函数，就执行回调函数
                    if (callback) callback();
                } else {
                    alert(res.msg)
                }

            },
            error: function (err) {
                console.log(err);
            }
        })
    }

    function Base64() {
        // private property
        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        // public method for encoding
        this.encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        }
        // public method for decoding
        this.decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        }
        // private method for UTF-8 encoding
        _utf8_encode = function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        }
        // private method for UTF-8 decoding
        _utf8_decode = function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }

    //返回
    return {
        clickDan: clickDan,  //敲击蛋判断是否登录
        jiangPinResult: jiangPinResult, //显示奖品的弹窗
        alertLogin: alertLogin,   //提示输入用户名
        isRightPhoneNumber: isRightPhoneNumber,   //验证电话号码
        clickJinDanView: clickJinDanView    //显示敲击金蛋效果
    }
});