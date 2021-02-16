import PayDialog from "@/components/PayDialog";

let curPayVm = null;

function createPay({Vue, opt}) {
    let Constructor = Vue.extend(PayDialog);
    let curPayVm = new Constructor({
        propsData: opt
    });

    curPayVm.$mount();
    document.body.appendChild(curPayVm.$el);

    return curPayVm;
}

export default {
    install(Vue, options) {
        Vue.prototype.$pay = function (opt) {
            if(curPayVm) {
                // curPayVm.close();
            }
            curPayVm = createPay({Vue, opt});
            curPayVm.$on('emptyInstance', function () {
                curPayVm = null;
            });
        }
    }
}