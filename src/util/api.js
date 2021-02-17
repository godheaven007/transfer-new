import http from '@/util/http';

export default{
    /**
     * 首页模块
     */
    getNotice(param) {
        return http.get(`/home/notice`, param);
    },
    getPersonalInfo(param) {
        return http.get(`/home/personalInfo`, param);
    },
    /**
     * User : 用户模块
     */
    register(param) {
        return http.get(`/user/register`, param);
    },
    login(param) {
        return http.get(`/user/login`, param);
    },
    resetPwd(param) {
        return http.get(`/user/resetPassword`, param);
    },
    /**
     * 转账模块
     */
    // 支付宝批量转账接口
    batchTransfer(param) {
        return http.post(`/transfer/batchTransfer`, param);
    },
    // 批量转账上传excel接口
    batchTransferByExcel(param) {
      return http.post(`/transfer/batchTransferByExcel`, param);
    },
    // 下载转账excel模板
    downloadTransferExcel(param) {
        return http.get(`/transfer/downloadTransferExcel`, param);
    },
    // 获取转账订单列表
    getBatchList(param) {
        return http.get(`/transfer/getBatchList`, param);
    },
    // 获取批量转账记录列表
    getTransferList(param) {
        return http.get(`/transfer/getTransferList`, param);
    },
    // 订单充值
    recharge(param) {
        return http.get(`/transfer/recharge`, param);
    },
    // 取消订单
    cancelOrder(param) {
        return http.get(`/transfer/cancelOrder`, param);
    },
    // 充值转账信息
    getRechargeInfo() {
        return http.get(`/transfer/rechargeInfo`);
    },
    // 用户提现
    getCash(param) {
        return http.get(`/transfer/withdrawal`, param);
    },
    // 用户提现记录
    getCashRecord() {
        return http.get(`/transfer/withdrawalRecord`);
    },

    /**
     * 支持模块
     */
    // 获取短信验证码
    getSMSCode(param) {
        return http.get(`/Support/sendSms`, param);
    },
    // 生成微信转账二维码
    getQRCode(param) {
        return http.get(`/Support/qrcode`, param);
    }
}