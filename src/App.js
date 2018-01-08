import React, { Component } from 'react';
import './App.css';
var uuid = require('uuid');
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyBi9qMs5wwookeGkXmcxbt7XlrA_3MQ9ss",
  authDomain: "simplesurvey-184db.firebaseapp.com",
  databaseURL: "https://simplesurvey-184db.firebaseio.com",
  projectId: "simplesurvey-184db",
  storageBucket: "simplesurvey-184db.appspot.com",
  messagingSenderId: "446917398117"
};
firebase.initializeApp(config);

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      id : uuid.v1(),
      name : '',
      answers: {
        q1:'',
        q2:'',
        q3:'',
        q4:''

      },
      submitted: false
    }
      this.handleQuestionChange = this.handleQuestionChange.bind(this);
    
  }

  handlebarSubmit(event){
    var name = this.refs.name.value;
    this.setState({name:name},function(){
      console.log(this.state);
    });
    event.preventDefault();
  }
  
  handleQuestionSubmit(event){
  firebase.database().ref('surverys/'+this.state.id).set({
    name: this.state.name,
    answers: this.state.answers
  });

  this.setState({submitted:true},function(){
    console.log('Questions Submitted');
  });

    event.preventDefault();
  }

  handleQuestionChange(event){
    //console.log(event.target.value);
    var answers = this.state.answers;
    if(event.target.name === 'q1'){
      answers.q1 = event.target.value;
    } else if(event.target.name === 'q2'){
      answers.q2 = event.target.value;
    } else if(event.target.name === 'q3'){
      answers.q3 = event.target.value;
    } else if(event.target.name === 'q4'){
      answers.q4 = event.target.value;
    }

    this.setState({answers:answers},function(){
      console.log(this.state);
    });
  }

  render() {

    var user;
    var questions;
    if(this.state.name && this.state.submitted === false){
      user = <h2>Welcome {this.state.name}</h2>
      questions = 
      <span>
        <h3>Survey Questions</h3>
        <form onSubmit={this.handleQuestionSubmit.bind(this)}>
        <div>
          <label>What is your fav operating system?</label><br/>
          <input type="radio" value="Windows" name="q1" onChange={this.handleQuestionChange} />Windows <br/>
          <input type="radio" value="OSX" name="q1" onChange={this.handleQuestionChange} />OSX <br/>
          <input type="radio" value="Linux" name="q1" onChange={this.handleQuestionChange} />Linux <br/>
          <input type="radio" value="Ubuntu" name="q1" onChange={this.handleQuestionChange} />Ubuntu <br/>
        </div>

        <div>
          <label>What is your fav operating system?</label><br/>
          <input type="radio" value="Windows" name="q2" onChange={this.handleQuestionChange} />Windows <br/>
          <input type="radio" value="OSX" name="q2" onChange={this.handleQuestionChange} />OSX <br/>
          <input type="radio" value="Linux" name="q2" onChange={this.handleQuestionChange} />Linux <br/>
          <input type="radio" value="Ubuntu" name="q2" onChange={this.handleQuestionChange} />Ubuntu <br/>
        </div>

        <div>
          <label>What is your fav operating system?</label><br/>
          <input type="radio" value="Windows" name="q3" onChange={this.handleQuestionChange} />Windows <br/>
          <input type="radio" value="OSX" name="q3" onChange={this.handleQuestionChange} />OSX <br/>
          <input type="radio" value="Linux" name="q3" onChange={this.handleQuestionChange} />Linux <br/>
          <input type="radio" value="Ubuntu" name="q3" onChange={this.handleQuestionChange} />Ubuntu <br/>
        </div>

        <div>
          <label>What is your fav operating system?</label><br/>
          <input type="radio" value="Windows" name="q4" onChange={this.handleQuestionChange} />Windows <br/>
          <input type="radio" value="OSX" name="q4" onChange={this.handleQuestionChange} />OSX <br/>
          <input type="radio" value="Linux" name="q4" onChange={this.handleQuestionChange} />Linux <br/>
          <input type="radio" value="Ubuntu" name="q4" onChange={this.handleQuestionChange} />Ubuntu <br/>
        </div>
        <input type="submit" value="Submit" />
        </form>
      </span>

    } else if(!this.state.name && this.state.submitted === false){
      user =
      <span>
        <h2>Please enter your name to begin the survery</h2>
        <form onSubmit={this.handlebarSubmit.bind(this)}>
          <input type="text" placeholder="Enter your Name .." ref="name" />
        </form>
      </span>;
      questions = '';

    } else if(this.state.name && this.state.submitted === true){
      user = <h2>Thank you {this.state.name}</h2>
    }

    return (
      <div className="App">
        <header className="App-header text-center">
          <h1 className="App-title">Simple Survey</h1>
        </header>
        <div className="text-center">
        {user}
        </div>
        <div className="container">
        {questions}
        </div>
      </div>
    );
  }
}

export default App;
