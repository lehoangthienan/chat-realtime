import React, { Component } from 'react'
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';
import {getListChats} from './actions/list_chat'
import './chat.css'
import {getHeaders} from '../../utils/common'
import {getAllChat} from '../../api/ChatAPI'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class Chat extends Component {

    constructor(props){
        super(props)

        this.props.getListChats()
        this.socket = null;
        this.state = {
            status: false,
            text: "",
            chatsData: [],
            seen: '',
        }

        getAllChat().then((res)=>{
            this.setState({chatsData: res})

            if(res){
                var dataTemp= [];
                res.map(m=>{
                    if(m.sender == localStorage.getItem('userID') && m.receiver == this.props.match.params.userID) dataTemp.push(m)
                    if(m.receiver == localStorage.getItem('userID') && m.sender == this.props.match.params.userID) dataTemp.push(m)
                })
                if(dataTemp[0]){
                    if(dataTemp[dataTemp.length-1].isSeen && dataTemp[dataTemp.length-1].sender == localStorage.getItem('userID')) {this.setState({seen: 'SEEN'})}
                    else {this.setState({seen: ''})}
                }
            }
        })
    }

    onFocus = () => {
            let token = localStorage.getItem('userToken')
            this.socket = io("localhost:3000/chat", {"query":{"token":token}});
            getAllChat().then((res)=>{
                this.setState({chatsData: res})
                let dataTemp = this.state.chatsData

                var lastIDChat;
                dataTemp.map(m=>{
                    if(m.sender == this.props.match.params.userID && m.receiver == localStorage.getItem('userID')) lastIDChat = m._id
                })

                if(lastIDChat){
                    this.socket.emit("isSeen", {chat_id : lastIDChat});
                }
                console.log("asdasd", lastIDChat)
            })
    }

    onChange(e) {
        this.setState({text: e.target.value});

      }
    
    onSubmit(e) {
        if(this.state.text){
            this.socket.emit("newMessage", {content : this.state.text, receiver: this.props.match.params.userID});
            var chat = {sender:localStorage.getItem('userID'), receiver:this.props.match.params.userID, content:this.state.text, _created:Date.now()};
            this.state.chatsData.push(chat)
            this.setState({text: "", seen: ""});
        }
      }

    componentWillMount() {
        let token = localStorage.getItem('userToken')
        this.socket = io("localhost:3000/chat", {"query":{"token":token}});
        this.socket.on('newMessage', (response) => {
            this.setState({chatsData: response})
        }); //hear newMessage
        this.socket.on('isSeen', (response) => {
            console.log("sda",response)
            var dataTemp= [];
            response.map(m=>{
                if(m.sender ==localStorage.getItem('userID') && m.receiver == this.props.match.params.userID) dataTemp.push(m)
                if(m.receiver == localStorage.getItem('userID') && m.sender == this.props.match.params.userID) dataTemp.push(m)
            })
            if(dataTemp[0]){
                if(dataTemp[dataTemp.length-1].isSeen && dataTemp[dataTemp.length-1].sender ==localStorage.getItem('userID')) {this.setState({seen: 'SEEN'})}
                else {this.setState({seen: ''})}
            }
        }); //isSeen
    }

    render() {
        const { classes,  chatData } = this.props;
        return (
            <div className={classes.root}>
            <ul className="Messages-list">
                {   
                    this.state.chatsData.map(m => {
                    if(m.receiver == this.props.match.params.userID || m.sender == this.props.match.params.userID) {return this.renderMessage(m.sender, m.content, m._created)}
                })}
            </ul>
            <div className="username" style={{marginLeft: 1100}}>
                {this.state.seen}
              </div>
                <div className="Input">
                    <form onSubmit={e => this.onSubmit(e)}>
                    <input
                        onFocus={ this.onFocus } 
                        onChange={e => this.onChange(e)}
                        value={this.state.text}
                        type="text"
                        placeholder="Enter your message and press ENTER"
                        autofocus="true"
                    />
                    <button>Send</button>
                    </form>
                </div>
            </div>
        )
    }
    renderMessage(userID, content, _created) {
        const messageFromMe = userID === localStorage.getItem('userID');
        const className = messageFromMe ?
        "Messages-message currentMember" : "Messages-message";
        return (
          <li className={className}>
          <span
            className="avatar"
            style={{backgroundColor: "#189eff"}}
          />
            <div className="Message-content">
              <div className="username">
                {_created}
              </div>
              <div className="text">{content}</div>
            </div>
          </li>
        );
      }
}

const mapStateToProps = (state) => ({
    chatData: state.chatData
})

const mapDispatchToProps = dispatch => ({
    getListChats: ()=>dispatch(getListChats()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat))