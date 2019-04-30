import React from "react";
import Downshift from "downshift";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';

import ContentClear from '@material-ui/icons/Close';

import NavigationExpandLess from '@material-ui/icons/ExpandLess';
import NavigationExpandMore from '@material-ui/icons/ExpandMore';


// import {ContentClear, NavigationExpandLess, NavigationExpandMore} from "material-ui/svg-icons/index";
import _ from "lodash";


class SearchDropDown extends React.Component {
  updateInputValue = event =>{
    const {onChangeInput} = this.props;
    if(onChangeInput){
      onChangeInput(event);
    }
  };

  render(){
    const {
      items, displayTemplate, floatingLabelText, hintText, searchTemplate, /*onChangeInput,*/ inputDisplayTemplate, /*onStateChange, onChange, classes,*/ errorText
    } = this.props;

    function autoCompleteContents(options){
      const {
        clearSelection, /*getButtonProps,*/ getInputProps, getItemProps, /*getLabelProps, getRootProps,*/ highlightedIndex, inputValue, isOpen, /*openMenu,*/ selectHighlightedItem, /*selectItem, selectItemAtIndex,*/ selectedItem, /*setHighlightedIndex,*/ toggleMenu
      } = options;

      //            console.log("options", options);

      function valuesBySearchTerm(item){
        const _val = inputValue || "";

        if(!_val){
          return true;
        }

        const searchThis = searchTemplate ? searchTemplate(item).toLowerCase() : item.toString();

        return searchThis.includes(_val.toLowerCase());
      }

      function autoCompleteItemToHtml(item, index){
        let selected = false;

        if(selectedItem){
          if(item.id && selectedItem.id){
            selected = item.id === selectedItem.id;
          }
        }

        const _props = getItemProps({
          item,
          index,
          "data-highlighted": highlightedIndex === index,
          "data-selected"   : selected,
          onClick           : () =>{
            selectHighlightedItem()
          }
        });

//        const _key = item.id || index;

        let stateColor = "rgba(0,0,0,0)";

        if(_props["data-highlighted"]){
          stateColor = "rgba(0,0,0,0.12)";
        }

        if(_props["data-selected"]){
          stateColor = "rgba(0,0,0,0.46)";
        }

        return displayTemplate ? displayTemplate(item, _props) : <ListItem
          {..._props}
          style={{
            backgroundColor: stateColor
          }}
        >
          {item}
        </ListItem>;
      }

//      const inputProps = {...getInputProps({a: 1})};
      const autoCompleteMenuItems = isOpen ? items
        .filter(valuesBySearchTerm.bind(this))
        .map(autoCompleteItemToHtml.bind(this)) : [];

      const autoCompleteMenu = (
        <div id="menuAnchor" style={{
          zIndex  : 2,
          position: "absolute",
          bottom  : 0,
          left    : 0,
          right   : 0,
          overflow: "visible",
          height  : 0
        }}>
          <List id="listContainer" style={{
            position       : "fixed",
            maxHeight      : 250,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            width          : "auto",
            marginRight    : "8px",
            overflow       : "auto",
          }}>
            {autoCompleteMenuItems}
          </List>
        </div>
      );

      let _value = inputValue || "";

      if(selectedItem && typeof selectedItem === "object"){
        _value = inputDisplayTemplate(selectedItem);
      }

      const _inputProps = getInputProps({
        hintText         : hintText || "",
        value            : _value,
        floatingLabelText: floatingLabelText || "",
        onChange         : this.updateInputValue,
        errorText        : errorText
      });

      let secondaryActionItem = isOpen ? <NavigationExpandLess /> : <NavigationExpandMore />;

      let secondaryActionEvent = toggleMenu;
      if(selectedItem){
        secondaryActionItem = <ContentClear />;
        secondaryActionEvent = () =>{
          clearSelection();
        };
      }

      const secondaryAction = (
        <Button
          onClick={secondaryActionEvent}
        >
          {secondaryActionItem}
        </Button>
      );

      let margin = undefined;

      if(floatingLabelText){
        margin = "22px 0 0 5px";
      }

      return (
        <div id="frame" style={{
          flexGrow : 1,
          minHeight: "block",
          margin   : 0,
          height   : "100%"
        }}>
          <div id="inputFrame" style={{position: "relative"}}>
            <div id="secondaryActionFrame" style={{
              margin   : margin,
              overflow : "visible",
              width    : 2,
              height   : 2,
              position : "absolute",
              right    : 0,
              bottoptom: 0,
              zIndex   : 1
            }}>
              {secondaryAction}
            </div>
            <TextField {..._inputProps} fullWidth />
            <div id="menuFrame" style={{position: "relative"}}>
              {isOpen ? autoCompleteMenu : null}
            </div>
          </div>
        </div>
      );
    }

    return (
      <Downshift
        {...this.props}
        itemToString={inputDisplayTemplate}
      >
        {autoCompleteContents.bind(this)}
      </Downshift>
    );
  }
}

