import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import {loginTrigger} from "../redux/actions/account";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Alert from 'react-s-alert';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3*2))]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin : false,
            id      : '',
            password: ''
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.isLogin !== prevState.isLogin){
            return {
                isLogin : nextProps.isLogin
            }
        }

        return null;
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.isLogin){
            this.props.history.replace("/");

            return false;
        }

        return true;
    }

    componentWillUnmount(){
        this.setState({
            isLogin : false,
            id      : '',
            password: ''
        });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleLogin = () => {
        let req = {
            username: this.state.id,
            password: this.state.password
        };

        this.props.loginTrigger(req);
    };

    handleKeyPress (e) {
        if (e.key === 'Enter') {
            this.handleLogin();
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">ID</InputLabel>
                            <Input id="email" name="email" autoComplete="id" autoFocus
                                   onChange={this.handleChange('id')}
                                   onKeyPress={this.handleKeyPress}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password"
                                   onChange={this.handleChange('password')}
                                   onKeyPress={this.handleKeyPress}
                            />
                        </FormControl>
                        {/*<FormControlLabel*/}
                        {/*control={<Checkbox value="remember" color="primary" />}*/}
                        {/*label="Remember me"*/}
                        {/*/>*/}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleLogin}
                        >
                            Sign in
                        </Button>
                    </form>
                </Paper>
                <Alert stack={{limit: 3}} />
            </main>
        );
    }
}

Login.defaultProps = {
    isLoginRequesting: false,
    isLogin: false,
    isLogoutRequesting: false,
    isAuthCheckRequesting: false
};

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    isLoginRequesting: PropTypes.bool.isRequired,
    isLogin: PropTypes.bool.isRequired,
    isLogoutRequesting: PropTypes.bool.isRequired,
    isAuthCheckRequesting: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isLoginRequesting: state.account.isLoginRequesting,
        isLogin: state.account.isLogin,
        isLogoutRequesting: state.account.isLogoutRequesting,
        isAuthCheckRequesting: state.account.isAuthCheckRequesting
    };
}

export default withRouter(connect(mapStateToProps, {
    loginTrigger
})(withStyles(styles, {withTheme: true})(Login)));