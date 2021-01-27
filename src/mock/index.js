import Mock from 'mockjs';
import {Random} from 'mockjs';
// http://mockjs.com/
// 财务管理-转账记录
Mock.mock('/api/finance/record', () => {
    let list = [];
    for(let i = 0; i < 10; i++) {
        let o = {
            date: Random.date('yyyy-MM-dd'),
            orderNo: Random.string('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 27, 27),
            account: Random.email(),
            name: Random.cname(),
            money: Random.float(100, 10000, 2, 2),
            remark: Random.cword(2,10),
            type: '公用支付宝',
            status: Random.pick(['等待审核', '等待转账', '转账成功', '转账异常', '转账失败', '已提现', '转账取消', '账号异常'])
        };
        list.push(o);
    }
    return list;
});