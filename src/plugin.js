/**Vue.use( plugin )
参数：

{Object | Function} plugin
用法：

安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

该方法需要在调用 new Vue() 之前被调用。

当 install 方法被同一个插件多次调用，插件将只会被安装一次。

参考：插件
 */

import CustomVideo from "@/components/CustomVideo";

// 如果插件是一个函数
// export default function plugin(Vue, options) {
//
//     Vue.prototype.$toast = function (msg) {
//         let Constructor = Vue.extend(toast);
//         let curVm = new Constructor();
//
//         curVm.$slots.default = [msg];
//         curVm.$mount();
//         document.body.appendChild(curVm.$el);
//     }
// }

let curVideoVm = null;

function createVideo({Vue, opt}) {
    let {title, url} = opt;

    let Constructor = Vue.extend(CustomVideo);
    let curVideoVm = new Constructor({
        propsData: opt
    });

    curVideoVm.$mount();
    document.body.appendChild(curVideoVm.$el);

    return curVideoVm;
}

export default {
    install(Vue, options) {
        Vue.prototype.$video = function (opt) {
            if(curVideoVm) {
                curVideoVm.close();
            }
            curVideoVm = createVideo({Vue, opt});
            curVideoVm.$on('emptyInstance', function () {
                curVideoVm = null;
            });
        }
    }
}