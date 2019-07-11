import React                   from 'react';
import MyEditor                from "../../components/Editor";
import {permissionCheck, Role} from "../../config/Role";
import ReactTable              from "react-table";
import TextField               from "@material-ui/core/es/TextField/TextField";
import MenuItem                from "@material-ui/core/es/MenuItem/MenuItem";
import {fetchBoardListTrigger} from "../../redux/actions/board";
import {fetchPostListTrigger}  from "../../redux/actions/post";
import {connect}               from "react-redux";
import {withRouter}            from "react-router";

import _         from "lodash";
import PropTypes from 'prop-types';

class PostManage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      boardId: -1
    };

    let requiredRoles = [Role.ROLE_ADMIN, Role.ROLE_BLOG];

    permissionCheck(requiredRoles, this.props.history);
  }

  componentDidMount(){
    let req = {
      boardId: this.state.boardId
    };
    this.props.fetchBoardListTrigger();
    this.props.fetchPostListTrigger(req);
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.state.boardId === -1 && !_.isNil(this.props.boardList) && !_.isEmpty(this.props.boardList)){
      this.setState({boardId: this.props.boardList[0].boardId});
    }
  }

  handleTargetBoard = () => event =>{
    this.setState({boardId: event.target.value});
  };

  printBoardList = (boardList) =>{
    if(!_.isNil(boardList) && boardList.length > 0){

      return <TextField
        id="outlined-select-currency"
        select
        label="Board list"
        className={"textField"}
        value={this.state.boardId}
        onChange={this.handleTargetBoard()}
        SelectProps={{
          MenuProps: {
            className: "menu",
          },
        }}
        margin="normal"
        variant="outlined"
        style={{width: 200}}
      >
          {boardList.map(boardInfo => (
            <MenuItem key={boardInfo.description} value={boardInfo.boardId}>
              {boardInfo.description}
            </MenuItem>
          ))}
        </TextField>;
    }
  };

  render(){
    const columns = [
      {
        Header : "Name",
        columns: [
          {
            Header  : "First Name",
            accessor: "firstName"
          },
          {
            Header: "Last Name",
            id    : "lastName",
          }
        ]
      },
      {
        Header : "Info",
        columns: [
          {
            Header  : "Age",
            accessor: "age"
          },
          {
            Header  : "Status",
            accessor: "status"
          }
        ]
      },
      {
        Header : "Stats",
        columns: [
          {
            Header  : "Visits",
            accessor: "visits"
          }
        ]
      }
    ];

    let boardListDropDown = this.printBoardList(this.props.boardList);

    return (
      <div>
        {boardListDropDown}

        <ReactTable
          data={[]}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
          SubComponent={row =>{
            return (
              <div style={{padding: "20px"}}>
                <em>
                  You can put any component you want here, even another React
                  Table!
                </em>
                <br />
                <br />
                <MyEditor boardId={this.state.boardId} />
              </div>
            );
          }}
        />
        <br />
      </div>
    );
  }
}


PostManage.defaultProps = {
  isBoardListFetching: false,
  boardList          : [],
  isPostListFetching : false,
  postList           : []
};

PostManage.propTypes = {
  isBoardListFetching: PropTypes.bool.isRequired,
  boardList          : PropTypes.array.isRequired,
  isPostListFetching : PropTypes.bool.isRequired,
  postList           : PropTypes.array.isRequired
};

function mapStateToProps(state){
  return {
    isBoardListFetching: state.board.isBoardListFetching,
    boardList          : state.board.boardList,
    isPostListFetching : state.post.isPostListFetching,
    postList           : state.post.postList
  };
}


export default withRouter(connect(mapStateToProps, {
  fetchBoardListTrigger,
  fetchPostListTrigger
})(PostManage));