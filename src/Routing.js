import React           from "react";
import {Route, Switch} from "react-router-dom";
import Main            from "./containers/Main";
import PostManage      from "./containers/PostManage";
import Login           from "./containers/Login";

class Routing extends React.Component {
  render(){
    return (
      <Switch>
            {/*<Route path="/noAuth" component={NoAuthorization} />*/}
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/post" component={PostManage} />
      </Switch>
    );
  }
}

export default Routing;
