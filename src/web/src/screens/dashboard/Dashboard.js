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
import ListUser from '../list_users/ListUser';
import CreateUser from '../create_user/CreateUser';


import {getListUsers} from '../list_users/actions/list_user'

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

        this.onClickSignout = this.onClickSignout.bind(this);

        this.props.getListUsers();
    }

    componentDidMount(){

    }

    onClickSignout(){
        signout()
        window.location.reload()
    }


    render() {
        const { classes, userData } = this.props;

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
                        subheader={<ListSubheader component="div">Users</ListSubheader>}
                    >
                        <ListItem button onClick={()=>this.props.history.push('/app/users')}>
                            <ListItemText primary="Users" />
                        </ListItem>
                        <ListItem button onClick={()=>this.props.history.push('/app/users/create')}>
                            <ListItemText primary="Add a user" />
                        </ListItem>
                    </List>
                <Divider />

                <div className={classes.toolbar} />
                    <List
                        component="nav"
                        subheader={<ListSubheader component="div">Chat With Friends</ListSubheader>}
                    >
                    {
                            userData.users.map((user, i)=>(
                                <ListItem button onClick={()=>this.props.history.push('/app/users')}>
                                    <ListItemText primary={user.full_name} />
                                </ListItem>
                            ))
                        }
                    </List>
                <Divider />
                        
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route exact path="/app" component={ListUser}/>
                        <Route exact path="/app/users" component={ListUser}/>
                        <Route exact path="/app/users/create" component={CreateUser} />
     
                    </Switch>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.userData
})

const mapDispatchToProps = dispatch => ({
    getListUsers: ()=>dispatch(getListUsers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))