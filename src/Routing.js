import React           from "react";
import {Route, Switch} from "react-router-dom";
import Main            from "./containers/Main";
import PostManage      from "./containers/PostManage";

class Routing extends React.Component {
  render(){
    return (
      <div>
        {/*<DefaultFrame />*/}
        <Switch>
          {/*<Route path="/noAuth" component={NoAuthorization} />*/}
          <Route exact path="/" component={Main} />
          <Route path="/post" component={PostManage} />
        </Switch>
      </div>
    );
  }
}

export default Routing;
