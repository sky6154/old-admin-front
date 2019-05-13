import React  from 'react';
import _      from "lodash";
import moment from "moment";

import {permissionCheck, Role} from "../../config/Role";
import CreateTable             from "../../components/CreateTable";

export default class AdminManage extends React.Component {
  constructor(props){
    super(props);

    let requiredRoles = [Role.ROLE_ADMIN];

    permissionCheck(requiredRoles, this.props.history);
  }

  insertCallback = (data) =>{
    console.log("INSERT", data);
  };

  updateCallback = (data) =>{
    console.log("UPDATE", data);
  };

  deleteCallback = (data) =>{
    console.log("DELETE", data);
  };


  render(){
    const {isAllAdminFetching, allAdminList} = this.props;

    const replaceValue = {
      "someType"  : {
        "1": "Value 1",
        "2": "Value 2",
        "3": "Value 3"
      },
      "someToggle": {
        disactive: "FALSE",
        active: "TRUE"
      }
    };

    const columns = [
      {
        Header : "운영자",
        columns: [
          {
            Header  : "운영자 ID",
            accessor: "user_id"
          }
        ]
      },
      {
        Header : "정보",
        columns: [
          {
            Header  : "이름",
            accessor: "name"
          },
          {
            Header  : "권한",
            id      : "role",
            accessor: data => (!_.isNil(replaceValue["role"][data.role])) ? replaceValue["role"][data.role] : data.role
          },
          {
            Header  : "마지막 로그인",
            id      : "last_login",
            accessor: data => (!_.isNil(data.last_login) && data.last_login !== '') ? moment(data.last_login).format("YYYY-MM-DD HH:mm:SS") : ''
          },
          {
            Header  : "등록일",
            id      : "reg_date",
            accessor: data => (!_.isNil(data.reg_date) && data.reg_date !== '') ? moment(data.reg_date).format("YYYY-MM-DD HH:mm:SS") : ''
          }
        ]
      }
    ];

    const defaultSorted = [
      {
        id  : "name",
        desc: false
      }
    ];

    const crudFormInfo = [
      {
        title       : "text Title",
        dbColumnName: "text_column",
        hintText    : "text Hint",
        type        : "text",
        isRequired  : true,
        usage       : [
          "insert",
          "update"
        ]
      },
      {
        title       : "datePicker Title",
        dbColumnName: "date_column",
        hintText    : "datePicker Hint",
        type        : "datePicker",
        isRequired  : true,
        usage       : [
          "insert",
          "update"
        ]
      },
      {
        title       : "dropDown Title",
        dbColumnName: "some_column",
        hintText    : "dropDown Hint",
        type        : "dropDown",
        value       : replaceValue["someType"],
        replaceValue: replaceValue["someType"],
        usage       : [
          "insert",
          "update"
        ]
      },
      {
        title       : "toggle Title",
        dbColumnName: "boolean_column",
        hintText    : "toggle Hint",
        type        : "toggle",
        value       : replaceValue["someToggle"],
        defaultValue: replaceValue["someToggle"],
        usage       : [
          "insert",
          "update"
        ]
      },
      // {
      //   title       : "upload Title",
      //   dbColumnName: "file_column",
      //   hintText    : "upload Hint",
      //   type        : "upload",
      //   usage       : [
      //     "insert",
      //     "update"
      //   ]
      // },
      {
        title       : "searchDropDown",
        dbColumnName: "role",
        hintText    : "searchDropDown Hint",
        type        : "searchDropDown",
        value       : replaceValue["someType"],
        replaceValue: replaceValue["someType"],
        isRequired  : true,
        usage       : [
          "insert",
          "update"
        ]
      }
    ];

    const insertFormTitle = "뭔가 추가 Title";
    const updateFormTitle = "뭔가 수정 Title";

    let isFetching = (isAllAdminFetching);

    return (
      <CreateTable isFetching={isFetching} tableData={allAdminList} columns={columns} defaultSorted={defaultSorted}
                   crudFormInfo={crudFormInfo} isCheckable={true} isAddable={true} isEditable={true} isRemovable={true}
                   insertFormTitle={insertFormTitle} updateFormTitle={updateFormTitle}
                   insertCallback={this.insertCallback}
                   updateCallback={this.updateCallback} deleteCallback={this.deleteCallback} />);
  }
}