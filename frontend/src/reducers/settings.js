/**
 * Created by hai on 8/17/17.
 */

const initialState = {
  displayFields: [
    {field: 'id', show: true, displayName: 'ID', width: 60},
    {field: 'name', show: true, displayName: '姓名', width: 100},
    {field: 'account', show: true, displayName: '账号', width: 130},
    {field: 'gender', show: true, displayName: '性别', width: 60},
    {field: 'badgeNo', show: true, displayName: '工作证编号', width: 100},
    {field: 'idNo', show: true, displayName: '身份证号', width: 180},
    {field: 'education', show: true, displayName: '文化程度', width: 100},
    {field: 'jobTitle', show: true, displayName: '职称', width: 100},
    {field: 'occupation', show: true, displayName: '职务', width: 100},
    {field: 'workUnit', show: true, displayName: '工作单位', width: 250},
    {field: 'zipCode', show: true, displayName: '邮编', width: 100},
    {field: 'workAddress', show: true, displayName: '地址', width: 300},
    {field: 'workPhone', show: true, displayName: '办公电话', width: 150},
    {field: 'homePhone', show: true, displayName: '家庭电话', width: 100},
    {field: 'cellPhone', show: true, displayName: '手机', width: 150},
    {field: 'telMobile', show: true, displayName: 'TelMobile', width: 150},
    {field: 'email', show: true, displayName: '邮箱', width: 200},
    {field: 'dialect', show: true, displayName: '方言', width: 80},
    {field: 'cnTestDate', show: true, displayName: 'CNTestDate', width: 120},
    {field: 'cnScore', show: true, displayName: 'CNScore', width: 100},
    {field: 'level', show: true, displayName: '测试员等级', width: 100},
    {field: 'grade', show: true, displayName: '类别', width: 100},
    {field: 'bankName', show: true, displayName: '银行', width: 150},
    {field: 'bankAccount', show: true, displayName: '账户', width: 200},
    {field: 'dob', show: true, displayName: '生日', width: 150},
    {field: 'age', show: true, displayName: '年龄', width: 100},
    {field: 'trainingYear', show: true, displayName: '培训年', width: 100},
    {field: 'testCount', show: true, displayName: '测试量', width: 100},
    {field: 'status', show: true, displayName: '状态', width: 100},
    {field: 'score', show: true, displayName: '成绩', width: 100},
    {field: 'backboneClass', show: true, displayName: '骨干班次', width: 200},
    {field: 'testCenter', show: true, displayName: '测试分中心', width: 200},
    {field: 'termNo', show: true, displayName: '期数', width: 100},
    {field: 'note1', show: true, displayName: '备注1', width: 200},
    {field: 'note2', show: true, displayName: '备注2', width: 200},
    {field: 'note3', show: true, displayName: '备注3', width: 200},
  ]
};

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case 'CHECK_DISPLAY_FIELD': {
      const newDisplayField = Object.assign([], state.displayFields);
      for (const value of newDisplayField) {
        if (value.field === payload.checkboxName) {
          value.show = payload.checked;
        }
      }
      return {
        ...state,
        displayFields: newDisplayField
      };
    }
    case 'SELECT_ALL_FIELDS': {
      const newDisplayField = Array.from(state.displayFields);
      for (const value of newDisplayField) {
        value.show = true;
      }
      return {
        ...state,
        displayFields: newDisplayField
      };
    }
    case 'DESELECT_ALL_FIELDS': {
      const newDisplayField = Array.from(state.displayFields);
      for (const value of newDisplayField) {
        if (value.field !== 'id') {
          value.show = false;
        }
      }
      return {
        ...state,
        displayFields: newDisplayField
      };
    }

    default:
      return state;
  }
}
