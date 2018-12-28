import React           from "react";
import {Route, Switch} from "react-router-dom";
import Main            from "./containers/Main";
import DocumentManage  from "./containers/DocumentManage";

class Routing extends React.Component {
  render(){
    return (
      <Switch>
            {/*<Route path="/noAuth" component={NoAuthorization} />*/}
        <Route exact path="/" component={Main} />
        {/*<Route exact path="/document" component={DocumentManage} />*/}
      </Switch>
    );
  }
}

export default Routing;
