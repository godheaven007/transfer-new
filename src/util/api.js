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