import Vue from 'vue'
import 'ant-design-vue/dist/antd.css';
import './styles/global.css';

import { Layout } from 'ant-design-vue';
import { Button } from 'ant-design-vue';
import { Menu } from 'ant-design-vue';
import { Icon } from 'ant-design-vue';
import { Table } from 'ant-design-vue';
import { Divider } from 'ant-design-vue';
import { Input } from 'ant-design-vue';

import App from './App'

Vue.config.productionTip = false

Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Table);
Vue.use(Divider);
Vue.use(Input);

new Vue({
  render: h => h(App),
}).$mount('#app')
