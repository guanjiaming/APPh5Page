/**
 * 返回微东到家的域名
 * @returns {string}
 */
function getWddjUrl() {
    // return "http://t.bjwddj.com";
    // return "http://local.bjwddj.com:9999";
    // return "http://re.bjwddj.com";
    return "http://re.shijiweidong.com";
}

/**
 * 意见反馈
 * @returns {string}
 */
function getfeedbackLogUrl() {
    return getWddjUrl() + "/feedbackLog/save/"
}

/**
 * 身份认证-在线考试通过
 * @returns {string}
 */
function getexamPassUrl() {
    return getWddjUrl() + "/identityReview/examPass/"
}

/**
 * 获取抽奖数据
 * @returns {string}
 */
function getLuckGameUrl() {
    return getWddjUrl() + "/luckGame/data/"
}

/**
 * 抽奖
 * @returns {string}
 */
function getLuckGameDoItUrl() {
    return getWddjUrl() + "/luckGame/doIt/"
}

/**
 * 查看中奖记录
 * @returns {string}
 */
function getLuckGameListUrl() {
    return getWddjUrl() + "/luckGame/list/"
}

/**
 * 领奖
 * @returns {string}
 */
function getPrizeUrl() {
    return getWddjUrl() + "/luckGame/getPrize/"
}

/**
 * 查看领奖详情
 * @returns {string}
 */
function getLuckGameDetail() {
    return getWddjUrl() + "/luckGame/detail/"
}

/**
 * 获取当前积分
 * @returns {string}
 */
function getIntegral() {
    return getWddjUrl() + "/luckGame/getIntegral/"

}

/**
 * 获取用户昵称
 * @returns {string}
 */
function getNickname() {
    return getWddjUrl() + "/user/getNickname/"
}

/**
 * 领取奖励
 * @returns {string}
 */
function getShareAward() {
    return getWddjUrl() + "/share/award/"
}

/**
 * 查看历史版本
 * @returns {string}
 */
function getVersion() {
    return getWddjUrl() + "/version/list/"
}




