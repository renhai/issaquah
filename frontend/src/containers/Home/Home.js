import React from 'react';
import {injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Modal} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import 'react-bootstrap-multiselect/css/bootstrap-multiselect.css';
import Multiselect from 'react-bootstrap-multiselect';
import {loadTesters, editCell, sortChange, uploadExcel, deleteRows, addRow, downloadExcel, filterChange} from '../../actions/home';
import {checkDisplayField, selectAllFields, deselectAllFields} from '../../actions/settings';
import './Home.css';


const stateToProps = (state, ownProps) => ({
  testers: state.home.testers,
  sortName: state.home.sortName,
  sortOrder: state.home.sortOrder,
  displayFields: state.settings.displayFields,
  uploadResult: state.home.uploadResult,
});

const actionToProps = {
  onLoad: loadTesters,
  onCellEdit: editCell,
  onSortChange: sortChange,
  onDisplayFieldCheck: checkDisplayField,
  onUpload: uploadExcel,
  onSelectAllField: selectAllFields,
  onDeselectAllField: deselectAllFields,
  onDeleteRows: deleteRows,
  onAddRow: addRow,
  onClickDownload: downloadExcel,
  onFilterChange: filterChange,
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
    onDeselectAllField: Function,
    onDeleteRows: Function,
    onAddRow: Function,
    onClickDownload: Function,
    onFilterChange: Function,
    uploadResult: ?Object,
  }

  constructor(props) {
    super(props);
    this.getTableWidth = this.getTableWidth.bind(this);
    this.createCustomButtonGroup = this.createCustomButtonGroup.bind(this);
    this.onClickUpload = this.onClickUpload.bind(this);
    this.openUploadModal = this.openUploadModal.bind(this);
    this.closeUploadModal = this.closeUploadModal.bind(this);
    this.openSettingColsModal = this.openSettingColsModal.bind(this);
    this.closeSettingColsModal = this.closeSettingColsModal.bind(this);
    this.state = {
      showUploadModal: false,
      showSettingColsModal: false
    };
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

  openUploadModal() {
    this.setState({ showUploadModal: true });
  }

  closeUploadModal() {
    this.setState({ showUploadModal: false });
  }

  openSettingColsModal() {
    this.setState({ showSettingColsModal: true });
  }

  closeSettingColsModal() {
    this.setState({ showSettingColsModal: false });
  }

  createCustomButtonGroup = props =>
    <ButtonGroup>
      { props.insertBtn }
      { props.deleteBtn }
      <Button bsStyle="primary" onClick={(e) => { this.props.onClickDownload(this.table.store); }}>Download</Button>
      <Button bsStyle="success" onClick={this.openUploadModal}>Upload</Button>
      <Button onClick={this.openSettingColsModal}>Settings</Button>
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
      btnGroup: this.createCustomButtonGroup,
      onDeleteRow: this.props.onDeleteRows,
      onAddRow: this.props.onAddRow,
      onFilterChange: this.props.onFilterChange,
    };
    const remote = (remoteObj) => {
      remoteObj.cellEdit = true;
      remoteObj.sort = true;
      remoteObj.insertRow = true;
      remoteObj.dropRow = true;
      remoteObj.filter = true;
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
        let editable = !['id', 'age'].includes(row.field);
        switch (row.field) {
          case 'gender':
            editable = { type: 'select', options: { values: ['男', '女'] } };
            break;
          case 'level':
            editable = { type: 'select', options: { values: ['', '省级', '国家级'] } };
            break;
          case 'status':
            editable = { type: 'select', options: { values: ['', '空闲', '忙碌'] } };
            break;
          case 'grade':
            editable = { type: 'select', options: { values: ['', 'A类测试员', 'B类测试员', 'C类测试员', 'D类测试员', '专家测试员'] } };
            break;
          default:
            break;
        }
        let filter = null;
        if (['name', 'account', 'idNo', 'badgeNo', 'workUnit', 'email', 'testCenter'].includes(row.field)) {
          filter = { type: 'TextFilter', delay: 1000 };
        }

        cols.push(
          <TableHeaderColumn
            key={row.field}
            width={`${row.width}px`}
            isKey={row.field === 'id'}
            dataField={row.field}
            dataSort
            editable={editable}
            filter={filter}
          >
            {row.displayName}
          </TableHeaderColumn>
        );
      }
      if (row.field !== 'id') {
        multiSelectData.push({value: row.field, selected: row.show, label: row.displayName});
      }
    }

    return (
      <div style={{marginTop: '15px'}}>
        <div className="row">
          <div className="col-md-12" style={{overflowX: 'scroll'}}>
            <BootstrapTable
              ref={(table) => { this.table = table; }}
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
        <Modal show={this.state.showUploadModal} onHide={this.closeUploadModal}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Excel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input id="excel-file" type="file" ref={(input) => { this.excelInput = input; }} />
            {
              this.props.uploadResult &&
              <div>
                <hr />
                <div className="panel panel-default">
                  <div className="panel-heading">上传结果</div>
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-success"><span>成功</span><span className="badge">{this.props.uploadResult.successfulCount}</span></li>
                    <li className="list-group-item list-group-item-danger">
                      <span>失败</span><span className="badge">{this.props.uploadResult.failedCount}</span>
                    </li>
                  </ul>
                </div>
                {
                  this.props.uploadResult.failedLineNumbers && this.props.uploadResult.failedLineNumbers.length > 0 &&
                  <div className="panel panel-warning">
                    <div className="panel-heading">详细信息</div>
                    <div className="panel-body">
                      <p style={{wordWrap: 'break-word'}}>第 {'<'}{this.props.uploadResult.failedLineNumbers.join()}{'>'} 行上传失败，请检查内容并重试。</p>
                    </div>
                  </div>
                }
              </div>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeUploadModal}>Close</Button>
            <Button onClick={this.onClickUpload} bsStyle="primary">Upload</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showSettingColsModal} onHide={this.closeSettingColsModal}>
          <Modal.Header closeButton>
            <Modal.Title>Setting Columns</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeSettingColsModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
}
