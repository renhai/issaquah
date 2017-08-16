import React from 'react';
import {injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {Checkbox, Button, ButtonGroup} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import {loadTesters, editCell, sortChange, checkDisplayField, uploadExcel} from '../../actions/home';
import './Home.css';


const stateToProps = (state, ownProps) => ({
  testers: state.home.testers,
  sortName: state.home.sortName,
  sortOrder: state.home.sortOrder,
  displayFields: state.home.displayFields,
});

const actionToProps = {
  onLoad: loadTesters,
  onCellEdit: editCell,
  onSortChange: sortChange,
  onDisplayFieldCheck: checkDisplayField,
  onUpload: uploadExcel,
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
    displayFields: Array,
    onDisplayFieldCheck: Function,
    onUpload: Function,
  }

  constructor(props) {
    super(props);
    this.handleCheckboxOnChange = this.handleCheckboxOnChange.bind(this);
    this.getTableWidth = this.getTableWidth.bind(this);
    this.getDownloadUrl = this.getDownloadUrl.bind(this);
    this.createCustomButtonGroup = this.createCustomButtonGroup.bind(this);
    this.onClickUpload = this.onClickUpload.bind(this);
  }

  componentDidMount() {
    this.props.onLoad && this.props.onLoad();
  }

  onClickUpload(e) {
    console.log(this.excelInput.files[0]);
    if (this.excelInput.files && this.excelInput.files.length > 0) {
      this.props.onUpload(this.excelInput.files[0]);
    }
    this.excelInput.value = null;
  }

  handleCheckboxOnChange(event) {
    this.props.onDisplayFieldCheck(event.target.value, event.target.checked);
  }

  getTableWidth() {
    let width = 0;
    for (const obj of this.props.displayFields) {
      width += obj.show ? obj.width : 0;
    }
    return width + 37;
  }

  getDownloadUrl() {
    const params = [];
    for (const value of this.props.displayFields) {
      if (value.show) {
        params.push(value.field);
      }
    }
    const queryString = params.join();
    return `/api/download?fields=${queryString}`;
  }

  createCustomButtonGroup = props =>
    <ButtonGroup>
      { props.insertBtn }
      { props.deleteBtn }
      <Button bsClass="btn btn-primary" bsStyle="link" href={this.getDownloadUrl()}>Download</Button>
    </ButtonGroup>

  render() {
    const cellEditProp = {
      mode: 'dbclick',
      blurToSave: true,
      beforeSaveCell: (row, cellName, cellValue) => row[cellName] !== cellValue,
    };
    const options = {
      onCellEdit: this.props.onCellEdit,
      onSortChange: this.props.onSortChange,
      sortName: this.props.sortName,
      sortOrder: this.props.sortOrder,
      btnGroup: this.createCustomButtonGroup
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
    const tableWidth = this.getTableWidth();
    const cols = [];
    for (const row of this.props.displayFields) {
      if (row.show) {
        cols.push(
          <TableHeaderColumn key={row.field} width={`${row.width}px`} isKey={row.field === 'id'} dataField={row.field} dataSort>{row.displayName}</TableHeaderColumn>
        );
      }
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-1">
            <Checkbox value="name" defaultChecked onChange={this.handleCheckboxOnChange}>姓名</Checkbox>
            <Checkbox value="gender" defaultChecked onChange={this.handleCheckboxOnChange}>性别</Checkbox>
            <Checkbox value="account" defaultChecked onChange={this.handleCheckboxOnChange}>账号</Checkbox>
            <Checkbox value="idNo" defaultChecked onChange={this.handleCheckboxOnChange}>身份证</Checkbox>
          </div>
          <div className="col-md-1">
            <Checkbox value="education" defaultChecked onChange={this.handleCheckboxOnChange}>文化程度</Checkbox>
            <Checkbox value="jobTitle" defaultChecked onChange={this.handleCheckboxOnChange}>职称</Checkbox>
            <Checkbox value="occupation" defaultChecked onChange={this.handleCheckboxOnChange}>职务</Checkbox>
            <Checkbox value="workUnit" defaultChecked onChange={this.handleCheckboxOnChange}>工作单位</Checkbox>
          </div>
          <div className="col-md-1">
            <Checkbox value="zipCode" defaultChecked onChange={this.handleCheckboxOnChange}>邮编</Checkbox>
            <Checkbox value="workAddress" defaultChecked onChange={this.handleCheckboxOnChange}>地址</Checkbox>
            <Checkbox value="workPhone" defaultChecked onChange={this.handleCheckboxOnChange}>办公电话</Checkbox>
            <Checkbox value="homePhone" defaultChecked onChange={this.handleCheckboxOnChange}>家庭电话</Checkbox>
          </div>
          <div className="col-md-1">
            <Checkbox value="cellPhone" defaultChecked onChange={this.handleCheckboxOnChange}>手机</Checkbox>
            <Checkbox value="telMobile" defaultChecked onChange={this.handleCheckboxOnChange}>TelMobile</Checkbox>
            <Checkbox value="email" defaultChecked onChange={this.handleCheckboxOnChange}>邮箱</Checkbox>
            <Checkbox value="dialect" defaultChecked onChange={this.handleCheckboxOnChange}>Dialect</Checkbox>
          </div>
          <div className="col-md-1">
            <Checkbox value="cnTestDate" defaultChecked onChange={this.handleCheckboxOnChange}>CNTestDate</Checkbox>
            <Checkbox value="cnScore" defaultChecked onChange={this.handleCheckboxOnChange}>CNScore</Checkbox>
            <Checkbox value="level" defaultChecked onChange={this.handleCheckboxOnChange}>测试员等级</Checkbox>
            <Checkbox value="grade" defaultChecked onChange={this.handleCheckboxOnChange}>类别</Checkbox>
          </div>
          <div className="col-md-1">
            <Checkbox value="bankName" defaultChecked onChange={this.handleCheckboxOnChange}>银行</Checkbox>
            <Checkbox value="bankAccount" defaultChecked onChange={this.handleCheckboxOnChange}>账户</Checkbox>
          </div>
          <div className="col-md-6">
            <input id="excel-file" type="file" ref={(input) => { this.excelInput = input; }} />
            <button id="upload-excel" type="button" className="btn btn-primary" onClick={this.onClickUpload}>Upload</button>
          </div>

        </div>
        <div className="row">
          <div className="col-md-12" style={{overflowX: 'scroll'}}>
            <BootstrapTable
              options={options}
              containerStyle={{width: `${tableWidth}px`}}
              cellEdit={cellEditProp}
              data={this.props.testers}
              striped
              hover
              insertRow
              deleteRow
              remote={remote}
              selectRow={selectRow}
            >
              {cols}
            </BootstrapTable>
          </div>
        </div>
      </div>

    );
  }
}
