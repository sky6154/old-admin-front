import React from 'react';
import EditorV2 from "../components/EditorV2";
import TextField from "@material-ui/core/es/TextField/TextField";

import {fetchBoardListTrigger} from "../redux/actions/board";
import {uploadPostTrigger} from "../redux/actions/post";

import {connect} from "react-redux";
import {withRouter} from "react-router";
import PropTypes from 'prop-types';

class BlogEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: (props.title) ? props.title : "",
        };
    }

    handleTitle = (event) => {
        this.setState({title: event.target.value});
    };

    handleSave = (content, seq) => {
        let req = {
            seq : (seq) ? seq : null,
            title: this.state.title,
            content: content,
            author: 'develobeer',
            boardId: this.props.boardId
        };

        this.props.uploadPostTrigger(req);
    };


    render() {
        return (
            <div>
                <TextField
                    id="standard-full-width"
                    label="제목"
                    placeholder="제목을 입력하세요."
                    fullWidth
                    margin="normal"
                    onChange={this.handleTitle}
                    value={this.state.title}
                    variant="outlined"
                />

                <EditorV2 handleSave={this.handleSave} boardId={this.props.boardId}
                          isValidate={!(this.state.title === "")} content={this.props.content}
                          seq={this.props.seq}
                />
            </div>
        );
    }
}


BlogEditor.defaultProps = {
    isBoardListFetching: false,
    boardList: []
};

BlogEditor.propTypes = {
    isBoardListFetching: PropTypes.bool.isRequired,
    boardList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        isBoardListFetching: state.board.isBoardListFetching,
        boardList: state.board.boardList
    };
}


export default withRouter(connect(mapStateToProps, {
    fetchBoardListTrigger,
    uploadPostTrigger
})(BlogEditor));