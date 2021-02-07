import http from './http';

export default{
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