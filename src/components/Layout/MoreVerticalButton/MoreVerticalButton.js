import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { withLocalize, Translate } from "react-localize-redux";
import moreVerticalButtonTranslations from './translation.json';
import { withRouter } from "react-router";


class MoreVerticalButton extends Component {
    constructor(props) {
        super(props);
        this.props.addTranslation(moreVerticalButtonTranslations);
    }

    state = {
        open: false,
        selection: "EVENT"
    };
    
    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    }

    handleClose0 = (event) => {
        if (!this.anchorEl.contains(event.target)) {
            this.setState({ open: false, selection: "ALL" });
            this.props.onPostTypeChanged("ALL");
        }
    };

    handleClose1 = (event) => {
        if (!this.anchorEl.contains(event.target)) {
            this.setState({ open: false, selection: "PLACE" });
            this.props.onPostTypeChanged("PLACE");
        }
    };

    handleClose2 = (event) => {
        if (!this.anchorEl.contains(event.target)) {
            this.setState({ open: false, selection: "EVENT" });
            this.props.onPostTypeChanged("EVENT");
        }
    };

    handleClose3 = (event) => {
        if (!this.anchorEl.contains(event.target)) {
            this.setState({ open: false, selection: "PERSONAL_ACTIVITY" });
            this.props.onPostTypeChanged("PERSONAL_ACTIVITY");
        }
    };


    render() {
    const { open } = this.state;
        return (
            <div> 
                <Button buttonRef={node => {this.anchorEl = node; }}
                
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                    className = "p-2">
                    <i className="fas fa-filter"></i>
                    <Translate id="moreVerticalBut.type">Loại</Translate>
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
                                        <MenuItem onClick={this.handleClose0}><Translate id="moreVerticalBut.all">Tất cả</Translate></MenuItem>
                                        <MenuItem onClick={this.handleClose1}><Translate id="moreVerticalBut.address">Địa điểm</Translate></MenuItem>
                                        <MenuItem onClick={this.handleClose2}><Translate id="moreVerticalBut.event">Sự kiện</Translate></MenuItem>
                                        <MenuItem onClick={this.handleClose3}><Translate id="moreVerticalBut.memory">Kỉ niệm</Translate></MenuItem>                                       
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

// export default withStyles(styles)(MoreVerticalButton);

export default withRouter(
    withStyles(styles)(withLocalize(MoreVerticalButton))
);

