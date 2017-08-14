import React from 'react';
import {injectIntl} from 'react-intl';
import {connect} from 'react-redux';
// import {Table} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import {loadTesters, editCell, sortChange} from '../../actions/home';
import './Home.css';


const stateToProps = (state, ownProps) => ({
  testers: state.home.testers,
  sortName: state.home.sortName,
  sortOrder: state.home.sortOrder,
});

const actionToProps = {
  onLoad: loadTesters,
  onCellEdit: editCell,
  onSortChange: sortChange,
};

@injectIntl
@connect(stateToProps, actionToProps)
export default class Home extends React.Component {
  props: {
    testers: Array,
    onLoad: Function,
    onCellEdit: Function,
    onSortChange: Function,
    sortName: ?string,
    sortOrder: ?string,
  }

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.onLoad && this.props.onLoad();
  }

  render() {
    const cellEditProp = {
      mode: 'dbclick',
      blurToSave: true,
      beforeSaveCell: (row, cellName, cellValue) => row[cellName] !== cellValue,
      // afterSaveCell: this.afterSaveCell
    };
    const options = {
      onCellEdit: this.props.onCellEdit,
      onSortChange: this.props.onSortChange,
      sortName: this.props.sortName,
      sortOrder: this.props.sortOrder,
    };
    const remote = (remoteObj) => {
      remoteObj.cellEdit = true;
      remoteObj.sort = true;
      // remoteObj.insertRow = true;
      // remoteObj.dropRow = true;
      return remoteObj;
    };
    const selectRow = {
      mode: 'checkbox' // radio or checkbox
    };
    return (
      <div>
        <div className="row">
          <div className="col-md-12" style={{overflowX: 'scroll'}}>
            <BootstrapTable
              options={options}
              containerStyle={{width: '200%'}}
              cellEdit={cellEditProp}
              data={this.props.testers}
              striped
              hover
              insertRow
              deleteRow
              remote={remote}
              selectRow={selectRow}
            >
              <TableHeaderColumn dataField="name" dataAlign="center" dataSort>姓名</TableHeaderColumn>
              <TableHeaderColumn dataField="account" dataSort>账号</TableHeaderColumn>
              <TableHeaderColumn dataField="gender" dataSort>性别</TableHeaderColumn>
              <TableHeaderColumn dataField="id" isKey dataSort>工作证编号</TableHeaderColumn>
              <TableHeaderColumn dataField="idNo" dataSort>证件号</TableHeaderColumn>
              <TableHeaderColumn dataField="education" dataSort>文化程度</TableHeaderColumn>
              <TableHeaderColumn dataField="jobTitle" dataSort>职称</TableHeaderColumn>
              <TableHeaderColumn dataField="occupation" dataSort>职务</TableHeaderColumn>
              <TableHeaderColumn dataField="workUnit" dataSort>工作单位</TableHeaderColumn>
              <TableHeaderColumn dataField="zipCode" dataSort>邮编</TableHeaderColumn>
              <TableHeaderColumn dataField="workAddress" dataSort>地址</TableHeaderColumn>
              <TableHeaderColumn dataField="workPhone" dataSort>办公电话</TableHeaderColumn>
              <TableHeaderColumn dataField="homePhone" dataSort>家庭电话</TableHeaderColumn>
              <TableHeaderColumn dataField="cellPhone" dataSort>手机</TableHeaderColumn>
              <TableHeaderColumn dataField="telMobile" dataSort>TelMobile</TableHeaderColumn>
              <TableHeaderColumn dataField="email" dataSort>邮箱</TableHeaderColumn>
              <TableHeaderColumn dataField="dialect" dataSort>Dialect</TableHeaderColumn>
              <TableHeaderColumn dataField="cnTestDate" dataSort>CNTestDate</TableHeaderColumn>
              <TableHeaderColumn dataField="cnScore" dataSort>CNScore</TableHeaderColumn>
              <TableHeaderColumn dataField="level" dataSort>测试员等级</TableHeaderColumn>
              <TableHeaderColumn dataField="grade" dataSort>类别</TableHeaderColumn>
              <TableHeaderColumn dataField="bankName" dataSort>银行</TableHeaderColumn>
              <TableHeaderColumn dataField="bankAccount" dataSort>账户</TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
      </div>

    );
  }
}
