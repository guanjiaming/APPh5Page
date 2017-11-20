var data = {
    "title": "在线考试",
    "exam": [
        {
            "title": "一、单选题",
            "infos": null,
            "values": [
                {
                    "type": 1,
                    "questionStem": "1、您正在使用（ ）app接单赚钱？",
                    "options": [
                        "东东到家",
                        "微东到家",
                        "微微在哪",
                        "微东微东"
                    ],
                    "answer": [
                        "B"
                    ],
                    "analysis": null
                },
                {
                    "type": 1,
                    "questionStem": "2.成为配送员需要系统审核的证件是（ ）",
                    "options": [
                        "银行卡",
                        "学生证",
                        "身份证",
                        "工作证"
                    ],
                    "answer": [
                        "C"
                    ],
                    "analysis": null
                }
            ]
        },
        {
            "title": "二、多选题",
            "infos": null,
            "values": [
                {
                    "type": 2,
                    "questionStem": "1.为保能在时效内完成送达，在抢单时需要参考下列哪些信息（ ）",
                    "options": [
                        "抢单单数",
                        "取货距离",
                        "投递距离",
                        "预约配送时间"
                    ],
                    "answer": [
                        "A",
                        "B",
                        "C",
                        "D"
                    ],
                    "analysis": null
                },
                {
                    "type": 2,
                    "questionStem": "2.作为一个配送员的基本职能是什么？（ ）",
                    "options": [
                        "准时送达",
                        "保证配送货物完好",
                        "礼貌服务",
                        "遵守交通规则，保证自身安全"
                    ],
                    "answer": [
                        "A",
                        "B",
                        "C",
                        "D"
                    ],
                    "analysis": null
                },
                {
                    "type": 2,
                    "questionStem": "3.通过审核及考试培训后，需要准备哪些？（ ）",
                    "options": [
                        "充值保证金",
                        "交通工具，电动车/摩托车/汽车",
                        "一部智能手机",
                        "一台电脑"
                    ],
                    "answer": [
                        "B",
                        "C"
                    ],
                    "analysis": null
                },
                {
                    "type": 2,
                    "questionStem": "4.以下哪些行为属于一经发现账号永久停用？（ ）",
                    "options": [
                        "刷单行为",
                        "与客户发生争执、冲突等，导致重大投诉",
                        "私自拆、取、扣留货物",
                        "破坏配送物品。"
                    ],
                    "answer": [
                        "A",
                        "B",
                        "C",
                        "D"
                    ],
                    "analysis": null
                }
            ]
        },
    ]
};

