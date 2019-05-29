import React from "react";

import _ from "lodash";

import Dialog               from '@material-ui/core/Dialog';
import Button               from '@material-ui/core/Button';
import DialogTextField      from "./DialogTextField";
import DialogDropDown       from "./DialogDropDown";
import DialogSwitch         from "./DialogSwitch";
import DialogDatePicker     from "./DialogDatePicker";
import DialogUpload         from "./DialogUpload";
import DialogSearchDropDown from "./DialogSearchDropDown";
import withStyles           from "@material-ui/core/es/styles/withStyles";
import DialogTitle          from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent        from "@material-ui/core/es/DialogContent/DialogContent";
import DialogActions        from "@material-ui/core/es/DialogActions/DialogActions";
import Grid                 from "@material-ui/core/es/Grid/Grid";

// obj[key] == object 일 경우 반환하지 않는다.
function findValueByKeyDepth(obj, key){
  if(obj === undefined || obj === null){
    return undefined;
  }
  if(obj.hasOwnProperty(key)){
    return obj[key];
  }
  // string도 object로 인식해서 하나하나 다.. 검사하므로.. 제외한다.
  else if(typeof obj !== "string"){
    for(var name in obj){
      var result = findValueByKeyDepth(obj[name], key);
      // 결과값이 오브젝트일 경우 반환하지 않는다.
      if(result !== undefined && typeof result !== "object"){
        return result;
      }
    }
  }
  return undefined;
}

function createDatePicker(content, key, setValidateFunc, setValueFunc, formType, selectedData, isStepper, _onChange){
  let _selectedData = ((formType !== "update" && _.isNil(selectedData)) || (!isStepper && _.isNil(selectedData))) ? null : findValueByKeyDepth(selectedData, content.dbColumnName);
  let floatingLabelText = (_.isNil(content.title)) ? "" : content.title;
  let isRequired = (!_.isNil(content.isRequired) && content.isRequired) ? true : false;
  let hintText = (_.isNil(content.hintText)) ? "" : content.hintText;
  let dbColumnName = (_.isNil(content.dbColumnName)) ? "" : content.dbColumnName;

  return <DialogDatePicker key={key} index={key} dbColumnName={dbColumnName} initialValue={_selectedData}
                           floatingLabelText={floatingLabelText} isRequired={isRequired} hintText={hintText}
                           setValidateFunc={setValidateFunc} setValueFunc={setValueFunc} _onChange={_onChange} />;
}

function createDropDown(content, key, setValidateFunc, setValueFunc, formType, selectedData, isStepper, _onChange){
  let _selectedData = ((formType !== "update" && _.isNil(selectedData)) || (!isStepper && _.isNil(selectedData))) ? null : findValueByKeyDepth(selectedData, content.dbColumnName);
  let floatingLabelText = (_.isNil(content.title)) ? "" : content.title;
  let dbColumnName = (_.isNil(content.dbColumnName)) ? "" : content.dbColumnName;

  return <DialogDropDown key={key} index={key} dbColumnName={dbColumnName} initialValue={_selectedData}
                         floatingLabelText={floatingLabelText} replaceValue={content.replaceValue} value={content.value}
                         setValidateFunc={setValidateFunc} setValueFunc={setValueFunc} _onChange={_onChange} />;
}

function createToggle(content, key, setValidateFunc, setValueFunc, formType, selectedData, isStepper, _onChange){
  let _selectedData = ((formType !== "update" && _.isNil(selectedData)) || (!isStepper && _.isNil(selectedData))) ? null : findValueByKeyDepth(selectedData, content.dbColumnName);
  let label = (_.isNil(content.title)) ? "" : content.title;
  let dbColumnName = (_.isNil(content.dbColumnName)) ? "" : content.dbColumnName;

  return <DialogSwitch key={key} index={key} dbColumnName={dbColumnName} initialValue={_selectedData} label={label}
                       defaultValue={content.defaultValue} setValidateFunc={setValidateFunc} setValueFunc={setValueFunc}
                       _onChange={_onChange} />;
}

