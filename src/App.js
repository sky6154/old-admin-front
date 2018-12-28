import React, {Component}                   from 'react';
import DefaultFrame                                from "./containers/common/DefaultFrame";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
  typography: {
    useNextVariants: true,
  }
});


class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <DefaultFrame />
      </MuiThemeProvider>
    );
  }
}

export default App;
