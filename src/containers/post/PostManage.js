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
      boardId: -1,
      isFirst: true
    };

    let requiredRoles = [Role.ROLE_ADMIN, Role.ROLE_BLOG];

    permissionCheck(requiredRoles, this.props.history);
  }

  componentDidMount(){
    this.props.fetchBoardListTrigger();
  }

  static getDerivedStateFromProps(nextProps, prevState){
    // 여기서는 setState 를 하는 것이 아니라
    // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
    // 사용됩니다.
    /*
    if (nextProps.value !== prevState.value) {
      return { value: nextProps.value };
    }
    return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
    */

    if(prevState.boardId === -1 && !_.isNil(nextProps.boardList) && !_.isEmpty(nextProps.boardList)){
      return {
        boardId: nextProps.boardList[0].boardId
      }
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(!_.isNil(this.props.fetchPostListTrigger) && this.state.boardId > 0 && this.state.isFirst){
      let req = {
        boardId: this.state.boardId
      };

      this.props.fetchPostListTrigger(req);

      this.setState({
        isFirst: false
      });
    }
  }

  handleTargetBoard = () => event =>{
    this.setState({boardId: event.target.value});

    let req = {
      boardId: event.target.value
    };

    this.props.fetchPostListTrigger(req);
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
        Header : "Post info",
        columns: [
          {
            Header  : "Sequence",
            accessor: "seq"
          },
          {
            Header  : "제목",
            accessor: "title",
          },
          {
            Header  : "게시판 ID",
            accessor: "boardId",
          },
          {
            Header  : "내용",
            accessor: "content",
          },
          {
            Header  : "저자",
            accessor: "author",
          },
          {
            Header  : "삭제 유무",
            accessor: "isDelete",
          },
          {
            Header  : "조회수",
            accessor: "hits",
          },
          {
            Header  : "수정일",
            accessor: "modifyDate",
          },
          {
            Header  : "등록일",
            accessor: "regDate",
          }
        ]
      }
    ];

    let boardListDropDown = this.printBoardList(this.props.boardList);

    const data = (_.isNil(this.props.postList)) ? [] : this.props.postList;

    return (
      <div>
        {boardListDropDown}

        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
          SubComponent={row =>{
            return (
              <div style={{padding: "20px"}}>
                <MyEditor boardId={this.state.boardId} title={row.original.title} content={row.original.content} isUpdate={true} seq={row.original.seq} />
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