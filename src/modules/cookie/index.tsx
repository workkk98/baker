import { Vue, Component } from 'vue-property-decorator';
import { fetchAllCookie } from './fetch';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '值',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: '域名',
    dataIndex: 'domain',
    key: 'domain',
  },
  {
    title: '路径',
    key: 'path',
    dataIndex: 'path',
    scopedSlots: { customRender: 'tags' },
    width: 300
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

let data: chrome.cookies.Cookie[] = [];

@Component
export default class CookieTable extends Vue {
  created () {
    this.fetchData();
  }

  public filterData (value: string) {
    const regex = new RegExp(value);
    this.fetchData(regex);
  }

  public async fetchData (pattern?: RegExp) {
    const result = await fetchAllCookie();
    data = result
      .filter(val => pattern? pattern.test(val.domain) : true)
      .map((val, index) => {
      return {
        ...val,
        key: index
      }
    });
    this.$forceUpdate();
  }

  public render () {
    return <div>
    <a-input-search 
      style="width: 200px"
      placeholder="请输入域名"
      onSearch={this.fetchData} />
    <a-table
      columns={columns}
      data-source={data}
      scopedSlots={
        {
          action: this.createActionColumns()
        }
      }>
    </a-table>
    </div>
  }

  public createActionColumns () {
    return () => {
      return <span>
        <a>编辑</a>
        <a-divider type="vertical" />
        <a>删除</a>
      </span>
    }
  }
}