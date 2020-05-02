import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import * as _ from "lodash";

class DialogAlert extends React.Component {
    render() {
        const message = (_.isNil(this.props.message)) ? "" : this.props.message;

        const actions = [
            <Button
                label="Cancel"
                primary={true}
                onClick={this.props.handleDeleteAlertClose}
            />,
            <Button
                label="OK"
                primary={true}
                onClick={this.props.handleDeleteAlertExecAndClose}
            />,
        ];

        return (
            <div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.props.isAlertOpen}
                    onRequestClose={this.props.handleDeleteAlertClose}
                    style={
                        {
                            zIndex: 9999
                        }
                    }
                >
                    {message}
                </Dialog>
            </div>
        );
    }

}

export default DialogAlert;