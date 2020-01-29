import React, {Component} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {uploadImageApi} from "../redux/services/post"
import _ from "lodash";

import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";


class BrandEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deleteOpen: false,
      content   : (!_.isNil(props.content)) ? props.content : ''
    };
  }

  handleEditorChange = (e) => {
    this.setState({
      content: e.target.getContent()
    });
    // console.log('Content was updated:', e.target.getContent());
  };

  handleImageUpload = async (blobInfo, success, failure) => {
    let formData = new FormData();

    let fileName = '';
    if (typeof (blobInfo.blob().name) !== undefined) {
      fileName = blobInfo.blob().name;
    }
    else {
      fileName = blobInfo.filename();
    }

    formData.append('file', blobInfo.blob(), fileName);

    let req = {
      boardId: this.props.boardId,
      files  : formData
    };

    try {
      let result = await uploadImageApi(req);
      console.log(result);

      // TODO

      success();
    }
    catch(e){
      failure("IMAGE UPLOAD FAIL.");
    }
  };

  handleSave = () => {
    if(_.isFunction(this.props.handleSave)){
      this.props.handleSave(this.state.content);
    }
  };

  handleDelete = () => {
    this.setState({
      deleteOpen: false
    });

    if(_.isFunction(this.props.handleDelete)){
      this.props.handleDelete();
    }
  };


  render() {
    let {content, isCreate, isValidate} = this.props;

    return (
      <div>
        <Editor
          initialValue={content}
          init={{
            height : 700,
            menubar: true,
            plugins: [
              'advlist autolink lists link image imagetools charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | fontsizeselect | bold italic underline strikethrough forecolor backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | image | media | link | help',

            images_reuse_filename: true,
            // file_picker_types: 'image',
            images_upload_handler: this.handleImageUpload
          }}
          onChange={this.handleEditorChange}
        />
        <br />
        <div style={{
          display  : 'block',
          textAlign: 'right'
        }}>
          <Button variant="contained" color="primary" onClick={this.handleSave}
                  disabled={_.isNil(isValidate) || !isValidate}>SAVE</Button>

          {!isCreate && <Button variant="contained" color={"#e03333"} onClick={() => {
            this.setState({deleteOpen: true});
          }}/>}

          <Dialog
            disableBackdropClick
            maxWidth="xs"
            open={this.state.deleteOpen}
          >
            <DialogTitle>Confirm</DialogTitle>
            <DialogContent dividers>
              Are you sure you want to delete ?
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={() => {
                this.setState({deleteOpen: false});
              }} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleDelete} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>

      </div>
    );
  }
}

export default BrandEditor;