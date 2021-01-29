export default {
    // 复制至粘贴板
    copyToClipboard(text) {
        let textArea = document.createElement('textarea');
        textArea.style.position = 'fixed';
        textArea.style.zIndex = -1;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '1em';
        textArea.style.height = '1em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (err) {
            console.log('该浏览器不支持点击复制到剪贴板');
        }

        document.body.removeChild(textArea);
    },
    // 获取当前日期
    getCurDate() {
        let date = new Date(),
            mm = date.getMonth() + 1,
            dd = date.getDate();

        return [date.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
        ].join('-');
    },
    // 向左填充指定位数'0'
    str_pad(str, len) {
        str += '';
        while (str.length < len) str = '0' + str;
        return str;
    },

    accAdd(arg1, arg2) {
        let r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));

        let mul1 = this.accMul(arg1, m),
            mul2 = this.accMul(arg2, m);
        return this.accDiv(mul1 + mul2, m);
        // return (arg1 * m + arg2 * m) / m;
    },
    accSub(arg1, arg2, fixed) {
        let r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        if(typeof fixed != 'undefined') {
            n = fixed;
        } else {
            //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
        }

        return ((arg2 * m - arg1 * m) / m).toFixed(n);
    },
    accMul(arg1, arg2) {
        let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) {
        }
        try {
            m += s2.split(".")[1].length
        } catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    accDiv(arg1, arg2) {
        let t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length
        } catch (e) {
        }
        try {
            t2 = arg2.toString().split(".")[1].length
        } catch (e) {
        }
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));

        return (r1 / r2) * Math.pow(10, t2 - t1);
    }

}