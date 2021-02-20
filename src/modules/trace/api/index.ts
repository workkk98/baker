/**
 * @file 操作storage的类
 */

import { setStorageItem, getStorageItem } from 'src/chrome/storage';

export interface StrategyForm {
  origin: string;
  name: string;
  target: string;
  strategy: string;
}

const strategyID = 'strategyID';

// 因为chrome.storage类似于localstorage，不能存储对象等类型，故而在这里将strategyJSON化。
function strategyStringify (strategy: StrategyForm, value: string) {
  return !value ? `${JSON.stringify(strategy)}` : `${value};${JSON.stringify(strategy)}`;
}

function parseStrategy (value: string) {
  if (value.length === 0) {
    return [];
  }
  const strategyList = value.split(';');
  return strategyList.map<StrategyForm> (strategy => {

    // TODO: 更好的容错机制
    try {
      return JSON.parse(strategy);
    } catch (error) {
      console.error(error);
      return null;
    }
  }).filter(value => value !== null);
}

class StrategyStorage {

  public strategyList: StrategyForm[] = [];
  public strategyStr = '';

  public async get (refresh: boolean): Promise<StrategyForm[]> {
    if (this.strategyList.length > 0) {
      return this.strategyList;
    }

    if (!refresh) {
      return this.strategyList;
    }

    const value = await getStorageItem(strategyID);
    this.strategyStr = value;
    return this.strategyList = parseStrategy(value);
  }

  public set (form: StrategyForm) {
    // 写入到storage中
    return setStorageItem(strategyID, strategyStringify(form, this.strategyStr));
  }
}

export const strategyStorage = new StrategyStorage();