function createText(content, key, setValidateFunc, setValueFunc, formType, selectedData, isStepper, _onChange){
  let _selectedData = ((formType !== "update" && _.isNil(selectedData)) || (!isStepper && _.isNil(selectedData))) ? null : findValueByKeyDepth(selectedData, content.dbColumnName);
  let hintText = (_.isNil(content.hintText)) ? "" : content.hintText;
  let floatingLabelText = (_.isNil(content.title)) ? "" : content.title;
  let multiLine = (!_.isNil(content.type) && _.toLower(content.type) === "textfield") ? true : false;
  let isRequired = (!_.isNil(content.isRequired) && content.isRequired) ? true : false;
  let dbColumnName = (_.isNil(content.dbColumnName)) ? "" : content.dbColumnName;

  return <DialogTextField key={key} index={key} dbColumnName={dbColumnName} initialValue={_selectedData}
                          hintText={hintText} floatingLabelText={floatingLabelText} isRequired={isRequired}
                          multiLine={multiLine} setValidateFunc={setValidateFunc} setValueFunc={setValueFunc}
                          _onChange={_onChange} />;
}

function createUpload(content, key, setValidateFunc, setValueFunc, formType, selectedData, isStepper, valueList, _onChange){
  let _selectedData = ((formType !== "update" && _.isNil(selectedData)) || (!isStepper && _.isNil(selectedData))) ? null : findValueByKeyDepth(selectedData, content.dbColumnName);
  let hintText = (_.isNil(content.hintText)) ? "" : content.hintText;
  let floatingLabelText = (_.isNil(content.title)) ? "" : content.title;
  let multiLine = (!_.isNil(content.type) && _.toLower(content.type) === "textfield") ? true : false;
  let isRequired = (!_.isNil(content.isRequired) && content.isRequired) ? true : false;
  let dbColumnName = (_.isNil(content.dbColumnName)) ? "" : content.dbColumnName;
  let isSingleUpload = (_.isNil(content.isSingleUpload)) ? true : content.isSingleUpload;
  let mimeTypes = (_.isNil(content.mimeTypes)) ? "" : content.mimeTypes;
  let defaultString = (_.isNil(content.defaultString)) ? "" : content.defaultString;
  let _valueList = (_.isNil(valueList)) ? {} : valueList;

  return <DialogUpload key={key} index={key} dbColumnName={dbColumnName} initialValue={_selectedData}
                       hintText={hintText} floatingLabelText={floatingLabelText}
                       isRequired={isRequired} multiLine={multiLine} setValidateFunc={setValidateFunc}
                       setValueFunc={setValueFunc}
                       isSingleUpload={isSingleUpload} mimeTypes={mimeTypes} defaultString={defaultString}
                       value={_valueList[dbColumnName]} _onChange={_onChange} />;
}

