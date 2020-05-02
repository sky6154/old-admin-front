import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import DefaultFrame from "./containers/common/DefaultFrame";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Login from "./containers/Login";
import {NoAuthorization} from "./containers/NoAuthorization";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#7e57c2',
        },
        secondary: {
            main: '#b388ff',
        },
    },
    overrides: {
        // Name of the component ⚛️ / style sheet
        // MuiButton: {
        //   // Name of the rule
        //   root: {
        //     // Some CSS
        //     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        //     borderRadius: 3,
        //     border: 0,
        //     color: 'white',
        //     height: 48,
        //     padding: '0 30px',
        //     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        //   },
        // },
    },
    typography: {
        useNextVariants: true,
    }
});


class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Switch>
                    <Route exact path="/noAuth" component={NoAuthorization}/>
                    <Route exact path="/login" component={Login}/>
                    <Route path="/" component={DefaultFrame}/>
                </Switch>
            </MuiThemeProvider>
        );
    }
}

export default App;
