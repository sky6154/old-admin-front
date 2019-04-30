import React                   from 'react';
import MyEditor                from "../../components/Editor";
import {permissionCheck, Role} from "../../config/Role";

class PostManage extends React.Component {
    constructor(props) {
        super(props);

        let requiredRoles = [Role.ROLE_ADMIN, Role.ROLE_BLOG];

        permissionCheck(requiredRoles, this.props.history);
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