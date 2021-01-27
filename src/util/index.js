export default {
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
    }
}