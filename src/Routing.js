import React           from "react";
import {Route, Switch} from "react-router-dom";
import Main            from "./containers/Main";
import PostWrite       from "./containers/post/PostWrite";
import PostManage      from "./containers/post/PostManage";
import AdminManage     from "./containers/admin/AdminManage";
import {withStyles}    from "@material-ui/core/styles/index";

const style = theme => ({
  contentRoot : {
    overflow: "auto",
    maxHeight: `calc(100% - ${64}px)`
  }
});

class Routing extends React.Component {
  render(){
    const { classes, theme } = this.props;

    return (
      <div className={classes.contentRoot}>
        {/*<DefaultFrame />*/}
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/post/PostWrite" component={PostWrite} />
          <Route exact path="/post/PostManage" component={PostManage} />
          <Route exact path="/admin/adminManage" component={AdminManage} />
        </Switch>
      </div>
    );
  }
}

export default withStyles(style)(Routing);
