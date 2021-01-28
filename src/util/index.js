export default {
    // 复制至粘贴板
    copyToClipboard(text) {
        var textArea = document.createElement('textarea');
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
    }
}