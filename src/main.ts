import Vue from 'vue'
import 'ant-design-vue/dist/antd.css';
import './styles/global.css';

import { 
  Layout,
  Button,
  Menu,
  Icon,
  Table,
  Divider,
  Input,
  Modal,
  Form,
  message
} from 'ant-design-vue';

import App from './App'

Vue.config.productionTip = false

Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Table);
Vue.use(Divider);
Vue.use(Input);
Vue.use(Form);
Vue.use(Modal);

Vue.prototype.$message = message;

new Vue({
  render: h => h(App)
}).$mount('#app')