function createSearchDropDown(content, key, setValidateFunc, setValueFunc, formType, selectedData, isStepper, _onChange){
  let _selectedData = ((formType !== "update" && _.isNil(selectedData)) || (!isStepper && _.isNil(selectedData))) ? null : findValueByKeyDepth(selectedData, content.dbColumnName);
  let floatingLabelText = (_.isNil(content.title)) ? "" : content.title;
  let dbColumnName = (_.isNil(content.dbColumnName)) ? "" : content.dbColumnName;
  let isRequired = (!_.isNil(content.isRequired) && content.isRequired) ? true : false;

  return <DialogSearchDropDown key={key} index={key} dbColumnName={dbColumnName} initialValue={_selectedData}
                               floatingLabelText={floatingLabelText} replaceValue={content.replaceValue}
                               value={content.value} setValidateFunc={setValidateFunc} setValueFunc={setValueFunc}
                               isRequired={isRequired} _onChange={_onChange} />;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class DialogForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isOpen      : false,
      validateList: [],
      isValidate  : false,
      valueList   : {
        __files: {}
      }
    };
  }

  handleSubmit = () =>{
    if(!_.isNil(this.props.getData) && _.isFunction(this.props.getData)){
      this.props.getData(this.state.valueList);

      // 값을 전송한 후 다음 form에 영향을 주지 않기 위해 비운다.
      this.setState({
        isOpen      : false,
        validateList: [],
        isValidate  : false,
        valueList   : {
          __files: {}
        }
      });
    }
  };

  handleClose = () =>{
    this.setState({
      isOpen      : false,
      validateList: [],
      isValidate  : false,
      valueList   : {
        __files: {}
      }
    });

    if(!_.isNil(this.props.closeCallback) && _.isFunction(this.props.closeCallback)){
      this.props.closeCallback();
    }
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      isOpen: nextProps.isOpen
    });
  }

  setValidate = (index, isValidate) => {
    this.setState({
      validateList: Object.assign(this.state.validateList, {[index]: isValidate}),
      isValidate  : this.isEmpty(this.state.validateList)
    });
  };

  setValue = (index, value) => {
    let __files = this.state.valueList['__files'];

    if(!_.isNil(value['__files'])){
      __files = Object.assign(__files, value['__files']);

      value['__files'] = __files;
    }

    this.setState({
      valueList: Object.assign(this.state.valueList, value)
    });
  };

  isEmpty = (validateList) => {
    for(var o in validateList){
      if(!validateList[o]){
        return false;
      }
    }

    return true;
  };

  createForm = (crudFormInfo, formType, setValidateFunc, setValueFunc, selectedData, isStepper, valueList, _onChange) => {
    let list = [];
    const xs = 6;

    if(!_.isNil(crudFormInfo)){
      _.map(crudFormInfo, (item, index) =>{
        let isInclude = item.usage.includes(formType);

        if(isInclude){
          let type = _.toLower(item.type);

          switch(type){
            case "text":
            case "textfield":
              list.push(<Grid item xs={xs} key={index}>{createText(item, index, setValidateFunc, setValueFunc, formType, selectedData, isStepper, _onChange)}</Grid>);
              break;
            case "datepicker":
              list.push(<Grid item xs={xs} key={index}>{createDatePicker(item, index, setValidateFunc, setValueFunc, formType, selectedData, isStepper, _onChange)}</Grid>);
              break;
            case "dropdown":
              list.push(<Grid item xs={xs} key={index}>{createDropDown(item, index, setValidateFunc, setValueFunc, formType, selectedData, isStepper, _onChange)}</Grid>);
              break;
            case "toggle":
              list.push(<Grid item xs={xs} key={index}>{createToggle(item, index, setValidateFunc, setValueFunc, formType, selectedData, isStepper, _onChange)}</Grid>);
              break;
            case "upload":
              list.push(<Grid item xs={xs} key={index}>{createUpload(item, index, setValidateFunc, setValueFunc, formType, selectedData, isStepper, valueList, _onChange)}</Grid>);
              break;
            case "searchdropdown":
              list.push(<Grid item xs={xs} key={index}>{createSearchDropDown(item, index, setValidateFunc, setValueFunc, formType, selectedData, isStepper, _onChange)}</Grid>);
              break;
            default :
              break;
          }

        }
      });
    }

    return list;
  };

  render(){
    const {classes} = this.props;
    const title = (_.isNil(this.props.formTitle)) ? "Default Title" : this.props.formTitle;
    const isStepper = false;

    const actions = [
      <Button key={0} primary={"true"} onClick={this.handleClose}>Cancel</Button>,
      <Button key={1} primary={"true"} disabled={!this.state.isValidate} onClick={this.handleSubmit}>Submit</Button>
    ];

    return (
      <div>
        <Dialog
          modal="true"
          open={this.state.isOpen}
          fullWidth={true}
          maxWidth={"xl"}
          scroll={"paper"}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <div className={classes.root}>
              <Grid container spacing={1}>
                {this.createForm(this.props.crudFormInfo, this.props.formType, this.setValidate, this.setValue, this.props.selectedData, isStepper, this.state.valueList, this.props._onChange)}
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            {actions}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(DialogForm);