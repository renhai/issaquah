import React from 'react';
// import Helmet from 'react-helmet';
import {injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {loadTesters} from '../../actions/home';

// import className from 'classnames/bind';

// const cx = className.bind(require('./Home.css'));

const stateToProps = (state, ownProps) => ({
  testers: state.home.testers
});

const actionToProps = {
  onLoad: loadTesters
};

@injectIntl
@connect(stateToProps, actionToProps)
export default class Home extends React.Component {
  props: {
    testers: Array,
    onLoad: Function
  }

  componentDidMount() {
    NotificationManager.error('Warning message', 'Close after 3000ms', 3000);
    this.props.onLoad && this.props.onLoad();
  }

  render() {
    const rows = [];
    for (let i = 0; i < this.props.testers.length; i++) {
      const tester = this.props.testers[i];
      rows.push(
        <tr key={`tester-row-${i}`}>
          <td>{i + 1}</td>
          <td>{tester.name}</td>
          <td>{tester.account}</td>
          <td>{tester.gender}</td>
          <td>{tester.id}</td>
          <td>{tester.idNo}</td>
          <td>{tester.education}</td>
          <td>{tester.jobTitle}</td>
          <td>{tester.occupation}</td>
          <td>{tester.workUnit}</td>
          <td>{tester.zipCode}</td>
          <td>{tester.workAddress}</td>
          <td>{tester.workPhone}</td>
          <td>{tester.homePhone}</td>
          <td>{tester.cellPhone}</td>
          <td>{tester.telMobile}</td>
          <td>{tester.email}</td>
          <td>{tester.dialect}</td>
          <td>{tester.cnTestDate}</td>
          <td>{tester.cnScore}</td>
          <td>{tester.level}</td>
          <td>{tester.grade}</td>
          <td>{tester.bankName}</td>
          <td>{tester.bankAccount}</td>
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
                  <th>CNScore</th>
                  <th>测试员等级</th>
                  <th>类别</th>
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
        <NotificationContainer />
      </div>
    );
  }
}