export default class DialogSearchDropDown extends React.Component {
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
//    else if(!_.isNil(this.props.value)){
//      // 값이 하나 이상 있고 기본 지정값이 없을 경우 가장 첫 번째 값을 처음 노출한다.
//      // for array
//      if(this.props.value.length > 0){
//        val = this.props.value.keys()[0];
//      }
//      // for obj
//      else if(Object.keys(this.props.value).length > 0){
//        val = Object.keys(this.props.value)[0];
//      }
//
//      if(!_.isNil(this.props.setValueFunc) && _.isFunction(this.props.setValueFunc)){
//        this.props.setValueFunc(this.props.index, {
//          [this.props.dbColumnName]: val
//        });
//      }
//    }

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

  displayTemplate = (item, props) =>{
    let stateColor = "rgba(0,0,0,0)";

    if(props["data-highlighted"]){
      stateColor = "rgba(0,0,0,0.12)";
    }

    if(props["data-selected"]){
      stateColor = "rgba(0,0,0,0.46)";
    }


    return (
      <ListItem
        {...props}
        style={{
          backgroundColor: stateColor,
          textAlign      : "left"
        }}
        key={`autocomplete-item-${item.id}`}
      >
        {item.name}
      </ListItem>
    );
  };

  processData = (data) =>{
    let result = [];

    _.forEach(data, function (value, key){
      let obj = {};

      obj.id = key;
      obj.name = value;

      result.push(obj);
    });

    return result;
  }

  render(){
    const styles = {
      fontFamily: "Roboto",
      width     : '94%'
    };

    /**
     * TODO Material ui 버전업으로
     * 검색 + downshift + Material ui를 어떻게 해야할지 고민
     */

    const {hintText, floatingLabelText, value} = this.props;

    const isRequired = (_.isNil(this.props.isRequired)) ? false : this.props.isRequired;
    const errorText = (isRequired && _.isNil(this.state.value)) ? "필수로 입력되어야 하는 데이터 입니다." : undefined;

    let items = this.processData(value);

    return (
      <div style={styles}>
        <div>
          <SearchDropDown
            //This is the list of data that is databound to the combobox
            items={items}

            //This is a template that can be overridden for each list item
            displayTemplate={this.displayTemplate}

            floatingLabelText={floatingLabelText}

            //This is placeholder text when the input has focus
            hintText={hintText}

            errorText={errorText}

            defaultSelectedItem={this.state.value}

            // This affects the search behavior
            // Maybe what you search is different from just
            // one single prop.
            // so this is how one might search across many properties
            searchTemplate={item => `${item.name}`}

            // Currently a noop, but you can fire an event
            // as a side effect each time the input changes
            onChangeInput={event =>{
            }}

            // This controls what you see in the actual input
            // when an item is selected
            inputDisplayTemplate={selectedItem =>{
              if(_.isNil(selectedItem)){
                return undefined;
              }
              else{
                return `${selectedItem.name}`;
              }
            }}

            //This event fires every time there are state changes inside the Combobox
            onStateChange={({
                              highlightedIndex, inputValue, isOpen, selectedItem
                            }) =>{
              //Uncomment this, if you'd like to track the state changes in the console.
              /*
               console.log('highlightedIndex',highlightedIndex);
               console.log('inputValue',inputValue);
               console.log('isOpen',isOpen);
               console.log('selectedItem',selectedItem)
               */
            }}

            // This (very important) event fires everytime a new item in the combobox
            // Is selected
            onChange={(selectedItem) =>{
              let isEmpty = _.isNil(selectedItem) ? true : false;

              this.setState({
                isTouched: true,
                value    : selectedItem,
                listening: false
              });

              let isValidate = (isRequired) ? (!isEmpty) : true;

              this.props.setValidateFunc(this.props.index, isValidate);

              this.props.setValueFunc(this.props.index, {
                [this.props.dbColumnName]: (_.isNil(selectedItem)) ? null : selectedItem.id
              });

              if(_.isFunction(this.props._onChange)){
                let val = (_.isNil(selectedItem)) ? null : selectedItem.id

                let obj = {
                  source : this.props.dbColumnName,
                  val : val
                };

                this.props._onChange(obj);
              }
            }}
          />
        </div>
      </div>
    );
  }
}

