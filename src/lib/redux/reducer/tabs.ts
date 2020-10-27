import { REDUX_CONFIG } from '@/lib/config/constants';
import { get, map, keyBy, compact, last, set } from 'lodash';
import { TabIProps } from '@/components/layout/components/tab-button';

const initState = {
  activeKey: '/',
  tabs: [
    {
      title: 'menu.dashboard',
      key: '/',
      path: '/',
      search: '',
      lastSearch: '',
      closable: false,
    },
  ],
  tabsMapping: {
    '/': {
      title: 'menu.dashboard',
      key: '/',
      path: '/',
      search: '',
      lastSearch: '',
      closable: false,
    },
  },
};

export default (state = initState, action: any) => {
  let newTabs = get(state, 'tabs') as any[];
  let newTabsMapping = get(state, 'tabsMapping') as any;
  let tab: TabIProps;
  // add tab
  switch (action.type) {
    case REDUX_CONFIG.ADD_TAB:
      set(newTabs, '0.title', window.t('menu.dashboard'));
      tab = get(action, 'payload.data') as TabIProps;
      if (get(newTabsMapping, tab.key)) {
        newTabs = map(newTabs, (item: TabIProps) => {
          if (item.key === tab.key) {
            return {
              ...tab,
            };
          }
          return item;
        });
        newTabsMapping = keyBy(newTabs, 'key') as any;
      } else {
        newTabs.push(tab);
        newTabsMapping = keyBy(newTabs, 'key') as any;
      }
      return {
        ...state,
        activeKey: tab.key,
        tabs: newTabs,
        tabsMapping: newTabsMapping,
      };
    // delete tab
    case REDUX_CONFIG.DELETE_TAB:
      const key = get(action, 'payload.data.key');
      newTabs = compact(
        map(state.tabs, (item: TabIProps) => {
          if (item.key !== key) {
            return item;
          }
          return null;
        }),
      );
      newTabsMapping = keyBy(newTabs, 'key') as any;
      return {
        ...state,
        activeKey: get(last(newTabs), 'key'),
        tabs: newTabs,
        tabsMapping: newTabsMapping,
      };
    // close all tab
    case REDUX_CONFIG.DELETE_ALL_TAB:
      return {
        activeKey: '/',
        tabs: [
          {
            title: 'menu.dashboard',
            key: '/',
            path: '/',
            search: '',
            lastSearch: '',
            closable: false,
          },
        ],
        tabsMapping: {
          '/': {
            title: 'menu.dashboard',
            key: '/',
            path: '/',
            search: '',
            lastSearch: '',
            closable: false,
          },
        },
      };
    default:
      return state;
  }
};
