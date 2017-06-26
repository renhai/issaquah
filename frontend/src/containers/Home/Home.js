import React from 'react';
// import Helmet from 'react-helmet';
import {injectIntl} from 'react-intl';
import {Table} from 'react-bootstrap';
// import className from 'classnames/bind';

// const cx = className.bind(require('./Home.css'));

@injectIntl
export default class Home extends React.Component {

  render() {
    const rows = [];
    for (let i = 0; i < 50; i++) {
      rows.push(
        <tr>
          <td>1</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
      );
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-12" style={{overflowX: 'scroll'}}>
            <Table responsive striped hover style={{width: '2500px'}}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>姓名</th>
                  <th>账号</th>
                  <th>性别</th>
                  <th>工作证编号</th>
                  <th>证件号</th>
                  <th>文化程度</th>
                  <th>职称</th>
                  <th>职务</th>
                  <th>工作单位</th>
                  <th>邮编</th>
                  <th>地址</th>
                  <th>办公电话</th>
                  <th>家庭电话</th>
                  <th>手机</th>
                  <th>TelMobile</th>
                  <th>邮箱</th>
                  <th>Dialect</th>
                  <th>CNTestDate</th>
                  <th>测试员等级</th>
                  <th>类别</th>
                  <th>等级</th>
                  <th>银行</th>
                  <th>账户</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
