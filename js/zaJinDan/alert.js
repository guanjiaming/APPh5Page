define(function () {
    var clickDan = function () {
        //判断是否未登录
        clickJinDanView();
    };

    /**
     * 中奖结果层
     */
    var jiangPinResult = function () {
        var str = '';
        str += '<div class="bg-mask"></div>';
        str += '<div class="jiangPinResult">';
        str += '<img class="gongxi" src="images/zaJinDan/gx.png" alt="恭喜你" title="恭喜">';
        str += '<p></p>';
        str += '<img class="imgJiangPin" src="" alt="奖品" title="奖品">';
        str += '<div><button class="btn_Get" style="text-align: center; line-height: 40px">领取奖品</button><button class="colseJiangPin"  style="text-align: center; line-height: 40px" >再砸一次</button></a>';
        // str += '<img class="colseJiangPin" src="images/close.png" alt="关闭" title="关闭">';
        str += '</div>';

        $('body').css({'overflow': 'hidden'});
        $('body').prepend(str);

        //请求数据 以及设置奖品名称和奖品图片
        getPrizeData(function () {
            //点击领取奖品，跳转到领取奖品页面
            $('.btn_Get').click(function () {
                window.location.href = 'fillInformation.html'
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
        str += '<img class="colseLogin" src="images/close.png" alt="关闭">';
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
     * 砸金蛋图层
     */
    var clickJinDanView = function (callback) {
        var str = '';
        str += '<div class="bg-mask"></div>';
        str += '<div class="chouJiang">';
        str += '<p class="chouJiangTishi">请稍等...</p>';
        str += '<img class="caiDai" src="images/zaJinDan/caidai.png" alt="彩带">';
        str += '<img class="imgDan" src="images/zaJinDan/egg2.png" alt="砸蛋" title="砸蛋">';
        str += '<img class="imgChuiZi" src="images/zaJinDan/chuizi.png" alt="锤子">';
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
     * 获取中奖数据
     */
    function getPrizeData(callback) {
        var url = "data/zaJinDan/data.json";
        $.ajax({
            url: url,
            type: "GET",
            success: function (res) {
                console.log(res);
                //设置中奖图片
                $(".jiangPinResult .imgJiangPin").attr("src", res.data.prizeProductSrc);
                //prizeProductTitle设置中奖标题
                $(".jiangPinResult>p").text(res.data.prizeProductTitle);
                // console.log($(".jiangPinResult>p").val());
                //    回调函数
                if (callback) callback();
            },
            error: function (err) {
                console.log(err);
            }
        })
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