function test(test_id) {
    if (test_id != "") {
        //$.ajax({
        //type : 'POST',
        //url : 'data/exam.json',
        //data : {'testId':test_id},
        //dataType : "json",
        //success : function(data){
        // console.log(data);
        var titleB = data.title;
        var exam = data.exam;
        var test_box = '';

        $.each(exam, function (h, exam) {
            var title = exam.title;
            var info = exam.infos != null ? '<h4 class="jxz-title">' + exam.infos + '</h4>' : '';
            var test = exam.values;
            var topic_box = '';

            $.each(test, function (i, topic) {//1单选2多选
                var type = topic.type;
                var options = topic.options;
                var answer = topic.answer;
                var analysis = topic.analysis == null || topic.analysis == "" ? "无" : topic.analysis;
                var option_box = '';//题目

                if (type == 1) {
                    //answer_op = '';
                    $.each(options, function (j, option) {
                        var op = convert(j);
                        option_box += '<div class="jxz-option radio">' +
                            '<label>' +
                            '<input name="test' + h + '' + i + '" type="radio" value="' + op + '">' + op + '&nbsp;' + option +
                            '<div class="cricle1"><p class="cricle2"></p></div>' +
                            '</label>' +
                            '</div>';
                    });
                } else if (type == 2) {
                    //answer_op = '';
                    $.each(options, function (j, option) {
                        var op = convert(j);
                        option_box += '' +
                            '<div class="jxz-option checkbox">' +
                            '<label>' +
                            '<input name="test' + h + '' + i + '" type="checkbox" value="' + op + '"> ' + op + '&nbsp;' + option +
                            '<div class="cricle1"><p class="cricle2"></p></div>' +
                            '</label>' +
                            '</div>';
                    });
                }
                var answer_op = '';//答案
                if (type == 1 || type == 2) {
                    $.each(answer, function (i, aw) {
                        answer_op += answer.length == (i + 1) ? aw : aw + " ";
                    });
                }
                topic_box += '<div class="testCon" data-type="' + type + '" data-answer="' + answer_op + '">' +
                    '<h4 class="jxz-title">' + topic.questionStem + '</h4>' +
                    option_box +
                    '</div>';

            });
            test_box += '<div class="jxz-box col-md-12">' +
                '<h4 class="tesTitle">' + title + '</h4>' +
                info +
                topic_box
            '</div>';
        });

        var test_html = '<form class="" id="testForm">' +
            '<div class="test-form-box">' +
            test_box +
            '</div>' +
            '<div class="form-group assignment">' +
            '<button type="button" class="btn btn-primary" onclick="assignment()">交卷</button>' +
            '</div>' +
            '</form>';
        $('#testArea').html(test_html)
    } else {
        alert("试题获取失败！");
    }
}

//交卷
function assignment() {
    $(".testCon h4").css("color", "#555");
    var _temp_tip = "yes";
    var tall = 0;
    $(".testCon").each(function (i) {
        var type = $(this).attr("data-type");
        if (type == 2) {
            if ($(this).find('input[type="checkbox"]:checked').val() == undefined) {
                _temp_tip = "no";
                $(this).find("h4").css("color", "#04d29d");
            }
        } else if (type == 1) {
            if ($(this).find('input[type="radio"]:checked').val() == undefined) {
                _temp_tip = "no";
                $(this).find("h4").css("color", "#04d29d");
            }
        }
        tall++;
    });
    /*题目没做完弹窗*/
    if (_temp_tip == "no") {
        alert("您还有题目没做完！");
        return;
    }

    var err = 0;
    $(".testCon").each(function (i) {
        var type = $(this).attr("data-type");
        var aw = $(this).attr("data-answer");
        var set_answer = '';

        if (type == 2) {

            var ckAarray = $(this).find('input[type="checkbox"]:checked');
            var ans = '';
            ckAarray.each(function (i, item) {
                ans += ckAarray.length == i + 1 ? item.value : item.value + " ";
            });
            if (ans != aw) {
                /*$(this).find("h4").css("color","red");*/
                $(this).addClass("error");
                err++;
            } else {
                $(this).addClass("true");
            }
            set_answer = ans;

        } else if (type == 1) {

            var rd = $(this).find('input[type="radio"]:checked').val();
            if (rd != aw) {
                /*$(this).find("h4").css("color","red");*/
                $(this).addClass("error");
                err++;
            } else {
                $(this).addClass("true");
            }
            set_answer = rd;

        }
        ;
        $(this).find("span.userAnswer").text(set_answer);

    });
    $(".topic-answer").show()

    // 题目判断对错弹窗
    if (_temp_tip !== "no") {
        var testLength = $(".testCon").size();
        var testError = $(".error").size();
        var testTrue = $(".true").size();
        //alert(testTrue);
        if (testTrue == testLength) {
            $(".windowBox2").show();
        } else {
            $(".Wtest1").text(testTrue + "题");
            $(".Wtest2").text(testError + "题");
            $(".windowBox1").show();
        }
        ;
    }
    ;
}

//数字转换成大写字母
function convert(num) {
    num = num + 1;
    return num <= 26 ? String.fromCharCode(num + 64) : convert(~~((num - 1) / 26)) + convert(num % 26 || 26);
}