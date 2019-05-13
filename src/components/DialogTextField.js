import React from 'react';

import _          from 'lodash';
import TextField  from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/es/styles/withStyles";

const styles = theme => ({

});


class DialogTextField extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value    : "",
      isTouched: false,
      isEmpty  : true
    }
  }

  componentWillMount(){
    if(!this.state.isTouched && !_.isNil(this.props.initialValue)){
      this.setState({
        value  : this.props.initialValue,
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

  componentWillReceiveProps(nextProps){
    if(!_.isNil(nextProps.value)){
      let isEmpty = (nextProps.value === "" || _.isNil(nextProps.value)) ? true : false

      this.setState({
        isEmpty  : isEmpty,
        isTouched: true,
        value    : nextProps.value
      });
    }
  }

  render(){
    const {index, hintText, floatingLabelText, multiLine} = this.props;

    let rows = undefined;
    if(multiLine && _.isNil(this.props.rows)){
      rows = 2;
    }else if(multiLine && !_.isNil(this.props.rows)){
      rows = this.props.rows;
    }

    const isRequired = (_.isNil(this.props.isRequired)) ? false : this.props.isRequired;
    const errorText = (isRequired && this.state.isEmpty) ? "필수로 입력되어야 하는 데이터 입니다." : undefined;

    // const defaultStyle = {
    //   margin: "0 0 30px 0"
    // };
    //
    // let style = defaultStyle;
    //
    // if(!_.isNil(this.props.style)){
    //   style = Object.assign(defaultStyle, this.props.style);
    // }

    return <TextField fullWidth={true} key={index} rowsMax={5} value={this.state.value} helperText={hintText}
                      label={floatingLabelText} multiline={multiLine} rows={rows} required={isRequired} error={isRequired && this.state.isEmpty}
                      /*style={style}*/ onChange={(event) =>{
      let value = event.target.value;

      let isEmpty = (value === "" || _.isNil(value)) ? true : false

      this.setState({
        isEmpty  : isEmpty,
        isTouched: true,
        value    : value
      });

      let isValidate = (isRequired) ? (!isEmpty) : true;

      this.props.setValidateFunc(this.props.index, isValidate);
      this.props.setValueFunc(this.props.index, {
        [this.props.dbColumnName]: value
      });

      if(_.isFunction(this.props._onChange)){
        let obj = {
          source: this.props.dbColumnName,
          val   : value
        };

        this.props._onChange(obj);
      }
    }} />;

  }

}

export default withStyles(styles)(DialogTextField);