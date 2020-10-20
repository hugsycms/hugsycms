import React from 'react';
import { connect } from 'react-redux';
import store from 'store';
import { doLogout } from '@/components/layout/reducer';
import { APP_CONFIG } from '../config/constants';
import { withRouter } from 'react-router-dom';
import CustomSpin from '@/components/GeneralComponents/CustomSpin';
import { initUser } from '../redux/action/user';
import { isEqual, get, isEmpty } from 'lodash';

export default (App: any) => {
  class WrapperApp extends React.Component {
    state = {
      loading: true,
      user: { permissions: [], permissionsMapping: {}, basicInfo: {} },
    };

    async componentDidMount() {
      const token = store.get(APP_CONFIG.TOKEN);
      const username = store.get(APP_CONFIG.AUTH_NAME);
      const loginTime = store.get(APP_CONFIG.LOGIN_TIME);
      const expired = store.get(APP_CONFIG.EXPIRED);
      if (!token || !username || expired * 1000 + loginTime * 1000 < new Date().getTime()) {
        doLogout();
        window.location.href = '/login';
        return;
      }
      const { initUser } = this.props;
      const user = await initUser(username);
      this.setState({
        loading: false,
        user,
      });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      const { user } = nextProps;
      if (!isEmpty(get(user, 'basicInfo')) && !isEqual(get(user, 'basicInfo'), prevState.user.basicInfo)) {
        return {
          loading: false,
          user,
        };
      }
      return null;
    }

    render() {
      const { loading } = this.state;

      return loading ? <CustomSpin /> : <App {...this.props} />;
    }
  }

  return connect(({ user }) => ({ user }), { initUser })(withRouter(WrapperApp));
};
