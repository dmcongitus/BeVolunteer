import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';

const mapType2Text = {
    0: "Tất cả",
    1: 'Sắp diễn ra',
    2: 'Đang diễn ra',
    3: 'Đã kết thúc'
};

class MoreVerticalButtonEvents extends Component {
    state = {
        open: false,
        selection: 0
    };
    
    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    }

    handleClose0 = (event) => {
        if (!this.anchorEl.contains(event.target)) {
            this.setState({ open: false, selection: 0 });
            this.props.onStatusEventChanged(0);
        }
    };

    handleClose1 = (event) => {
        if (!this.anchorEl.contains(event.target)) {
            this.setState({ open: false, selection: 1 });
            this.props.onStatusEventChanged(1);
        }
    };

    handleClose3 = (event) => {
        if (!this.anchorEl.contains(event.target)) {
            this.setState({ open: false, selection: 3 });
            this.props.onStatusEventChanged(3);
        }
    };

    handleClose4 = (event) => {
        if (!this.anchorEl.contains(event.target)) {
            this.setState({ open: false, selection: 4 });
            this.props.onStatusEventChanged(4);
        }
    };

    handleClose2 = (event) => {
        if (!this.anchorEl.contains(event.target)) {
            this.setState({ open: false, selection: 2 });
            this.props.onStatusEventChanged(2);
        }
    };

    render() {
    const { open } = this.state;
        return (
            <div>
                <Button buttonRef={node => {this.anchorEl = node; }}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}>
                    {mapType2Text[this.state.selection]}
                </Button>

                <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}  >
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList>
                                        <MenuItem onClick={this.handleClose0}>Tất cả</MenuItem>
                                        <MenuItem onClick={this.handleClose1}>Sắp diễn ra</MenuItem>
                                        <MenuItem onClick={this.handleClose2}>Đang diễn ra</MenuItem>
                                        <MenuItem onClick={this.handleClose3}>Đã kết thúc</MenuItem>                                        
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing.unit * 2,
    },
});

export default withStyles(styles)(MoreVerticalButtonEvents);

