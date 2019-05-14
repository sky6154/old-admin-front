import React from "react";

import _           from "lodash";
import moment      from "moment";
import MomentUtils from '@date-io/moment';

import {MuiPickersUtilsProvider, KeyboardDateTimePicker} from '@material-ui/pickers';
import {createMuiTheme}                                  from "@material-ui/core";
import {ThemeProvider}                                   from "@material-ui/styles";

const materialTheme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h4: {
        fontSize: "2rem" // 달력 폰트 사이즈.. 맞는거같은데 적용이 안된다. 알아봐야 함
      }
    },
  }
});


class DialogDatePicker extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value    : null,
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
      val = null;
    }

    this.setState({
      isEmpty  : isEmpty,
      value    : val,
      isTouched: true
    });

    let isValidate = (isRequired) ? (!isEmpty) : true;

    this.props.setValidateFunc(this.props.index, isValidate);
    this.props.setValueFunc(this.props.index, {
      [this.props.dbColumnName]: (val == null) ? '' : val
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

    return (
      <ThemeProvider theme={materialTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDateTimePicker
            error={isRequired && this.state.isEmpty}
            keyboard={"true"}
            ampm={false}
            variant="inline"
            label={floatingLabelText}
            value={this.state.value}
            onChange={this.handleChange}
            onError={console.log}
            disablePast={false}
            format={"YYYY-MM-DD HH:mm:ss"}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  }
}

export default DialogDatePicker;