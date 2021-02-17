import { Vue, Component } from 'vue-property-decorator';
import CookieTable from './modules/cookie/index';

const menu = [
  {
    icon: 'user',
    title: 'cookie'
  },
  {
    icon: 'video-camera',
    title: '追踪'
  }
];

@Component({
  components: {
    CookieTable
  }
})
export default class App extends Vue {
  private collapsed = false;

  public render () {
    const menu = this.createMenu();

    const cookieTable = this.createCookie();

    return <a-layout>
      <a-layout-sider collapsed={this.collapsed}
                      trigger={null}
                      collapsible>
        { menu }
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff;">
          <a-icon
            class="trigger"
            type={this.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => (this.collapsed = !this.collapsed)}
          />
        </a-layout-header>
        <a-layout-content style="margin: 24px 16px; padding: 24px; background: rgb(255, 255, 255); min-height: 600px">
          { cookieTable }
        </a-layout-content>
      </a-layout>
    </a-layout>;
  }

  public createMenu () {
    const children = menu.map((val,index) => {
      return <a-menu-item key={index}>
        <a-icon type={val.icon} />
        <span>{val.title}</span>
      </a-menu-item>
    });

    return <a-menu theme="dark" mode="inline">
      {children}
    </a-menu>;
  }

  createCookie () {
    return <cookie-table />
  }
}