import { map, get, reduce, concat, keyBy, set, isObject, isEmpty, isNil } from 'lodash';
import moment from 'moment';
import { strToJson } from './helper';
import { formatTimeToUTC } from './format';

export const formDescriptionsFromApi = (data) => {
  return map(data, (item) => {
    return {
      ...item,
      fields: map(get(item, 'fields'), (field) => {
        const key = get(field, 'key') as string;
        let name = key;
        let label = get(field, 'label');

        if (key.startsWith('.')) {
          name = key.substring(1);
        }
        // TODO: 主要也是为了兼容 key 为空的时候
        if (isEmpty(key) || isNil(key)) {
          name = get(field, 'label');
          label = '';
        }
        return {
          ...field,
          label,
          name,
          hidden: !get(field, 'isActive') ? true : false,
          input_type: get(field, 'inputType'),
          special_config: get(field, 'specialConfig'),
          tranfer_rules: get(field, 'tranferRules'),
          inputProps: strToJson(get(field, 'inputProps')),
          input_props: strToJson(get(field, 'inputProps')),
          form_item_layout: get(field, 'formItemLayout'),
          formItemLayout: strToJson(get(field, 'formItemLayout')),
          rules: isEmpty(strToJson(get(field, 'rules'))) ? [] : strToJson(get(field, 'rules')),
          styles: strToJson(get(field, 'styles')),
        };
      }),
    };
  });
};

export const formDescriptionsWithoutSectionApi = (formDescriptions) => {
  return keyBy(
    reduce(
      formDescriptions,
      (sum, formDescription) => {
        return concat(sum, get(formDescription, 'fields'));
      },
      [],
    ),
    'key',
  );
};

export const transferDataToFormByRules = (data: any, nativeFormDescription: any) => {
  const result = {};
  map(nativeFormDescription, (desctiption, key) => {
    const { tranfer_rules: tranferRules } = desctiption;
    let type = 'default';
    let path = key;
    if (strToJson(tranferRules)) {
      const tranferRulesJson = strToJson(tranferRules);
      type = get(tranferRulesJson, 'type') ? get(tranferRulesJson, 'type') : 'default';
      path = get(tranferRulesJson, 'path') ? get(tranferRulesJson, 'path') : key;
    }

    switch (type) {
      case 'stage':
        set(result, `${key}.0`, get(data, `${key}h`));
        set(result, `${key}.1`, get(data, `${key}m`));
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
  return result;
};

export const fromApi = (data: any, nativeFormDescriptions: any) => {
  const result = { ...data };
  map(nativeFormDescriptions, (desctiption, key) => {
    const { tranfer_rules: tranferRules } = desctiption;
    let type = 'default';
    let path = key;
    if (strToJson(tranferRules)) {
      const tranferRulesJson = strToJson(tranferRules);
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
        set(result, key, get(data, path) ? moment(get(data, path)) : null);
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
  map(dataKeys, (key) => {
    const item = get(data, key);
    const tranferRules = get(nativeFormDescriptions, `${key}.tranfer_rules`);
    let type = 'default';
    let path = key;
    if (strToJson(tranferRules)) {
      const tranferRulesJson = strToJson(tranferRules);
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
        set(result, path, item ? formatTimeToUTC(item) : null);
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
