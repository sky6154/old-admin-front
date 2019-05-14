import React     from "react";
import TextField from '@material-ui/core/TextField';

import classNames   from 'classnames';
import Select       from 'react-select';
import {withStyles} from '@material-ui/core/styles';
import Typography   from '@material-ui/core/Typography';
import NoSsr        from '@material-ui/core/NoSsr';
import Paper        from '@material-ui/core/Paper';
import Chip         from '@material-ui/core/Chip';
import MenuItem     from '@material-ui/core/MenuItem';
import CancelIcon   from '@material-ui/icons/Cancel';
import {emphasize}  from '@material-ui/core/styles/colorManipulator';
import _            from "lodash";
import FormControl  from "@material-ui/core/es/FormControl/FormControl";
import InputLabel   from "@material-ui/core/es/InputLabel/InputLabel";


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};


class DialogSearchDropDown extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isTouched: false,
      value    : null,
      listening: false
    };
  }

  componentWillMount(){
    let val = null;

    if(!this.state.isTouched && !_.isNil(this.props.initialValue)){
      val = this.props.initialValue;

      if(!_.isNil(this.props.setValueFunc) && _.isFunction(this.props.setValueFunc)){
        this.props.setValueFunc(this.props.index, {
          [this.props.dbColumnName]: val
        });
      }
    }

    let items = this.processData(this.props.value);
    let obj = _.find(items, function(o){
      o.id = '' + o.id;
      val = '' + val;

      return o.id === val;
    });

    this.setState({
      value: obj
    });

    if(!_.isNil(this.props.setValidateFunc) && _.isFunction(this.props.setValidateFunc)){
      // 무조건 선택하도록 강제하고 있기 때문에 바로 true
      this.props.setValidateFunc(this.props.index, true);
    }
  }

  processData = data =>{
    let result = [];

    Object.keys(data).map(function (key){
      let temp = {
        value: key,
        label: data[key]
      };
      result.push(temp);
    });

    return result;
  };

  handleChange = selectedItem => {
    const isRequired = (_.isNil(this.props.isRequired)) ? false : this.props.isRequired;

    let isEmpty = _.isNil(selectedItem) ? true : false;

    this.setState({
      isTouched: true,
      value    : selectedItem,
      listening: false
    });

    let isValidate = (isRequired) ? (!isEmpty) : true;

    this.props.setValidateFunc(this.props.index, isValidate);

    this.props.setValueFunc(this.props.index, {
      [this.props.dbColumnName]: (_.isNil(selectedItem)) ? null : selectedItem.value
    });

    if(_.isFunction(this.props._onChange)){
      let val = (_.isNil(selectedItem)) ? null : selectedItem.value;

      let obj = {
        source : this.props.dbColumnName,
        val : val
      };

      this.props._onChange(obj);
    }
  }

  render(){
    const {hintText, floatingLabelText, value} = this.props;

    const isRequired = (_.isNil(this.props.isRequired)) ? false : this.props.isRequired;
    const errorText = (isRequired && _.isNil(this.state.value)) ? "필수로 입력되어야 하는 데이터 입니다." : undefined;

    let items = this.processData(value);

    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            textFieldProps={{
              label: floatingLabelText,
              InputLabelProps: {
                shrink: true,
              },
              error: isRequired && _.isNil(this.state.value)
            }}
            options={items}
            components={components}
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={hintText}
            isClearable
          />
        </NoSsr>
      </div>
    );
  }
}


export default withStyles(styles, { withTheme: true })(DialogSearchDropDown);