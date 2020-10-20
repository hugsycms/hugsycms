import { map, get, keys, filter, isNil, set, indexOf, split, isObject, isUndefined } from 'lodash';
import moment from 'moment';
import { formatTimeToUTC } from '@/utils/format';

export const formDescriptionsFromApi = (data: any) => {
  return map(data, item => {
    return {
      ...item,
      fields: map(get(item, 'fields'), field => {
        return {
          ...field,
          isNewRow: get(field, 'is_new_row'),
          inputType: get(field, 'input_type'),
          inputProps: JSON.parse(`${get(field, 'input_props')}`),
          formItemLayout: JSON.parse(`${get(field, 'form_item_layout')}`),
          rules: JSON.parse(`${get(field, 'rules')}`),
          styles: JSON.parse(`${get(field, 'styles')}`),
        };
      }),
    };
  });
};

export const fromApi = (data: any, nativeFormDescriptions: any) => {
  const result = {};
  map(nativeFormDescriptions, (desctiption, key) => {
    const { tranfer_rules: tranferRules } = desctiption;
    let type = 'default';
    let path = key;
    if (tranferRules && JSON.parse(tranferRules)) {
      const tranferRulesJson = JSON.parse(tranferRules);
      type = get(tranferRulesJson, 'type') ? get(tranferRulesJson, 'type') : 'default';
      path = get(tranferRulesJson, 'path') ? get(tranferRulesJson, 'path') : key;
    }

    switch (type) {
      case 'key_and_keyNote':
        set(result, `${key}.key`, get(data, path));
        set(result, `${key}.keyNote`, get(data, `${path}Note`));
        break;
      case 'stage':
        set(result, `${key}.0`, get(data, `${key}h`));
        set(result, `${key}.1`, get(data, `${key}m`));
        break;
      case 'apgar':
        map(get(data, 'noenateRecord'), (record, index) => {
          set(result, `${key}.${index}.apgar1`, get(record, 'apgar1'));
          set(result, `${key}.${index}.apgar5`, get(record, 'apgar5'));
          set(result, `${key}.${index}.apgar10`, get(record, 'apgar10'));
        });
        break;
      case 'moment':
        set(result, key, moment(get(data, path)));
        break;
      case 'default':
      default:
        set(result, key, get(data, path));
        break;
    }
  });
    return {
    ...result,
    id: get(data, 'id'),
  };
};

export const toApi = (data: any, nativeFormDescriptions: any) => {
  // 先过滤 object 类型
  // 先过滤 object 类型
  const isObjectKeyArray: any[] = [];
  const isNotObjectKeyArray: any[] = [];
  map(data, (item, key) => {
    if (isObject(item)) {
      isObjectKeyArray.push(key);
    } else {
      isNotObjectKeyArray.push(key);
    }
  });
  const result = {};
  const dataKeys: any[] = [...isObjectKeyArray, ...isNotObjectKeyArray];

  // TODO: 特殊情况，是否能自动化？
  // TODO: 修改的时候，没有携带 noenateRecords ID
  set(result, 'noenateRecords', get(data, 'fetusAppendages'));

  // 如果是对象的情况下
  map(dataKeys, key => {
    const item = get(data, key);
    const tranferRules = get(nativeFormDescriptions, `${key}.tranfer_rules`);
    let type = 'default';
    let path = key;
    if (tranferRules && JSON.parse(tranferRules)) {
      const tranferRulesJson = JSON.parse(tranferRules);
      type = get(tranferRulesJson, 'type') ? get(tranferRulesJson, 'type') : 'default';
      path = get(tranferRulesJson, 'path') ? get(tranferRulesJson, 'path') : key;
    }

    switch (type) {
      case 'key_and_keyNote':
        set(result, path, get(item, 'key'));
        set(result, `${path}Note`, get(item, 'keyNote'));
        break;
      case 'stage':
        set(result, `${key}h`, Number(get(item, '0')));
        set(result, `${key}m`, Number(get(item, '1')));
        break;
      case 'apgar':
        map(get(data, 'noenateRecord'), (record, index) => {
          set(result, `${key}.${index}.apgar1`, get(record, 'apgar1'));
          set(result, `${key}.${index}.apgar5`, get(record, 'apgar5'));
          set(result, `${key}.${index}.apgar10`, get(record, 'apgar10'));
        });
        break;
      case 'moment':
        set(result, path, formatTimeToUTC(item));
        break;
      case 'fetusAppendages':
        break;
      case 'default':
      default:
        set(result, path, item);
        break;
    }
  });

  return result;
};
