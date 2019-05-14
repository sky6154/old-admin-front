import React from "react";

import _ from "lodash";


import Alert            from "react-s-alert";
import {DropzoneDialog} from 'material-ui-dropzone'
import Button           from "@material-ui/core/es/Button/Button";
import TextField        from "@material-ui/core/es/TextField/TextField";
import FormControl      from "@material-ui/core/es/FormControl/FormControl";
import withStyles       from "@material-ui/core/es/styles/withStyles";
import CloseIcon        from '@material-ui/icons/Close';

const styles = theme => ({
  root       : {
    display : 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    marginTop: theme.spacing(1.5),
    display: 'inline-flex',
    wrap   : 'wrap'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

class DialogUpload extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      accept        : '',
      files         : [],
      dropzoneActive: false
    }
  }

  componentWillReceiveProps(nextProps){
    if(!_.isNil(nextProps.mimeTypes)){
      this.setState({
        accept: nextProps.mimeTypes
      });
    }
  }

  handleClose = () =>{
    this.setState({
      dropzoneActive: false
    });
  };

  onDropRejected(files){
    let {mimeTypes} = this.props;
    Alert.error(`${mimeTypes}에 해당하는 파일만 업로드해주세요.`, {
      position: 'top-right',
      effect  : 'slide',
      timeout : 3000
    });
  }

  handleSave = (files) =>{
    let {isSingleUpload} = this.props;

    let value = '';

    if(!_.isNil(files)){
      value += _.map(files, (item, index) =>{
        return this.props.defaultString + item.name;
      });
    }

    if(isSingleUpload === true){
      if(files.length !== 1){
        Alert.info("파일 업로드는 하나만 해주세요.", {
          position: 'top-right',
          effect  : 'slide',
          timeout : 3000
        });
        this.setState({
          dropzoneActive: false
        });
      }
      else{
        this.props.setValueFunc(undefined, {
          [this.props.dbColumnName]: value,
          __files                  : {
            [this.props.dbColumnName]: files
          }
        });

        if(_.isFunction(this.props._onChange)){
          let obj = {
            source: this.props.dbColumnName,
            val   : files
          };

          this.props._onChange(obj);
        }

        this.setState({
          files,
          dropzoneActive: false
        });
      }
    }
    else{
      this.props.setValueFunc(undefined, {
        [this.props.dbColumnName]: value,
        __files                  : {
          [this.props.dbColumnName]: files
        }
      });

      if(_.isFunction(this.props._onChange)){
        let obj = {
          source: this.props.dbColumnName,
          val   : files
        };

        this.props._onChange(obj);
      }

      this.setState({
        files,
        dropzoneActive: false
      });
    }
  };

  handleOpen = () =>{
    this.setState({
      dropzoneActive: true,
    });
  };

  handleReset = () =>{
    this.setState({
      files: []
    });
  };

  render(){
    const {classes, initialValue, hintText, floatingLabelText, multiLine, isRequired, dbColumnName, setValidateFunc, setValueFunc, value} = this.props;
    const {accept, files, dropzoneActive} = this.state;

    return <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        {floatingLabelText}
      </FormControl>
      <FormControl className={classes.formControl}>
        {
          files.map((f, index) =>{
            let fileName = f.name;

            if(f.name.length > 25){
              fileName = f.name.substr(0, 25);
              fileName = fileName.concat('...');
            }

            return (<li key={index} style={{fontSize: "12px"}}>{fileName} - {f.size} bytes</li>);
          })}
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button onClick={this.handleReset}><CloseIcon /></Button>
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button onClick={this.handleOpen}>찾아보기</Button>
      </FormControl>
      <DropzoneDialog
        open={this.state.dropzoneActive}
        onSave={this.handleSave}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={this.handleClose}
        onDropRejected={this.onDropRejected}
      />
    </form>


    // return (
    //   <Dropzone
    //     disableClick
    //     style={{position: "relative"}}
    //     accept={accept}
    //     onDrop={this.onDrop.bind(this)}
    //     onDragEnter={this.onDragEnter.bind(this)}
    //     onDragLeave={this.onDragLeave.bind(this)}
    //     onDropAccepted={this.onDropAccepted.bind(this)}
    //     onDropRejected={this.onDropRejected.bind(this)}
    //     ref={(node) =>{
    //       dropzoneRef = node;
    //     }}
    //   >
    //     {dropzoneActive && <div style={overlayStyle}>이곳에 파일을 넣어주세요.</div>}
    //     <DialogTextField dbColumnName={dbColumnName} initialValue={initialValue} hintText={hintText}
    //                      floatingLabelText={floatingLabelText}
    //                      isRequired={isRequired} multiLine={multiLine} setValidateFunc={setValidateFunc}
    //                      setValueFunc={setValueFunc} value={value} style={style} />
    //     <Button onClick={() =>{
    //       dropzoneRef.open();
    //     }} style={{margin: "10px"}}>찾아보기</Button>
    //     <ul style={{display: "inline-block"}}>
    //       {files.map((f, index) =>{
    //         let fileName = f.name;
    //
    //         if(f.name.length > 25){
    //           fileName = f.name.substr(0, 25);
    //           fileName = fileName.concat('...');
    //         }
    //
    //         return (<li key={index} style={{fontSize: "12px"}}>{fileName} - {f.size} bytes</li>);
    //       })}
    //     </ul>
    //     {
    //       (() =>{
    //         if(files.length >= 1){
    //           return (<Button tooltip="삭제">
    //             <img width="50%" height="50%" style={{
    //               verticalAlign: "middle",
    //               paddingBottom: "5%"
    //             }} src={CloseIcon} alt="reset" onClick={() =>{
    //               setValueFunc(undefined, {
    //                 [dbColumnName]: "",
    //                 __files       : {
    //                   [dbColumnName]: undefined
    //                 }
    //               });
    //               this.setState({
    //                 files: []
    //               });
    //             }} />
    //           </Button>);
    //         }
    //       })()
    //     }
    //   </Dropzone>
    // );
  }

}

export default withStyles(styles)(DialogUpload);