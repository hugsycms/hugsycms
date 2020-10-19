import { Card, Col, List, Row } from 'antd';
import React, { Component } from 'react';
import AreaChart from './components/area-chart';
import ColumnChart from './components/column-chart';
import BarChart from './components/bar-chart';
import LineChart from './components/line-chart';
import TinyAreaChart from './components/tiny-area-chart';
import PieChart from './components/pie-chart';
import ActionInfo from './components/action-info';
import './index.less';

export default class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <Row className="welcome-row">
          <Col className="welcome-row-col" span={6}>
            <AreaChart />
          </Col>
          <Col span={6}>
            <ColumnChart />
          </Col>
          <Col span={6}>
            <BarChart />
          </Col>
          <Col span={6}>
            <LineChart />
          </Col>
        </Row>

        <Row className="welcome-row">
          <Col span={12}>
            <PieChart />
          </Col>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <TinyAreaChart />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ActionInfo {...this.props} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
