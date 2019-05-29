import React from 'react';

import _                from 'lodash';
import Switch           from '@material-ui/core/Switch';
import FormGroup        from "@material-ui/core/es/FormGroup/FormGroup";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";

class DialogSwitch extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value       : undefined,
      isTouched   : false,
      defaultValue: {
        disactive: 'N',
        active   : 'Y'
      }
    };

    this.handleSwitch = this.handleSwitch.bind(this);
  }

  componentWillMount(){
    if(!_.isNil(this.props.defaultValue)){
      this.setState({
        defaultValue: {
          disactive: (_.isNil(this.props.defaultValue.disactive)) ? 'N' : this.props.defaultValue.disactive,
          active   : (_.isNil(this.props.defaultValue.active)) ? 'N' : this.props.defaultValue.active,
        }
      });
    }

    if(!this.state.isTouched && !_.isNil(this.props.initialValue)){
      this.setState({
        value: this.props.initialValue
      });

      if(!_.isNil(this.props.setValueFunc) && _.isFunction(this.props.setValueFunc)){
        this.props.setValueFunc(this.props.index, {
          [this.props.dbColumnName]: this.props.initialValue
        });
      }
    }
    else{
      this.setState({
        value: this.props.defaultValue.disactive
      });

      if(!_.isNil(this.props.setValueFunc) && _.isFunction(this.props.setValueFunc)){
        this.props.setValueFunc(this.props.index, {
          [this.props.dbColumnName]: this.props.defaultValue.disactive
        });
      }
    }


    if(!_.isNil(this.props.setValidateFunc) && _.isFunction(this.props.setValidateFunc)){
      // 무조건 선택하도록 강제하고 있기 때문에 바로 true
      this.props.setValidateFunc(this.props.index, true);
    }

  }

  handleSwitch(event, isChecked){
    let value = (isChecked) ? this.state.defaultValue.active : this.state.defaultValue.disactive;

    this.setState({
      value    : value,
      isTouched: true
    });

    if(!_.isNil(this.props.setValueFunc) && _.isFunction(this.props.setValueFunc)){
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
    }
  }

  render(){
    const label = (_.isNil(this.props.label)) ? "" : this.props.label;

    return (
      <FormGroup row>
        <FormControlLabel
          label={label}
          control={
            <Switch
              onChange={this.handleSwitch}
              checked={this.state.value === this.state.defaultValue.active}
            />
          }
        />
      </FormGroup>
    );
  }

}

export default DialogSwitch;