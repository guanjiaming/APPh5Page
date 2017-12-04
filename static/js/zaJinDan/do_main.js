require.config({
    //打不开请更改下面这一行地址
    baseUrl: "../../js/zaJinDan",
    paths: {
        // "jquery": "jquery-2.1.0.min",
        "jquery": "../jquery-3.1.1.min",
        "require": "require",
        "resize": "resize",
        "carousel": "jinDanCarousel",
        "oalert": 'alert'
    }
});

requirejs(['jquery', 'require', 'carousel', 'oalert'],
    function ($, require, carousel, oalert) {
        $(document).ready(function () {
            //加载完成之后关闭loading
            $('.loadingDiv').hide();

            // //获取token
            // // var oToken = $.getUrlParam('token');
            // var oHttp =getWddjUrl();
            // var base = new Base64();

            var t;
            carousel.carouselAutoPlay();
            //设置金蛋幻灯片的间隔时间
            t = setInterval(function () {
                carousel.carouselAutoPlay()
            }, 3500);

            //点击抽奖
            $('body').on('click', '.list_EggsDiv ul li', function () {

                //清除定时器
                clearInterval(t);

                //获取积分
                var jifen = $(".myjifen .integralNum").text();
                // console.log(jifen);
                if (jifen < 10) {
                    alert("积分不足");
                } else {
                    $(".myjifen .integralNum").text(jifen - 10);

                    var wdLotteryMusic = document.getElementById("wdLotteryMusic");//获取音频id
                    var wdLotteryMusic2 = document.getElementById("wdLotteryMusic2");//获取音频id

                    setTimeout(function () {
                        wdLotteryMusic.currentTime = 0;     //音频开始事件设置为0
                        wdLotteryMusic.play();      //播放音频
                        wdLotteryMusic2.currentTime = 0;
                        wdLotteryMusic2.play();
                    }, 500);

                    //调用砸蛋方法
                    oalert.clickDan();
                }
            });

            //关闭抽奖结果
            $('body').on('click', '.colseJiangPin', function () {

                t = setInterval(function () {
                    carousel.carouselAutoPlay()
                }, 2000);

                $('.bg-mask').remove();
                $('.jiangPinResult').remove();
                $('body').css({"overflow": "visible"});
                // window.location.reload();
            });

            //关闭默认的事件动作
            $('body').on('touchmove', '.bg-mask', function (event) {
                event.preventDefault();
            }, false);
            $('body').on('touchmove', '.loadingDiv', function (event) {
                event.preventDefault();
            }, false);

        });

        /**
         * 获取用户剩余积分
         * @param oHttp
         * @param oToken
         * @param base
         * @param callback
         */
        function getIntegral(oHttp, oToken, base, callback) {
            var date = new Date();
            var data = {"token": oToken, "time": date.getTime()};
            var baseData = base.encode(JSON.stringify(data));
            //去掉特殊的斜杠，已保证url地址的正确性
            baseData = baseData.replace(new RegExp("/", "gm"), "*");
            //拼接参数
            var url = "/luckGame/getIntegral/";
            url = oHttp + url + baseData;
            console.log(url);
            $.ajax({
                url: url,
                type: "GET",
                success: function (res) {
                    res = JSON.parse(res);
                    if (res.code == 1) {
                        $('.integral').text(res.resData.integral);  //设置 我的积分num
                    }
                    if (callback) callback();
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }
    });

requirejs(['jquery', 'resize'],
    function ($, resize) {
        resize.resizeCarousel();
    });
