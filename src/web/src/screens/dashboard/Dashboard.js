import React, { Component } from 'react'
import { connect } from "react-redux";
import { Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import {signout} from '../../api/UserAPI'

import Alert from '../../components/Alert'
import ListMember from '../list_members/ListMember';
import CreateMember from '../create_member/CreateMember';


let styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    appBarTitle: {
        flexGrow: 1,
    },
    appBarMenuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
})

class Dashboard extends Component {
    constructor(props){
        super(props)

        this.onClickSignout = this.onClickSignout.bind(this)
    }

    componentDidMount(){

    }

    onClickSignout(){
        signout()
        window.location.reload()
    }


    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu" className={classes.appBarMenuButton}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.appBarTitle}>
                            Chat Realtime
                        </Typography>
                        <Button color="inherit" onClick={this.onClickSignout}>Sign out</Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                >
                    <div className={classes.toolbar} />
                    <List
                        component="nav"
                        subheader={<ListSubheader component="div">Members</ListSubheader>}
                    >
                        <ListItem button onClick={()=>this.props.history.push('/app/members')}>
                            <ListItemText primary="Members" />
                        </ListItem>
                        <ListItem button onClick={()=>this.props.history.push('/app/members/create')}>
                            <ListItemText primary="Add a member" />
                        </ListItem>
                    </List>
                    <Divider />
                F
                        
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route exact path="/app" component={ListMember}/>
                        <Route exact path="/app/members" component={ListMember}/>
                        <Route exact path="/app/members/create" component={CreateMember} />
     
                    </Switch>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))