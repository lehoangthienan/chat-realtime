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
import MenuIcon from '@material-ui/icons/Menu';
import {signout} from '../../api/UserAPI'
import ListUser from '../list_users/ListUser';
import Chat from '../chat/chat';


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
        const { classes, userData, chatData } = this.props;
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
                        subheader={<ListSubheader component="div">Chat With Friends</ListSubheader>}
                    >
                    {
                            userData.users.map((user, i)=>{
                                if(user._id != localStorage.getItem('userID')){
                                    return (<ListItem button onClick={()=>this.props.history.push({pathname: '/app/chat/'+user._id})}>
                                    <ListItemText primary={user.full_name} />
                                </ListItem>);
                                }
                            })
                    }
                    </List>
                <Divider />
                        
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route exact path="/app" component={ListUser}/>
                        <Route exact path="/app/chat/:userID" component={Chat}/>
                    </Switch>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.userData,
    chatData: state.chatData
})

const mapDispatchToProps = dispatch => ({
    getListUsers: ()=>dispatch(getListUsers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))