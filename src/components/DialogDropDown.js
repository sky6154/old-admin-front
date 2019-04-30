import React from 'react';

import _ from 'lodash';

import MenuItem    from '@material-ui/core/MenuItem';
import Select      from '@material-ui/core/Select';
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel  from "@material-ui/core/es/InputLabel/InputLabel";
import withStyles  from "@material-ui/core/es/styles/withStyles";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  }
});


class DialogDropDown extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value    : undefined,
      isTouched: false
    }
  }

  componentWillMount(){
    let val = undefined;
    if(!this.state.isTouched && !_.isNil(this.props.initialValue)){
      val = this.props.initialValue;

      if(!_.isNil(this.props.setValueFunc) && _.isFunction(this.props.setValueFunc)){
        this.props.setValueFunc(this.props.index, {
          [this.props.dbColumnName]: val
        });
      }
    }
    else if(!_.isNil(this.props.value)){
      // 값이 하나 이상 있고 기본 지정값이 없을 경우 가장 첫 번째 값을 처음 노출한다.
      // for array
      if(this.props.value.length > 0){
        val = this.props.value.keys()[0];
      }
      // for obj
      else if(Object.keys(this.props.value).length > 0){
        val = Object.keys(this.props.value)[0];
      }

      if(!_.isNil(this.props.setValueFunc) && _.isFunction(this.props.setValueFunc)){
        this.props.setValueFunc(this.props.index, {
          [this.props.dbColumnName]: val
        });
      }
    }

    this.setState({
      value: val
    });

    if(!_.isNil(this.props.setValidateFunc) && _.isFunction(this.props.setValidateFunc)){
      // 무조건 선택하도록 강제하고 있기 때문에 바로 true
      this.props.setValidateFunc(this.props.index, true);
    }
  }

  handleChange = (event) => {
    let value = event.target.value;

    this.setState({
      isTouched: true,
      value    : value
    });

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
  };

  render(){
    const {value, replaceValue, floatingLabelText, classes} = this.props;

    let list = [];

    _.map(value, (item, index) =>{
      if(!_.isNil(replaceValue[index])){
        list.push(<MenuItem value={index} key={index}>{replaceValue[index]}</MenuItem>);
      }
      else{
        list.push(<MenuItem value={index} key={index}>{item}</MenuItem>);
      }
    });

    let val = this.state.value;

    // must be string
    if(_.isInteger(val)){
      val = '' + val;
    }

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel shrink>
            {floatingLabelText}
          </InputLabel>
          <Select autoWidth={true} value={val} className={classes.selectEmpty} onChange={this.handleChange}>
            {list}
          </Select>
        </FormControl>
      </form>
    );
  }

}

export default withStyles(styles)(DialogDropDown);