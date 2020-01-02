import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
      return (
      <div>
      <button type="button" onClick={this.onClick}>See you </button>
      </div>
      );
  }

  onClick(ev) {
    /*
      console.log("Sending a GET API Call !!!");
      axios.get('http://127.0.0.1:8000/products').then(response => {
        console.log(response.json())
      }).then(response => {
        console.log(JSON.stringify(response))
      })
    */
   console.log('hui')
  }

}

export default App;
