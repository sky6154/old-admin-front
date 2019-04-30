import React from "react";
import _ from "lodash";
import { withStyles } from '@material-ui/core/styles';

import ReactTable from "react-table";
import "react-table/react-table.css";

import Button from '@material-ui/core/Button';

import AssignmentIcon from '@material-ui/icons/Assignment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


// import insertSvg from "material-design-icons/action/svg/production/ic_assignment_48px.svg";
// import editSvg from "material-design-icons/editor/svg/production/ic_mode_edit_48px.svg";
// import removeSvg from "material-design-icons/action/svg/production/ic_delete_48px.svg";

import Alert from "react-s-alert";
import DialogAlert from "./DialogAlert";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class DataTable extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selected  : {},
      selectAll : 0,
      tableData : [],
      isCheckAdd: false,
      isAlertOpen: false
    };

    this.toggleRow = this.toggleRow.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.updateCallback = this.updateCallback.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
    this.getSelectedData = this.getSelectedData.bind(this);
  }

  componentWillMount(){
    // 기존 데이터에 테이블에서 조절하기 위한 __seq를 추가한다.
    if(!_.isNil(this.props.tableData)){
      let data = _.map(this.props.tableData, (item, index) =>{
        return Object.assign({__seq: index}, item);
      });

      this.setState({
        tableData: data
      });
    }
  }

  componentWillReceiveProps(nextProps){
    // 기존 데이터에 테이블에서 조절하기 위한 __seq를 추가한다.
    if(!_.isNil(nextProps.tableData)){
      let data = _.map(nextProps.tableData, (item, index) =>{
        return Object.assign({__seq: index}, item);
      });

      this.setState({
        tableData: data
      });
    }
  }

  handleDeleteAlertClose = () =>{
    this.setState({isAlertOpen: false});
  };

  handleDeleteAlertExecAndClose = () =>{
    this.deleteCallback(this.props.deleteClick, this.getSelectedData())
    this.setState({isAlertOpen: false});
  };

  toggleRow(__seq){
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[__seq] = !this.state.selected[__seq];
    this.setState({
      selected : newSelected,
      selectAll: 2
    });
  }

  toggleSelectAll(){
    let newSelected = {};

    if(this.state.selectAll === 0){
      this.state.tableData.forEach(x =>{
        newSelected[x.__seq] = true;
      });
    }

    this.setState({
      selected : newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }

  insertCallback(callback){
    if(!_.isFunction(callback))
      return null;
    else
      callback();
  }

  updateCallback(callback, data){
    if(!_.isFunction(callback))
      return null;
    else{
      if(data.length !== 1){
        Alert.info("데이터 수정은 하나만 선택한 후 시도하여 주세요.", {
          position: 'top-right',
          effect  : 'slide',
          timeout : 3000
        });
      }
      else{
        callback(data[0]);
      }
    }
  }

  deleteCallback(callback, data){
    if(!_.isFunction(callback))
      return null;
    else{
      this.setState({
        selected : {},
        selectAll: 0
      });
      callback(data);
    }
  }

  getSelectedData(){
    let selectedTableData = [];

    _.map(this.state.selected, (item, index) =>{
      if(item === true) selectedTableData.push(this.state.tableData[index]);
    });

    return selectedTableData;
  }

  filterCaseInsensitive = (filter, row) =>{
    const id = filter.pivotId || filter.id;
    let val = row[id];

    if(!isNaN(val))
      val = '' + val;

    return (
      val !== undefined ? String(val.toLowerCase()).includes(filter.value.toLowerCase()) : true
    );
  }

  render(){
    const tableData = this.state.tableData;

    // 아래에서 unshift를 쓰기 때문에.. 체크 늘어나는걸 방지하기 위해 slice를 쓴다.
    let columns = this.props.columns.slice();

    if(this.props.isCheckable){
      // 표 가장 왼쪽에 체크박스 추가
      columns.unshift({
        Header : "체크",
        columns: [
          {
            id      : "checkbox",
            accessor: "",
            Cell    : ({original}) =>{
              return (
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={this.state.selected[original.__seq] === true}
                  onChange={() => this.toggleRow(original.__seq)}
                />
              );
            },
            Header  : x =>{
              return (
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={this.state.selectAll === 1}
                  ref={input =>{
                    if(input){
                      input.indeterminate = this.state.selectAll === 2;
                    }
                  }}
                  onChange={() => this.toggleSelectAll()}
                />
              );
            },
            sortable: false,
            width   : 45,
            filterable: false
          }
        ],
      });
    }

    const defaultSorted = (!_.isNil(this.props.defaultSorted)) ? this.props.defaultSorted : [];
    let defaultPageSize = (_.isNil(this.props.defaultPageSize)) ? 25 : this.props.defaultPageSize;

    return (
      <div>
        <br />
        <div style={{
          float       : "right",
          paddingRight: "1%"
        }}>
          {
            (() =>{
              let btnList = [];

              if(this.props.isAddable){
                btnList.push(<Button key="0" onClick={() =>{this.insertCallback(this.props.insertClick)}}><AssignmentIcon /></Button>);
              }

              if(this.props.isEditable){
                btnList.push(<Button key="1" onClick={() =>{this.updateCallback(this.props.updateClick, this.getSelectedData())}}><EditIcon /></Button>);
              }

              if(this.props.isRemovable){
                btnList.push(<Button key="2" onClick={() =>{
                  if(this.getSelectedData().length !== 1){
                    Alert.info("삭제는 하나만 선택한 후 시도하여 주세요.", {
                      position: 'top-right',
                      effect  : 'slide',
                      timeout : 3000
                    });
                  }
                  else{
                    this.setState({isAlertOpen: true});
                  }
                }} ><DeleteIcon /></Button>);
              }

              return btnList;
            })()
          }
        </div>
        <br />
        <br />
        <DialogAlert message="삭제하시겠습니까 ?" handleDeleteAlertClose={this.handleDeleteAlertClose} handleDeleteAlertExecAndClose={this.handleDeleteAlertExecAndClose} isAlertOpen={this.state.isAlertOpen}/>
        <ReactTable
          loading={this.props.isFetching}
          data={tableData}
          columns={columns}
          defaultPageSize={defaultPageSize}
          defaultSorted={defaultSorted}
          defaultFilterMethod={this.filterCaseInsensitive}
          filterable
        />
      </div>
    );
  }
}

export default withStyles(styles)(DataTable);