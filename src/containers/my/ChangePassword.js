import React        from 'react';
import {connect}    from "react-redux";
import {withRouter} from "react-router";
import { withStyles } from '@material-ui/core/styles';

import {permissionCheck, Role} from "../../config/Role";
import {changePasswordTrigger} from "../../redux/actions/my";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: "center"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
    },
    button: {
        margin: theme.spacing(1),
    },
});

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password : '',
            confirmPassword : ''
        };

        let requiredRoles = [Role.ROLE_ADMIN, Role.ROLE_BLOG, Role.ROLE_ETC];

        permissionCheck(requiredRoles, this.props.history);
    }

    handlePassword = prop => event => {
        this.setState({
            [prop] : event.target.value
        });
    };

    submit = () => {
        let req = {
          password : this.state.password
        };

        this.props.changePasswordTrigger(req);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isChangePasswordRequest && this.props.isSuccess){
            this.setState({
                password : '',
                confirmPassword: ''
            });
        }
    }

    render() {
        const {classes} = this.props;
        let helperText = null;

        if(this.state.password !== this.state.confirmPassword){
            helperText = "패스워드가 일치하지 않습니다.";
        }

        return (
            <div>
                <FormControl fullWidth className={classes.container} noValidate autoComplete="off">
                    <TextField
                        label="New Password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        onChange={this.handlePassword('password')}
                        value={this.state.password}
                    />
                    <TextField
                        label="Confirm Password"
                        error={this.state.password !== this.state.confirmPassword}
                        className={classes.textField}
                        type="password"
                        helperText={helperText}
                        margin="normal"
                        onChange={this.handlePassword('confirmPassword')}
                        value={this.state.confirmPassword}
                    />
                    <Button variant="contained" color="primary" className={classes.button}
                            disabled={this.state.password !== this.state.confirmPassword || this.state.password === ''}
                            onClick={this.submit}
                    >
                        저장
                    </Button>
                </FormControl>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        isChangePasswordRequest: state.my.isChangePasswordRequest,
        isSuccess : state.my.isSuccess
    };
}

export default withRouter(connect(mapStateToProps, {
    changePasswordTrigger
})(withStyles(styles)(ChangePassword)));