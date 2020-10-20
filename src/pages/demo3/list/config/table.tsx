import { formatTimeToStandard } from '@/utils/format';
import { IDCardMappingByValue, genderMappingByValue } from '@/components/selects/NormalSelect';
import { get } from 'lodash';
import { APP_CONFIG } from '@/lib/config/constants';

export const tableColumns = [
  {
    title: '住院号',
    dataIndex: 'inpatientNO',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '病区号',
    dataIndex: 'areaNO',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '房号',
    dataIndex: 'roomNO',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '床号',
    dataIndex: 'bedNO',
    key: 'bedNO',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '孕妇姓名',
    dataIndex: 'name',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '孕妇年龄',
    dataIndex: 'age',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  // {
  //   title: '性别',
  //   dataIndex: 'gender',
  //   align: 'center',
  //   width: APP_CONFIG.CELL_WIDTH_SMALL,
  //   render: (value: string) => get(genderMappingByValue, `${value}.title`),
  // },
  {
    title: '出生日期',
    dataIndex: 'dob',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '孕产期',
    dataIndex: 'edd',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  // {
  //   title: '证件类型',
  //   dataIndex: 'idType',
  //   key: 'idType',
  //   align: 'center',
  //   render: (value: string) => get(IDCardMappingByValue, `${value}.title`),
  //   width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  // },
  // {
  //   title: '证件号码',
  //   dataIndex: 'idNO',
  //   key: 'idNO',
  //   align: 'center',
  //   width: APP_CONFIG.CELL_WIDTH_LARGE,
  // },
  {
    title: '住院日期',
    dataIndex: 'adminDate',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    render: (value: string) => formatTimeToStandard(value),
  },
];
