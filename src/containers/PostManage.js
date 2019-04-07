import React from 'react';
import MyEditor from "../components/Editor";
import {isPermitted, Role} from "../config/Role";
import {getRole} from "../config/session";

class PostManage extends React.Component {
    constructor(props) {
        super(props);

        let requiredRoles = [Role.ROLE_ADMIN, Role.ROLE_BLOG];
        let myRoles = getRole();

        if(!isPermitted(myRoles, requiredRoles)){
            this.props.history.push("/login");
        }
    }


    render() {
        return (
            <div>
                <MyEditor/>
            </div>
        );
    }
}


export default PostManage;