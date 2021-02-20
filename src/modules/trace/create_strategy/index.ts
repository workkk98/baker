/**
 * @file 创建create的form表单
 */

import { Vue } from 'vue-property-decorator';
import { Modal } from 'ant-design-vue';
import { CreateElement } from 'vue';
import { StrategyForm, strategyStorage } from '../api/';

function createSelectOption (h: CreateElement, value: string) {
  return h('a-select-option', {
    props: {
      value
    }
  }, [value]);
}

// 创建目标url和源url的输入框
function createURLInput (h: CreateElement, form: StrategyForm, key: keyof StrategyForm) {
  return h('a-input', {
    props: {
      value: form[key]
    },
    on: {
      'change.value': (value: string) => form[key] = value
    }
  }, [
    h('a-select', 
      {
        slot: 'addonBefore',
        attrs: {
          'default-value': "http://"
        },
      },
      [
        createSelectOption(h, 'http://'),
        createSelectOption(h, 'https://')
      ])
  ]);
}

//创建策略名称radio
function createStrategyRadio (h: CreateElement, form: StrategyForm, key: keyof StrategyForm) {
  return h('a-radio-group', {
    attrs: {
      'button-style': 'solid'
    },
    on: {
      input: (val: string) => form[key] = val
    }
  }, [
    h('a-radio-button', {
      attrs: {
        value: 'copy'
      }
    }, ['拷贝策略'])
  ])
}
function createModalContent (form: StrategyForm) {
  return function (h: CreateElement) {
    return h('a-form', 
    {
      props: {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 }
      }
    }, 
    [
      h('a-form-item', {
        props: {
          label: '源url'
        }
      }, [createURLInput(h, form, 'origin')]),

      h('a-form-item', {
        props: {
          label: 'name'
        }
      }, [h('a-input', {
        props: {
          value: form.name
        },
        on: {
          'change.value': (value: string) => form.name = value
        }
      })]),

      h('a-form-item', {
        props: {
          label: '目标url'
        }
      }, [createURLInput(h, form, 'target')]),

      h('a-form-item', {
        props: {
          label: '策略名称',
          value: form.strategy
        }
      }, [createStrategyRadio(h, form, 'strategy')]),
    ]);
  }
}

export default function openCreateModal () {
  const form: StrategyForm = {
    origin: '',
    name: '',
    target: '',
    strategy: ''
  };
  return Modal?.confirm({
    title: '创建策略',
    width: 600,
    content: createModalContent(form),
    onOk: async () => {
      console.log(form);
      await strategyStorage.set(form);
      Vue.prototype.$message.success('设置cookie成功');
    }
  });
}