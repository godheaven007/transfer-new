import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios' // 把axios挂载到vue实例
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import App from './App.vue'
import router from './router'
import store from './store'
import plugin from "@/plugin";
import 'element-ui/lib/theme-chalk/index.css'

// mock开关
const mock = false;
if (mock) {
  require('@/mock/index');
}

// axios全局配置
axios.defaults.baseURL = '/api/v1'; // 代理跨域,使用vue.config.js
axios.defaults.timeout = 8000;

// 全局引入
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

// 按需加载
import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Icon,
  Row,
  Col,
  Upload,
  Badge,
  Card,
  Steps,
  Step,
  Tooltip,
  Collapse,
  CollapseItem,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui';
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Tooltip);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

// excel导出
Vue.prototype.$FileSaver = FileSaver;
Vue.prototype.$XLSX = XLSX;
Vue.use(VueAxios, axios);
Vue.use(plugin);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
