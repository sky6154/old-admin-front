import React from "react";

import _               from "lodash";
import Dropzone, {useDropzone}        from "react-dropzone";
import DialogTextField from "./DialogTextField";
// import closeSvg                   from "material-design-icons/navigation/svg/production/ic_close_48px.svg";

import CloseIcon from '@material-ui/icons/Close';

import {Button} from '@material-ui/core/Button';
import Alert    from "react-s-alert";
import RootRef  from "@material-ui/core/es/RootRef/RootRef";
import Paper    from "@material-ui/core/es/Paper/Paper";

class DialogUpload extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      accept        : '',
      files         : [],
      dropzoneActive: false
    }
  }

  onDragEnter(){
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave(){
    this.setState({
      dropzoneActive: false
    });
  }

  onDropAccepted(){

  }

  onDropRejected(){
    let {mimeTypes} = this.props;
    Alert.error(`${mimeTypes}에 해당하는 파일만 업로드해주세요.`, {
      position: 'top-right',
      effect  : 'slide',
      timeout : 3000
    });
  }

  onDrop(files){
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
  }

  componentWillReceiveProps(nextProps){
    if(!_.isNil(nextProps.mimeTypes)){
      this.setState({
        accept: nextProps.mimeTypes
      });
    }
  }

  render(){
    const {accept, files, dropzoneActive} = this.state;
    const overlayStyle = {
      position  : 'absolute',
      top       : 0,
      right     : 0,
      bottom    : 0,
      left      : 0,
      padding   : '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign : 'center',
      color     : '#fff',
      zIndex    : 1000
    };

    let {initialValue, hintText, floatingLabelText, multiLine, isRequired, dbColumnName, setValidateFunc, setValueFunc, value} = this.props;

    const style = {
      width: "40%"
    };

    let dropzoneRef;

    const {getRootProps, getInputProps} = useDropzone();
    const {ref, ...rootProps} = getRootProps();

    /**
     * TODO Material ui 및 dropzone 업데이트 하면서 버전업에 따른 사용방법 변경으로
     * 올바르게 사용되게 수정해야 함.
    */

    return (
      <RootRef rootRef={ref}>
        <Paper {...rootProps}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </Paper>
      </RootRef>
    );


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

export default DialogUpload;