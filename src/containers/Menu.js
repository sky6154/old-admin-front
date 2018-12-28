import React                                                                 from 'react';
import PropTypes from 'prop-types';
import {connect}                                                             from "react-redux";
import {withRouter}                                                          from "react-router";
import {Collapse, List, ListItem, ListItemIcon, ListItemText, ListSubheader} from "@material-ui/core/es/index";

import { withStyles } from '@material-ui/core/styles';

import FaceIcon from '@material-ui/icons/Face';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SettingsIcon from '@material-ui/icons/Settings';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Menu extends React.Component {
  goTo(url){
    this.props.history.push(url);
  }

  state = {
    isDocumentFoldOpen : false,
    isAdminFoldingOpen: false,
    isMyFoldingOpen : false
  };

  handleClick = target =>{
    switch(target){
      case "document":
        this.setState(state => ({isDocumentFoldOpen: !state.isDocumentFoldOpen}));
        break;
      case "admin":
        this.setState(state => ({isAdminFoldingOpen: !state.isAdminFoldingOpen}));
        break;
      case "my":
        this.setState(state => ({isMyFoldingOpen: !state.isMyFoldingOpen}));
        break;
      default:
        break;
    }
  };


  render(){
    const { classes } = this.props;

    return (
      <List
        component="nav"
        subheader={<ListSubheader component="div">Develobeer 관리 메뉴</ListSubheader>}
      >
        <ListItem button onClick={() => this.handleClick("document")}>
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText inset primary={"게시글 관리"} />
          {this.state.isDocumentFoldOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={this.state.isDocumentFoldOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button key={"게시글 관리"} className={classes.nested}>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText inset primary={"테스트"} onClick={() =>{
                this.goTo("/document");
              }} />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => this.handleClick("admin")}>
          <ListItemIcon><FaceIcon /></ListItemIcon>
          <ListItemText inset primary={"운영자 관리"} />
          {this.state.isAdminFoldingOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={this.state.isAdminFoldingOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon><FaceIcon /></ListItemIcon>
              <ListItemText inset primary={"운영자 관리"} onClick={() =>{
                this.goTo("/user");
              }} />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon><AccessTimeIcon /></ListItemIcon>
              <ListItemText inset primary={"운영자 로그"} onClick={() =>{
                this.goTo("/user");
              }} />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => this.handleClick("my")}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText inset primary={"MY"} />
          {this.state.isMyFoldingOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={this.state.isMyFoldingOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon><FingerprintIcon /></ListItemIcon>
              <ListItemText inset primary={"비밀번호 변경"} onClick={() =>{
                this.goTo("/user")
              }} />
            </ListItem>
          </List>
        </Collapse>
      </List>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state){
  return {};
}

export default withRouter(connect(mapStateToProps, {})(withStyles(styles)(Menu)));