import React from "react";
import {Route, Switch}    from "react-router-dom";
import Main               from "./containers/Main";

class Routing extends React.Component {
  render(){
    return (
      <Switch>
            {/*<Route path="/noAuth" component={NoAuthorization} />*/}
        <Route exact path="/" component={Main} />
      </Switch>
    );
  }
}

export default Routing;
