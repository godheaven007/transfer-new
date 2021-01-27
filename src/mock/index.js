import Mock from 'mockjs'

Mock.mock('/api/user/login', {
    "code": 200,
    "data": {
        "id|1000-2000": 1000,
        "username": "@cname",
        "email": "@email",
        "phone": /^1[385][1-9]\d{8}/,
        "role|0-1": 0,
        "createTime": '@date("yyyy-MM-dd HH:mm:ss")',
        "updateTime": '@date("yyyy-MM-dd HH:mm:ss")'
    }
})