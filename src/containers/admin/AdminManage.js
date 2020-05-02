import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import _ from "lodash";
import moment from "moment";

import {permissionCheck, Role} from "../../config/Role";
import CreateTable from "../../components/CreateTable";

import {getAllAdminTrigger} from "../../redux/actions/account";


class AdminManage extends React.Component {
    constructor(props) {
        super(props);

        let requiredRoles = [Role.ROLE_ADMIN];

        permissionCheck(requiredRoles, this.props.history);
    }

    componentWillMount() {
        this.props.getAllAdminTrigger();
    }

    insertCallback = (data) => {
        console.log("INSERT", data);
    };

    updateCallback = (data) => {
        console.log("UPDATE", data);
    };

    deleteCallback = (data) => {
        console.log("DELETE", data);
    };


    render() {
        const {isAllAdminFetching, adminList} = this.props;

        const replaceValue = {
            "someType": {
                "1": "Value 1",
                "2": "Value 2",
                "3": "Value 3"
            }
        };

        const columns = [
            {
                Header: "운영자 목록",
                columns: [
                    {
                        Header: "seq",
                        accessor: "seq"
                    },
                    {
                        Header: "운영자 ID",
                        accessor: "id"
                    },
                    {
                        Header: "이름",
                        accessor: "name"
                    },
                    {
                        Header: "이메일",
                        accessor: "email"
                    },
                    {
                        Header: "설명",
                        id: "description",
                        accessor: data => data.description
                    },
                    {
                        Header: "권한",
                        id: "role",
                        accessor: data => data.role.role
                    },
                    {
                        Header: "권한 설명",
                        id: "roleDescription",
                        accessor: data => data.role.description
                    },
                    {
                        Header: "활성 유무",
                        id: "active",
                        accessor: data => data.active.toString()
                    },
                    {
                        Header: "수정일",
                        id: "modifyDate",
                        accessor: data => (!_.isNil(data.modifyDate) && data.modifyDate !== '') ? moment(data.modifyDate).format("YYYY-MM-DD HH:mm:SS") : ''
                    },
                    {
                        Header: "등록일",
                        id: "regDate",
                        accessor: data => (!_.isNil(data.regDate) && data.regDate !== '') ? moment(data.regDate).format("YYYY-MM-DD HH:mm:SS") : ''
                    }
                ]
            }
        ];

        const defaultSorted = [
            {
                id: "name",
                desc: false
            }
        ];

        const crudFormInfo = [
            {
                title: "text Title",
                dbColumnName: "text_column",
                hintText: "text Hint",
                type: "text",
                isRequired: true,
                usage: [
                    "insert",
                    "update"
                ]
            },
            {
                title: "datePicker Title",
                dbColumnName: "date_column",
                hintText: "datePicker Hint",
                type: "datePicker",
                isRequired: true,
                usage: [
                    "insert",
                    "update"
                ]
            },
            {
                title: "dropDown Title",
                dbColumnName: "some_column",
                hintText: "dropDown Hint",
                type: "dropDown",
                value: replaceValue["someType"],
                replaceValue: replaceValue["someType"],
                usage: [
                    "insert",
                    "update"
                ]
            },
            {
                title: "toggle Title",
                dbColumnName: "boolean_column",
                hintText: "toggle Hint",
                type: "toggle",
                value: replaceValue["someToggle"],
                defaultValue: replaceValue["someToggle"],
                usage: [
                    "insert",
                    "update"
                ]
            },
            {
                title: "upload Title",
                dbColumnName: "file_column",
                hintText: "upload Hint",
                type: "upload",
                usage: [
                    "insert",
                    "update"
                ]
            },
            {
                title: "searchDropDown",
                dbColumnName: "role",
                hintText: "searchDropDown Hint",
                type: "searchDropDown",
                value: replaceValue["someType"],
                replaceValue: replaceValue["someType"],
                isRequired: true,
                usage: [
                    "insert",
                    "update"
                ]
            }
        ];

        const insertFormTitle = "뭔가 추가 Title";
        const updateFormTitle = "뭔가 수정 Title";

        let isFetching = (isAllAdminFetching);

        return (
            <CreateTable isFetching={isFetching} tableData={adminList} columns={columns} defaultSorted={defaultSorted}
                         crudFormInfo={crudFormInfo} isCheckable={true} isAddable={true} isEditable={true}
                         isRemovable={true}
                         insertFormTitle={insertFormTitle} updateFormTitle={updateFormTitle}
                         insertCallback={this.insertCallback}
                         updateCallback={this.updateCallback} deleteCallback={this.deleteCallback}/>);
    }
}

function mapStateToProps(state) {
    return {
        adminList: state.account.adminList,
        isAllAdminFetching: state.account.isAllAdminFetching
    };
}

export default withRouter(connect(mapStateToProps, {
    getAllAdminTrigger
})(AdminManage));