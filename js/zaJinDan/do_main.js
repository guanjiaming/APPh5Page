require.config({
    baseUrl: "js/zaJinDan",
    paths: {
        "jquery": "jquery-2.1.0.min",
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


            var t;
            //设置金蛋幻灯片的间隔时间
            t = setInterval(function () {
                carousel.carouselAutoPlay()
            }, 3000);

            //点击抽奖
            $('body').on('click', '.list_EggsDiv ul li', function () {

                //清除定时器
                clearInterval(t);
                //扣除用户积分  （调用接口方法）

                //页面的积分数减少
                var jifen = $(".myjifen .integralNum").text();
                if (jifen < 10) {
                    alert("积分不够了，快去做任务吧~");
                } else {
                    $(".myjifen .integralNum").text(jifen - 10);
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
    });

requirejs(['jquery', 'resize'],
    function ($, resize) {
        resize.resizeCarousel();
    });
