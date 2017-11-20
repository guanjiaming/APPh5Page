(function () {
    //1.加密
    var base = new Base64();

    $(function () {
        //获取token
        var oToken = $.getUrlParam('token');
        console.log('oToken:' + oToken);
        //http前缀地址
        var oHttp = "http://t.bjwddj.com";


        var flag = false;  //flag 记录卡片的正反面  正面 false
        var clickCardFlag = false; //clickCardFlag 记录 ‘卡片’ 是否可以点击  可以 true
        var startClickFlag = true; //记录是否可以点击 ‘开始按钮’
        var integral;

        //首次进来加载奖品图片数据
        var url = oHttp + "/luckGame/data/";
        getProduct(); //抽奖等级,1: 幸运转盘,2: 魔术扑克,3: 一锤定音

        //获取积分值
        getIntegral(function () {
            //获取积分数量
            integral = $('.integral').text();
        });

        //点击开始按钮
        $('.startBtn').tap(function () {
            //积分大于5，可以进行抽奖
            if (integral < 5 || !startClickFlag) {
                if (integral < 5) {
                    alert('积分不足');
                }
            } else {

                //隐藏开始按钮
                $('.startBtn').hide();

                integral -= 5;
                $('.integral').text(integral);  //积分数 - 5

                // ‘开始按钮’ 点击过后变为false
                startClickFlag = false;

                //卡牌转到背面
                rotateCardOpposite(function () {
                    //卡牌转到背面以后 移动
                    flag = true;
                });

                //获取屏幕的最大宽度
                var mWidth = $(window).width();

                //判断屏幕大小，然后进行位置移动
                //大屏幕
                if (mWidth > 320) {
                    if (flag) {  //判断卡牌是否转到了背面
                        //对卡牌进行移动
                        var timer;
                        var num = 5;
                        timer = setInterval(function () {
                            num--;
                            moveCard();
                            if (num == 0) {
                                clearInterval(timer);
                                clickCardFlag = true;
                            }
                        }, 500)
                    }
                }
                //表示是小屏幕手机
                else {
                    if (flag) {  //判断卡牌是否转到了背面
                        //对卡牌进行移动
                        var timers;
                        var nums = 5;
                        timers = setInterval(function () {
                            nums--;
                            moveCardSmall();
                            if (nums == 0) {
                                clearInterval(timers);
                                clickCardFlag = true
                            }
                        }, 500)
                    }
                }

            }
        });

        //卡牌移动完毕，点击卡牌进行抽奖
        $('.card>.opposite').tap(function () {
            if (clickCardFlag) {

                //发送请求
                //获取到奖品以及奖品名称设置 奖品图片
                getPrize();

                //显示模态框
                $('.dialog').show();
                clickCardFlag = false;  //禁止再次点击卡牌
            }
        });

        // 模态框 '领取' 按钮事件
        $('.dialog .determineBtn').tap(function () {

            flag = true;
            startClickFlag = true;  //开始按钮可以点击
            //跳转到领奖页面
            window.location.href = "fillInformation.html?token=" + oToken;
        });

        // 模态框 '再来一次' 按钮事件
        $('.dialog .againBtn').tap(function () {
            //隐藏模态框
            $('.dialog').hide();
            //牌面转到正面  奖品这一面
            rotateCardFront();
            //更新奖品数据
            getProduct();
            flag = true;
            startClickFlag = true;  //开始按钮可以点击
            $('.startBtn').show();  //显示开始按钮
        })

    });


    /**
     * 请求 获奖的奖品
     */
    function getPrize() {
        var url = 'data/cardLottery/getPrizeData.json';
        $.ajax({
            url: url,
            type: "GET",
            success: function (res) {
                //渲染模态框奖品
                $('.dialog .prizeImg')[0].src = res.prizeSrc;
            },
            error: function (err) {
                console.log(err);
            }
        })
    }


    /**
     * 请求奖品列表数据
     * @param url
     * @param level
     */
    function getProduct() {
        var data = {"level": 2};
        var baseData = base.encode(JSON.stringify(data));
        //拼接参数
        // url = url + baseData;
        var url = "http://t.bjwddj.com/luckGame/data/" + baseData;
        $.ajax({
            url: url,
            type: "GET",
            success: function (res) {
                console.log(res);
                //渲染奖品列表
                // $.each(res.frontList, function (index, ele) {
                //     $('.cardWrap .front')[index].src = ele.src;
                // });
            },
            error: function (err) {
                console.log(err);
            }
        })
    }

    /**
     * 获取个人积分
     * @param callback 回调函数
     */
    function getIntegral(callback) {
        var url = 'data/cardLottery/getIntegralData.json';
        $.ajax({
            url: url,
            type: "GET",
            success: function (res) {
                $('.integral').text(res.integral);  //设置 我的积分num
                if (callback) callback();
            },
            error: function (err) {
                console.log(err);
            }
        })
    }

    /**
     * 对卡牌进行移动
     * @param callback
     */
    function moveCard(callback) {
        //随机打乱卡片卡片
        //一个存放原来位置的数组
        var positionArr = [
            {top: 0, left: 0, right: 'initial', transform: 'translateX(0)'},
            {top: 0, left: '50%', right: 'initial', transform: 'translateX(-50%)'},
            {top: 0, left: 'initial', right: 0, transform: 'translateX(0)'},
            {top: '142px', left: 0, right: 'initial', transform: 'translateX(0)'},
            {top: '142px', left: '50%', right: 'initial', transform: 'translateX(-50%)'},
            {top: '142px', left: 'initial', right: 0, transform: 'translateX(0)'}
        ];
        //获取打乱之后的数组
        var temArr1 = roa(positionArr);

        $('.card1').css(temArr1[0]);
        $('.card2').css(temArr1[1]);
        $('.card3').css(temArr1[2]);
        $('.card4').css(temArr1[3]);
        $('.card5').css(temArr1[4]);
        $('.card6').css(temArr1[5]);
        if (callback) callback()
    }

    /**
     *  对卡牌进行移动(兼容小屏方法)
     * @param callback
     */
    function moveCardSmall(callback) {
        var positionArr2 = [
            {top: 0, left: 0, right: 'initial', transform: 'translateX(0)'},
            {top: 0, left: '50%', right: 'initial', transform: 'translateX(-50%)'},
            {top: 0, left: 'initial', right: 0, transform: 'translateX(0)'},
            {top: '130px', left: 0, right: 'initial', transform: 'translateX(0)'},
            {top: '130px', left: '50%', right: 'initial', transform: 'translateX(-50%)'},
            {top: '130px', left: 'initial', right: 0, transform: 'translateX(0)'}
        ];
        var temArr2 = roa(positionArr2);
        $('.card1').css(temArr2[0]);
        $('.card2').css(temArr2[1]);
        $('.card3').css(temArr2[2]);
        $('.card4').css(temArr2[3]);
        $('.card5').css(temArr2[4]);
        $('.card6').css(temArr2[5]);
        if (callback) callback()
    }

    /**
     * 随机arr
     * @param arr 需要进行随机化的数组
     * @returns {Array} 返回随机排列之后的数组
     */
    function roa(arr) {
        //arr为可能出现的元素集合
        var temp = new Array();    //temp存放生成的随机数组
        var count = arr.length;
        for (var i = 0; i < count; i++) {
            var num = Math.floor(Math.random() * arr.length); //生成随机数num
            temp.push(arr[num]);    //获取arr[num]并放入temp
            arr.splice(num, 1);
        }
        return temp;
    }

    /**
     * 牌面翻到背面
     * @param callback
     */
    function rotateCardOpposite(callback) {
        //翻转背面
        $.each($('.card>.opposite'), function (index, ele) {
            $(ele).css({transform: 'rotateY(0)'});
        });
        //翻转正面
        $.each($('.card>.front'), function (index, ele) {
            $(ele).css({transform: 'rotateY(180deg)'});
        });
        //是否需要执行回调函数
        if (callback) callback();
    }

    /**
     * 牌面翻到正面 到奖品这一面
     * @param callback
     */
    function rotateCardFront(callback) {
        //转背面
        $.each($('.card>.opposite'), function (index, ele) {
            $(ele).css({transform: 'rotateY(180deg)'});
        });
        //转正面
        $.each($('.card>.front'), function (index, ele) {
            $(ele).css({transform: 'rotateY(0)'});
        });
        //是否需要执行回调函数
        if (callback) callback();
    }
})(window);