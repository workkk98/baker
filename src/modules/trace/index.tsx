import { Vue, Component } from 'vue-property-decorator';
import openCreateModal from './create_strategy';
import { StrategyForm, strategyStorage } from './api/index';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '源url',
    dataIndex: 'origin',
    key: 'origin',
  },
  {
    title: '目标url',
    key: 'target',
    dataIndex: 'target'
  },
  {
    title: '策略名称',
    key: 'strategy',
    dataIndex: 'strategy'
  }
];

interface StrategyData extends StrategyForm {
  key: string;
}

@Component
export default class TraceTable extends Vue {
  private data: StrategyData[] = [];

  created () {
    this.fetchData();
  }

  render () {
    return <div>
      <a-button 
        type="primary"
        onClick={() => {
          openCreateModal();
        }}>
        新建策略
      </a-button>
      <a-divider type="vertical" />
      <a-button 
        type="primary"
        onClick={this.fetchData}>
        刷新策略
      </a-button>
      <a-divider type="vertical" />
      <a-button 
        type="primary"
        onClick={this.removeAll}>
        移除所有
      </a-button>
      <a-table
        style="margin-top: 16px"
        columns={columns}
        data-source={this.data}>
      </a-table>
    </div>
  }

  /**
   * 获取data，每次都会强制刷新
   */
  public async fetchData () {
    const strategyData = await strategyStorage.get(true);
    this.data = strategyData.map((val, index) => {
      return {
        key: index.toString(),
        ...val
      }
    })
  }

  public async removeAll () {
    await strategyStorage.removeAll();
    Vue.prototype.$message.success('移除成功');
    this.fetchData();
  }
}