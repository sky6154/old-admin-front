import React from "react";

import _ from "lodash";

// import DateTimePicker   from "material-ui-datetimepicker";
// import DatePickerDialog from "material-ui/DatePicker/DatePickerDialog";
// import TimePickerDialog from "material-ui/TimePicker/TimePickerDialog";
// import closeSvg from "material-design-icons/navigation/svg/production/ic_close_48px.svg";

import CloseIcon from '@material-ui/icons/Close';
import moment    from "moment";


import MomentUtils from '@date-io/moment';
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  InlineDateTimePicker, MuiPickersUtilsProvider
}                   from "material-ui-pickers";

class DialogDatePicker extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value    : '',
      isTouched: false,
      isEmpty  : true
    }
  }

  componentWillMount(){
    if(!this.state.isTouched && !_.isNil(this.props.initialValue)){
      let date = moment(this.props.initialValue).format('YYYY-MM-DD HH:mm:ss');

      this.setState({
        value  : date,
        isEmpty: false
      });

      if(!_.isNil(this.props.setValueFunc) && _.isFunction(this.props.setValueFunc)){
        this.props.setValueFunc(this.props.index, {
          [this.props.dbColumnName]: this.props.initialValue
        });
      }
    }

    if(!_.isNil(this.props.setValidateFunc) && _.isFunction(this.props.setValidateFunc)){
      if(!this.props.isRequired || (!this.state.isTouched && !_.isNil(this.props.initialValue))){
        this.props.setValidateFunc(this.props.index, true);
      }else{
        this.props.setValidateFunc(this.props.index, false);
      }
    }
  }

  handleChange = date =>{
    const isRequired = (_.isNil(this.props.isRequired)) ? false : this.props.isRequired;

    let isEmpty = true;

    let val = date;

    if(!_.isNil(date)){
      isEmpty = false;
      val = date.format('YYYY-MM-DD HH:mm:ss');
    }
    else{
      isEmpty = true;
      val = '';
    }

    this.setState({
      isEmpty  : isEmpty,
      value    : val,
      isTouched: true
    });

    let isValidate = (isRequired) ? (!isEmpty) : true;

    this.props.setValidateFunc(this.props.index, isValidate);
    this.props.setValueFunc(this.props.index, {
      [this.props.dbColumnName]: val
    });

    if(_.isFunction(this.props._onChange)){
      let obj = {
        source: this.props.dbColumnName,
        val   : val
      };

      this.props._onChange(obj);
    }
  };

  render(){
    const {floatingLabelText, hintText} = this.props;
    const isRequired = (_.isNil(this.props.isRequired)) ? false : this.props.isRequired;
    const errorText = (isRequired && this.state.isEmpty) ? "필수로 입력되어야 하는 데이터 입니다." : undefined;

    /**
     * TODO 최초 키보드 입력 시 입력 불가능한 이슈 수정해야 함
     * Material ui 버전업에 따른 사용방법 변경 해야 함
     */

    // return <DateTimePicker
    //   value={this.state.value}
    //   onChange={this.handleChange}
    //   helperText={floatingLabelText}
    //   label={hintText}
    //   format="yyyy-MM-dd HH:mm:ss"
    //   onError={console.log}
    //   emptyLabel={errorText}
    //   clearable
    // />

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="picker">
          <InlineDateTimePicker
            keyboard={true}
            ampm={false}
            label={floatingLabelText}
            value={this.state.value}
            onChange={this.handleChange}
            onError={console.log}
            disablePast={false}
            format={"YYYY/MM/DD hh:mm A"}
            mask={[
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "/",
              /\d/,
              /\d/,
              "/",
              /\d/,
              /\d/,
              " ",
              /\d/,
              /\d/,
              ":",
              /\d/,
              /\d/,
            ]}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

export default DialogDatePicker;