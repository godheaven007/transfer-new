import axios from 'axios';
import { Message} from 'element-ui';
import router from "@/router";
import Storage from '@/util/storage';

const handleResponse = (res) => {
    if(res.code === 0) {
        Message.warning({
            duration: 2000,
            message: res.msg
        });
        return Promise.reject(res);
    } else if(res.code === 1){
        return Promise.resolve(res);
    } else if(res.code === 401){
        router.push('/login');
        Message.warning({
            duration: 2000,
            message: res.msg
        });
        return Promise.reject(res);
    }
}

const service = axios.create({});

service.interceptors.request.use(config => {
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    // config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
    // config.headers = {
    //     'Content-Type':'application/x-www-form-urlencoded' //配置请求头
    // }
    const token = window.localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

service.interceptors.response.use(response => {
    //接收到响应数据并成功后的一些共有的处理，关闭loading等
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    console.log(response);
    if (response.status === 200) {
        return handleResponse(response.data);
    } else {
        return Promise.reject(response);
    }
}, error => {
    if (error && error.response) {
        // 1.公共错误处理
        // 2.根据响应码具体处理
        switch (error.response.status) {
            case 400:
                error.message = '错误请求';
                break;
            case 401:
                error.message = '未授权，请重新登录';
                break;
            case 403:
                error.message = '拒绝访问';
                break;
            case 404:
                error.message = '请求错误,未找到该资源';
                // window.location.href = "/NotFound";
                break;
            case 405:
                error.message = '请求方法未允许';
                break;
            case 408:
                error.message = '请求超时';
                break;
            case 500:
                error.message = '服务器端出错';
                break;
            case 501:
                error.message = '网络未实现';
                break;
            case 502:
                error.message = '网络错误';
                break;
            case 503:
                error.message = '服务不可用';
                break;
            case 504:
                error.message = '网络超时';
                break;
            case 505:
                error.message = 'http版本不支持该请求';
                break;
            default:
                error.message = `连接错误${error.response.status}`;
        }
    } else {
        // 超时处理
        if (JSON.stringify(error).includes('timeout')) {
            Message.error('服务器响应超时，请刷新当前页');
        }
        error.message('连接服务器失败');
    }

    Message.error(error.message);

    return Promise.reject(error.response)
});

export default service;