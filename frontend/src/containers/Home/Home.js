import React from 'react';
import {injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import { Button, ButtonGroup, Collapse} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import 'react-bootstrap-multiselect/css/bootstrap-multiselect.css';
import Multiselect from 'react-bootstrap-multiselect';
import {loadTesters, editCell, sortChange, uploadExcel} from '../../actions/home';
import {checkDisplayField, selectAllFields, deselectAllFields} from '../../actions/settings';
import './Home.css';


const stateToProps = (state, ownProps) => ({
  testers: state.home.testers,
  sortName: state.home.sortName,
  sortOrder: state.home.sortOrder,
  displayFields: state.settings.displayFields,
});

const actionToProps = {
  onLoad: loadTesters,
  onCellEdit: editCell,
  onSortChange: sortChange,
  onDisplayFieldCheck: checkDisplayField,
  onUpload: uploadExcel,
  onSelectAllField: selectAllFields,
  onDeselectAllField: deselectAllFields,
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
    onSelectAllField: Function,
    onDeselectAllField: Function
  }

  constructor(props) {
    super(props);
    this.getTableWidth = this.getTableWidth.bind(this);
    this.getDownloadUrl = this.getDownloadUrl.bind(this);
    this.createCustomButtonGroup = this.createCustomButtonGroup.bind(this);
    this.onClickUpload = this.onClickUpload.bind(this);
    this.state = {};
  }

  componentDidMount() {
    this.props.onLoad && this.props.onLoad();
  }

  onClickUpload(e) {
    if (this.excelInput.files && this.excelInput.files.length > 0) {
      this.props.onUpload(this.excelInput.files[0]);
    }
    this.excelInput.value = null;
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
      <Button bsStyle="success" onClick={(e) => this.setState({open: !this.state.open })}>更多</Button>
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
    const multiSelectData = [];
    for (const row of this.props.displayFields) {
      if (row.show) {
        cols.push(
          <TableHeaderColumn key={row.field} width={`${row.width}px`} isKey={row.field === 'id'} dataField={row.field} dataSort>{row.displayName}</TableHeaderColumn>
        );
      }
      if (row.field !== 'id') {
        multiSelectData.push({value: row.field, selected: row.show, label: row.displayName});
      }
    }

    return (
      <div style={{marginTop: '15px'}}>
        <Collapse in={this.state.open}>
          <div className="row">
            <div className="col-md-4">
              <Multiselect
                data={multiSelectData}
                multiple
                maxHeight={200}
                buttonText={(_options, _select) => '选择列'}
                onChange={(option, checked) => {
                  this.props.onDisplayFieldCheck(option.val(), checked);
                }}
                includeSelectAllOption
                onSelectAll={() => {
                  this.props.onSelectAllField();
                }}
                onDeselectAll={() => {
                  this.props.onDeselectAllField();
                }}
              />
            </div>
            <div className="col-md-4">
              <input id="excel-file" type="file" ref={(input) => { this.excelInput = input; }} />
              <button id="upload-excel" type="button" className="btn btn-primary" onClick={this.onClickUpload}>Upload</button>
            </div>
          </div>
        </Collapse>
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
