import React, { Component } from 'react';
import './App.css';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {name:"no-name"}
  }
}

class AI extends Component {
  constructor(props) {
    super(props);
  }

  Reply(message) {
    return("Wow! " + String(message) + "?")
  }
}

function Title(props){
  return (
    <div>
      <div className="header">
        <div className="title">
          <h1>Chatty The Chatbox</h1>
        </div>

        <div className="credits">
          A project by Raghava Pamula
        </div>
      </div>
        {props.content}
    </div>
  )
}

const INTERVAL = 50;

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.user = new User();
    this.ai = new AI();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {lastMessager: this.ai,messages:[],by:[],
      color:"Green",hidden:"hidden",elapsed:0};
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(),INTERVAL);
  }

  tick() {
    this.setState({elapsed: this.state.elapsed + INTERVAL/1000});
    if(this.state.elapsed >=1.25 ) {
      this.setState({hidden:"hidden"});
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value, hidden:"notHidden"});
    this.setState({elapsed:0});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({lastMessager: this.user});
    var newMessages = this.state.messages.slice();
    var value = this.state.value;
    newMessages.push(value);
    var newBy = this.state.by.slice();
    newBy.push("user")
    this.AiResponse(value);
    this.setState({value: ""});
    this.setState({hidden: "hidden"});
    document.getElementById('input').reset();
  }

  AiResponse(value) {
    var newMessages = this.state.messages.slice();
    var newBy = this.state.by.slice();
    var reply = this.ai.Reply(value);
    newMessages.push(value);
    newBy.push("User")
    this.setState({messages:newMessages, by:newBy});
    newMessages.push(reply);
    newBy.push("AI")
    this.setState({messages:newMessages, by:newBy});
  }

  render() {
    var messages = [];
    var Spinner = require('react-spinkit');
    for(var i=0; i<this.state.messages.length; i++) {
      if(this.state.by[i]==="User") {
        var className = "row-right talk-bubble tri-right round border right-top";
      }
      else if(this.state.by[i]==="AI") {
        var className = "row-left talk-bubble tri-left round border left-top";
      }
    messages.push(<div className={className}>{this.state.messages[i]}</div>);
    }
    return (
      <Title content={
      <div className="center-box">
        <div className="column">
          {messages}
        </div>
      <form className="submit-box" id="input" onSubmit={this.handleSubmit}>
      <div className="link">
        <label>
          <input type="text" placeholder="Type Something..." onChange={this.handleChange} />
            <center><div className={this.state.hidden}>
              <div className="left">
                <Spinner name='line-scale' />
              </div>
              <div className="right">
                <p></p>
              </div>
            </div>
          </center>
        </label>
      </div>
      </form>
      </div>
    } />
    );
  }
}

export default MessageBox;
