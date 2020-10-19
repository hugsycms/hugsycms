import React from 'react';
import { Select } from 'antd';
import { map } from 'lodash';
import { SelectProps } from 'antd/es/select';

export const countries = [
  {
    name: 'China',
    chinese: '中国',
    code: '86',
  },
  {
    name: 'Hongkong',
    chinese: '中国香港',
    code: '852',
  },
  {
    name: 'Taiwan',
    chinese: '中国台湾',
    code: '886',
  },
  {
    name: 'Angola',
    chinese: '安哥拉',
    code: '0244',
  },
  {
    name: 'Afghanistan',
    chinese: '阿富汗',
    code: '93',
  },
  {
    name: 'Albania',
    chinese: '阿尔巴尼亚',
    code: '335',
  },
  {
    name: 'Algeria',
    chinese: '阿尔及利亚',
    code: '213',
  },
  {
    name: 'Andorra',
    chinese: '安道尔共和国',
    code: '376',
  },
  {
    name: 'Anguilla',
    chinese: '安圭拉岛',
    code: '1254',
  },
  {
    name: 'Antigua and Barbuda',
    chinese: '安提瓜和巴布达',
    code: '1268',
  },
  {
    name: 'Argentina',
    chinese: '阿根廷',
    code: '54',
  },
  {
    name: 'Armenia',
    chinese: '亚美尼亚',
    code: '374',
  },
  {
    name: 'Ascension',
    chinese: '阿森松',
    code: '247',
  },
  {
    name: 'Australia',
    chinese: '澳大利亚',
    code: '61',
  },
  {
    name: 'Austria',
    chinese: '奥地利',
    code: '43',
  },
  {
    name: 'Azerbaijan',
    chinese: '阿塞拜疆',
    code: '994',
  },
  {
    name: 'Bahamas',
    chinese: '巴哈马',
    code: '1242',
  },
  {
    name: 'Bahrain',
    chinese: '巴林',
    code: '973',
  },
  {
    name: 'Bangladesh',
    chinese: '孟加拉国',
    code: '880',
  },
  {
    name: 'Barbados',
    chinese: '巴巴多斯',
    code: '1246',
  },
  {
    name: 'Belarus',
    chinese: '白俄罗斯',
    code: '375',
  },
  {
    name: 'Belgium',
    chinese: '比利时',
    code: '32',
  },
  {
    name: 'Belize',
    chinese: '伯利兹',
    code: '501',
  },
  {
    name: 'Benin',
    chinese: '贝宁',
    code: '229',
  },
  {
    name: 'Bermuda Is',
    chinese: '百慕大群岛',
    code: '1441',
  },
  {
    name: 'Bolivia',
    chinese: '玻利维亚',
    code: '591',
  },
  {
    name: 'Botswana',
    chinese: '博茨瓦纳',
    code: '267',
  },
  {
    name: 'Brazil',
    chinese: '巴西',
    code: '55',
  },
  {
    name: 'Brunei',
    chinese: '文莱',
    code: '673',
  },
  {
    name: 'Bulgaria',
    chinese: '保加利亚',
    code: '359',
  },
  {
    name: 'Burkina Faso',
    chinese: '布基纳法索',
    code: '226',
  },
  {
    name: 'Burma',
    chinese: '缅甸',
    code: '95',
  },
  {
    name: 'Burundi',
    chinese: '布隆迪',
    code: '257',
  },
  {
    name: 'Cameroon',
    chinese: '喀麦隆',
    code: '237',
  },
  {
    name: 'Canada',
    chinese: '加拿大',
    code: '1',
  },
  {
    name: 'Cayman Is',
    chinese: '开曼群岛',
    code: '1345',
  },
  {
    name: 'Central African Republic',
    chinese: '中非共和国',
    code: '236',
  },
  {
    name: 'Chad',
    chinese: '乍得',
    code: '235',
  },
  {
    name: 'Chile',
    chinese: '智利',
    code: '56',
  },
  {
    name: 'Colombia',
    chinese: '哥伦比亚',
    code: '57',
  },
  {
    name: 'Congo',
    chinese: '刚果',
    code: '242',
  },
  {
    name: 'Cook Is',
    chinese: '库克群岛',
    code: '682',
  },
  {
    name: 'Costa Rica',
    chinese: '哥斯达黎加',
    code: '506',
  },
  {
    name: 'Cuba',
    chinese: '古巴',
    code: '53',
  },
  {
    name: 'Cyprus',
    chinese: '塞浦路斯',
    code: '357',
  },
  {
    name: 'Czech Republic',
    chinese: '捷克',
    code: '420',
  },
  {
    name: 'Denmark',
    chinese: '丹麦',
    code: '45',
  },
  {
    name: 'Djibouti',
    chinese: '吉布提',
    code: '253',
  },
  {
    name: 'Dominica Rep',
    chinese: '多米尼加共和国',
    code: '1890',
  },
  {
    name: 'Ecuador',
    chinese: '厄瓜多尔',
    code: '593',
  },
  {
    name: 'Egypt',
    chinese: '埃及',
    code: '20',
  },
  {
    name: 'EI Salvador',
    chinese: '萨尔瓦多',
    code: '503',
  },
  {
    name: 'Estonia',
    chinese: '爱沙尼亚',
    code: '372',
  },
  {
    name: 'Ethiopia',
    chinese: '埃塞俄比亚',
    code: '251',
  },
  {
    name: 'Fiji',
    chinese: '斐济',
    code: '679',
  },
  {
    name: 'Finland',
    chinese: '芬兰',
    code: '358',
  },
  {
    name: 'France',
    chinese: '法国',
    code: '33',
  },
  {
    name: 'French Guiana',
    chinese: '法属圭亚那',
    code: '594',
  },
  {
    name: 'French Polynesia',
    chinese: '法属玻利尼西亚',
    code: '689',
  },
  {
    name: 'Gabon',
    chinese: '加蓬',
    code: '241',
  },
  {
    name: 'Gambia',
    chinese: '冈比亚',
    code: '220',
  },
  {
    name: 'Georgia',
    chinese: '格鲁吉亚',
    code: '995',
  },
  {
    name: 'Germany',
    chinese: '德国',
    code: '49',
  },
  {
    name: 'Ghana',
    chinese: '加纳',
    code: '233',
  },
  {
    name: 'Gibraltar',
    chinese: '直布罗陀',
    code: '350',
  },
  {
    name: 'Greece',
    chinese: '希腊',
    code: '30',
  },
  {
    name: 'Grenada',
    chinese: '格林纳达',
    code: '1809',
  },
  {
    name: 'Guam',
    chinese: '关岛',
    code: '1671',
  },
  {
    name: 'Guatemala',
    chinese: '危地马拉',
    code: '502',
  },
  {
    name: 'Guinea',
    chinese: '几内亚',
    code: '224',
  },
  {
    name: 'Guyana',
    chinese: '圭亚那',
    code: '592',
  },
  {
    name: 'Haiti',
    chinese: '海地',
    code: '509',
  },
  {
    name: 'Honduras',
    chinese: '洪都拉斯',
    code: '504',
  },
  {
    name: 'Hungary',
    chinese: '匈牙利',
    code: '36',
  },
  {
    name: 'Iceland',
    chinese: '冰岛',
    code: '354',
  },
  {
    name: 'India',
    chinese: '印度',
    code: '91',
  },
  {
    name: 'Indonesia',
    chinese: '印度尼西亚',
    code: '62',
  },
  {
    name: 'Iran',
    chinese: '伊朗',
    code: '98',
  },
  {
    name: 'Iraq',
    chinese: '伊拉克',
    code: '964',
  },
  {
    name: 'Ireland',
    chinese: '爱尔兰',
    code: '353',
  },
  {
    name: 'Israel',
    chinese: '以色列',
    code: '972',
  },
  {
    name: 'Italy',
    chinese: '意大利',
    code: '39',
  },
  {
    name: 'Ivory Coast',
    chinese: '科特迪瓦',
    code: '225',
  },
  {
    name: 'Jamaica',
    chinese: '牙买加',
    code: '1876',
  },
  {
    name: 'Japan',
    chinese: '日本',
    code: '81',
  },
  {
    name: 'Jordan',
    chinese: '约旦',
    code: '962',
  },
  {
    name: 'Kampuchea (Cambodia )',
    chinese: '柬埔寨',
    code: '855',
  },
  {
    name: 'Kazakstan',
    chinese: '哈萨克斯坦',
    code: '327',
  },
  {
    name: 'Kenya',
    chinese: '肯尼亚',
    code: '254',
  },
  {
    name: 'Korea',
    chinese: '韩国',
    code: '82',
  },
  {
    name: 'Kuwait',
    chinese: '科威特',
    code: '965',
  },
  {
    name: 'Kyrgyzstan',
    chinese: '吉尔吉斯坦',
    code: '331',
  },
  {
    name: 'Laos',
    chinese: '老挝',
    code: '856',
  },
  {
    name: 'Latvia',
    chinese: '拉脱维亚',
    code: '371',
  },
  {
    name: 'Lebanon',
    chinese: '黎巴嫩',
    code: '961',
  },
  {
    name: 'Lesotho',
    chinese: '莱索托',
    code: '266',
  },
  {
    name: 'Liberia',
    chinese: '利比里亚',
    code: '231',
  },
  {
    name: 'Libya',
    chinese: '利比亚',
    code: '218',
  },
  {
    name: 'Liechtenstein',
    chinese: '列支敦士登',
    code: '423',
  },
  {
    name: 'Lithuania',
    chinese: '立陶宛',
    code: '370',
  },
  {
    name: 'Luxembourg',
    chinese: '卢森堡',
    code: '352',
  },
  {
    name: 'Macao',
    chinese: '澳门',
    code: '853',
  },
  {
    name: 'Madagascar',
    chinese: '马达加斯加',
    code: '261',
  },
  {
    name: 'Malawi',
    chinese: '马拉维',
    code: '265',
  },
  {
    name: 'Malaysia',
    chinese: '马来西亚',
    code: '60',
  },
  {
    name: 'Maldives',
    chinese: '马尔代夫',
    code: '960',
  },
  {
    name: 'Mali',
    chinese: '马里',
    code: '223',
  },
  {
    name: 'Malta',
    chinese: '马耳他',
    code: '356',
  },
  {
    name: 'Mariana Is',
    chinese: '马里亚那群岛',
    code: '1670',
  },
  {
    name: 'Martinique',
    chinese: '马提尼克',
    code: '596',
  },
  {
    name: 'Mauritius',
    chinese: '毛里求斯',
    code: '230',
  },
  {
    name: 'Mexico',
    chinese: '墨西哥',
    code: '52',
  },
  {
    name: 'Moldova',
    chinese: '摩尔多瓦',
    code: '373',
  },
  {
    name: 'Monaco',
    chinese: '摩纳哥',
    code: '377',
  },
  {
    name: 'Mongolia',
    chinese: '蒙古',
    code: '976',
  },
  {
    name: 'Montserrat Is',
    chinese: '蒙特塞拉特岛',
    code: '1664',
  },
  {
    name: 'Morocco',
    chinese: '摩洛哥',
    code: '212',
  },
  {
    name: 'Mozambique',
    chinese: '莫桑比克',
    code: '258',
  },
  {
    name: 'Namibia',
    chinese: '纳米比亚',
    code: '264',
  },
  {
    name: 'Nauru',
    chinese: '瑙鲁',
    code: '674',
  },
  {
    name: 'Nepal',
    chinese: '尼泊尔',
    code: '977',
  },
  {
    name: 'Netheriands Antilles',
    chinese: '荷属安的列斯',
    code: '599',
  },
  {
    name: 'Netherlands',
    chinese: '荷兰',
    code: '31',
  },
  {
    name: 'New Zealand',
    chinese: '新西兰',
    code: '64',
  },
  {
    name: 'Nicaragua',
    chinese: '尼加拉瓜',
    code: '505',
  },
  {
    name: 'Niger',
    chinese: '尼日尔',
    code: '227',
  },
  {
    name: 'Nigeria',
    chinese: '尼日利亚',
    code: '234',
  },
  {
    name: 'North Korea',
    chinese: '朝鲜',
    code: '850',
  },
  {
    name: 'Norway',
    chinese: '挪威',
    code: '47',
  },
  {
    name: 'Oman',
    chinese: '阿曼',
    code: '968',
  },
  {
    name: 'Pakistan',
    chinese: '巴基斯坦',
    code: '92',
  },
  {
    name: 'Panama',
    chinese: '巴拿马',
    code: '507',
  },
  {
    name: 'Papua New Cuinea',
    chinese: '巴布亚新几内亚',
    code: '675',
  },
  {
    name: 'Paraguay',
    chinese: '巴拉圭',
    code: '595',
  },
  {
    name: 'Peru',
    chinese: '秘鲁',
    code: '51',
  },
  {
    name: 'Philippines',
    chinese: '菲律宾',
    code: '63',
  },
  {
    name: 'Poland',
    chinese: '波兰',
    code: '48',
  },
  {
    name: 'Portugal',
    chinese: '葡萄牙',
    code: '351',
  },
  {
    name: 'Puerto Rico',
    chinese: '波多黎各',
    code: '1787',
  },
  {
    name: 'Qatar',
    chinese: '卡塔尔',
    code: '974',
  },
  {
    name: 'Reunion',
    chinese: '留尼旺',
    code: '262',
  },
  {
    name: 'Romania',
    chinese: '罗马尼亚',
    code: '40',
  },
  {
    name: 'Russia',
    chinese: '俄罗斯',
    code: '7',
  },
  {
    name: 'Saint Lueia',
    chinese: '圣卢西亚',
    code: '1758',
  },
  {
    name: 'Saint Vincent',
    chinese: '圣文森特岛',
    code: '1784',
  },
  {
    name: 'Samoa Eastern',
    chinese: '东萨摩亚(美)',
    code: '684',
  },
  {
    name: 'Samoa Western',
    chinese: '西萨摩亚',
    code: '685',
  },
  {
    name: 'San Marino',
    chinese: '圣马力诺',
    code: '378',
  },
  {
    name: 'Sao Tome and Principe',
    chinese: '圣多美和普林西比',
    code: '239',
  },
  {
    name: 'Saudi Arabia',
    chinese: '沙特阿拉伯',
    code: '966',
  },
  {
    name: 'Senegal',
    chinese: '塞内加尔',
    code: '221',
  },
  {
    name: 'Seychelles',
    chinese: '塞舌尔',
    code: '248',
  },
  {
    name: 'Sierra Leone',
    chinese: '塞拉利昂',
    code: '232',
  },
  {
    name: 'Singapore',
    chinese: '新加坡',
    code: '65',
  },
  {
    name: 'Slovakia',
    chinese: '斯洛伐克',
    code: '421',
  },
  {
    name: 'Slovenia',
    chinese: '斯洛文尼亚',
    code: '386',
  },
  {
    name: 'Solomon Is',
    chinese: '所罗门群岛',
    code: '677',
  },
  {
    name: 'Somali',
    chinese: '索马里',
    code: '252',
  },
  {
    name: 'South Africa',
    chinese: '南非',
    code: '27',
  },
  {
    name: 'Spain',
    chinese: '西班牙',
    code: '34',
  },
  {
    name: 'SriLanka',
    chinese: '斯里兰卡',
    code: '94',
  },
  {
    name: 'St.Lucia',
    chinese: '圣卢西亚',
    code: '1758',
  },
  {
    name: 'St.Vincent',
    chinese: '圣文森特',
    code: '1784',
  },
  {
    name: 'Sudan',
    chinese: '苏丹',
    code: '249',
  },
  {
    name: 'Suriname',
    chinese: '苏里南',
    code: '597',
  },
  {
    name: 'Swaziland',
    chinese: '斯威士兰',
    code: '268',
  },
  {
    name: 'Sweden',
    chinese: '瑞典',
    code: '46',
  },
  {
    name: 'Switzerland',
    chinese: '瑞士',
    code: '41',
  },
  {
    name: 'Syria',
    chinese: '叙利亚',
    code: '963',
  },
  {
    name: 'Tajikstan',
    chinese: '塔吉克斯坦',
    code: '992',
  },
  {
    name: 'Tanzania',
    chinese: '坦桑尼亚',
    code: '255',
  },
  {
    name: 'Thailand',
    chinese: '泰国',
    code: '66',
  },
  {
    name: 'Togo',
    chinese: '多哥',
    code: '228',
  },
  {
    name: 'Tonga',
    chinese: '汤加',
    code: '676',
  },
  {
    name: 'Trinidad and Tobago',
    chinese: '特立尼达和多巴哥',
    code: '1809',
  },
  {
    name: 'Tunisia',
    chinese: '突尼斯',
    code: '216',
  },
  {
    name: 'Turkey',
    chinese: '土耳其',
    code: '90',
  },
  {
    name: 'Turkmenistan',
    chinese: '土库曼斯坦',
    code: '993',
  },
  {
    name: 'Uganda',
    chinese: '乌干达',
    code: '256',
  },
  {
    name: 'Ukraine',
    chinese: '乌克兰',
    code: '380',
  },
  {
    name: 'United Arab Emirates',
    chinese: '阿拉伯联合酋长国',
    code: '971',
  },
  {
    name: 'United Kiongdom',
    chinese: '英国',
    code: '44',
  },
  {
    name: 'United States of America',
    chinese: '美国',
    code: '1',
  },
  {
    name: 'Uruguay',
    chinese: '乌拉圭',
    code: '598',
  },
  {
    name: 'Uzbekistan',
    chinese: '乌兹别克斯坦',
    code: '233',
  },
  {
    name: 'Venezuela',
    chinese: '委内瑞拉',
    code: '58',
  },
  {
    name: 'Vietnam',
    chinese: '越南',
    code: '84',
  },
  {
    name: 'Yemen',
    chinese: '也门',
    code: '967',
  },
  {
    name: 'Yugoslavia',
    chinese: '南斯拉夫',
    code: '381',
  },
  {
    name: 'Zimbabwe',
    chinese: '津巴布韦',
    code: '263',
  },
  {
    name: 'Zaire',
    chinese: '扎伊尔',
    code: '243',
  },
  {
    name: 'Zambia',
    chinese: '赞比亚',
    code: '260',
  },
];

interface IProps extends SelectProps<any> {
  language: 'zh-CN' | 'EN';
}

export default (props: IProps) => {
  return (
    <Select
      showSearch
      placeholder="请选择国家"
      allowClear
      filterOption={(inputValue, option) => option.children.toLowerCase().indexOf(inputValue.toLowerCase()) > -1}
      {...props}
    >
      {map(countries, (country) => {
        return (
          <Select.Option key={country.code} value={props.language === 'EN' ? country.name : country.chinese}>
            {props.language === 'EN' ? country.name : country.chinese}
          </Select.Option>
        );
      })}
    </Select>
  );
};
