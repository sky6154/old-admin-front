import React from "react";

import _ from "lodash";

import DataTable from "../components/DataTable";
import DialogForm from "../components/DialogForm";

class CreateTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            insertFormIsOpen: false,
            updateFormIsOpen: false,
            selectedData: []
        };
    }

    insertClick = () => {
        this.setState({
            insertFormIsOpen: true,
            updateFormIsOpen: false
        });
    };

    updateClick = (data) => {
        this.setState({
            updateFormIsOpen: true,
            insertFormIsOpen: false,
            selectedData: data
        });
    };

    deleteClick = (data) => {
        let copy = JSON.parse(JSON.stringify(data));

        let temp = _.map(copy, (item, index) => {
            // 정렬 용도로 사용하던 table 변수 제거
            if (!_.isNil(item['__seq']))
                delete item['__seq'];

            return item;
        });

        if (!_.isNil(this.props.deleteCallback) && _.isFunction(this.props.deleteCallback))
            this.props.deleteCallback(temp, this.props.deleteArgs);
    };

    getInsertFormData = (data) => {
        if (!_.isNil(this.props.insertCallback) && _.isFunction(this.props.insertCallback))
            this.props.insertCallback(data, this.props.insertArgs);

        this.setState({
            insertFormIsOpen: false,
            updateFormIsOpen: false,
            selectedData: []
        });
    };

    getUpdateFormData = (data) => {
        if (!_.isNil(this.props.updateCallback) && _.isFunction(this.props.updateCallback)) {
            let copy = JSON.parse(JSON.stringify(this.state.selectedData));

            // 정렬 용도로 사용하던 table 변수 제거
            if (!_.isNil(copy['__seq']))
                delete copy['__seq'];

            this.props.updateCallback(Object.assign({}, copy, data), this.props.updateArgs);
        }

        this.setState({
            insertFormIsOpen: false,
            updateFormIsOpen: false,
            selectedData: []
        });
    };

    closeCallback = () => {
        this.setState({
            insertFormIsOpen: false,
            updateFormIsOpen: false,
            selectedData: []
        });
    };

    render() {
        const tableData = (_.isNil(this.props.tableData)) ? [] : this.props.tableData;
        const columns = (_.isNil(this.props.columns)) ? [] : this.props.columns;
        const defaultSorted = (_.isNil(this.props.defaultSorted)) ? undefined : this.props.defaultSorted;
        const crudFormInfo = (_.isNil(this.props.crudFormInfo)) ? [] : this.props.crudFormInfo;

        const {insertFormTitle, updateFormTitle} = this.props;

        const isCheckable = (_.isNil(this.props.isCheckable)) ? false : this.props.isCheckable;
        const {isAddable, isEditable, isRemovable} = this.props;

        const {isFetching, defaultPageSize} = this.props;

        //    if(isFetching){
        //      return <div style={{
        //        height: "100vh"
        //      }}>
        //        <CircularProgress style={{
        //          position: "absolute",
        //          top     : "0",
        //          left    : "0",
        //          bottom  : "0",
        //          right   : "0",
        //          margin  : "auto"
        //        }} size={80} thickness={5} />
        //      </div>;
        //    }

        return (
            <div>
                {
                    (() => {
                        let list = [];
                        if (isAddable) list.push(<DialogForm key="0" formType="insert" formTitle={insertFormTitle}
                                                             isOpen={this.state.insertFormIsOpen}
                                                             closeCallback={this.closeCallback}
                                                             crudFormInfo={crudFormInfo}
                                                             getData={this.getInsertFormData}
                                                             _onChange={this.props.onChange}/>);
                        if (isEditable) list.push(<DialogForm key="1" formType="update" formTitle={updateFormTitle}
                                                              isOpen={this.state.updateFormIsOpen}
                                                              closeCallback={this.closeCallback}
                                                              crudFormInfo={crudFormInfo}
                                                              selectedData={this.state.selectedData}
                                                              getData={this.getUpdateFormData}
                                                              _onChange={this.props.onChange}/>);

                        return list;
                    })()
                }
                <DataTable key={this.props._key} tableData={tableData} loading={isFetching} isCheckable={isCheckable}
                           columns={columns} isAddable={isAddable} isEditable={isEditable} isRemovable={isRemovable}
                           insertClick={this.insertClick} updateClick={this.updateClick} deleteClick={this.deleteClick}
                           defaultSorted={defaultSorted} defaultPageSize={defaultPageSize}/>
            </div>
        );
    }
}

export default CreateTable;
