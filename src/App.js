import React, { Component } from 'react';
import axios from 'axios';
import Me from './Me/Me';
import BubbleSort from './BubbleSort/BubbleSort';
import TicTocGame from './TicTocGame/TicTocGame';
import ToDo from './ToDo/ToDo'
import {Button, Nav, NavDropdown, Navbar} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDisplay: <Me />,
    }
  }
  clickBook() {
    window.open("http://book-review-by-j.herokuapp.com/")
  }
  clickMessageBoard() {
    window.open("https://message-board-jack.herokuapp.com/login")
  }
  clickMe() {
    this.setState({
      currentDisplay: <Me />
    })
  }
  clickToDo() {
    this.setState({
      currentDisplay: <ToDo />
    })
  }

  clickTicToc() {
      this.setState({
        currentDisplay: <TicTocGame />
      })
  }

  clickBubbleSort() {

    let randomIntegersGenerator = () => {
      /*Random integers generator
      generate 20 random integers, with value less than 100
      */
      const n = 20;
      const max = 100;
      let randomIntegers = Array(n).fill(null);
      for(let i = 0; i < n; i++) {
        let item = Math.floor(Math.random() * max);
        randomIntegers[i] = item;
      }
      return randomIntegers
    };

    let randomIntegers = randomIntegersGenerator();

    let size = [450, 450]

    this.setState({
      currentDisplay: <BubbleSort data={randomIntegers} size={size}/>
    })   
  }
  clickNBA = () => {

  }
  clickMyStore = () => {

  }

  render() {
      const element = this.state.currentDisplay;
      return (
        <div>
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand>Jack React</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link onClick={()=> this.clickMe()}>Me</Nav.Link>
                <NavDropdown title="Project" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => this.clickTicToc()}>TicToc</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{this.clickBubbleSort()}}>BubbleSort</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={()=>{this.clickBook()}}>Book</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{this.clickMessageBoard()}}>Message Board</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{this.clickToDo()}}>ToDo</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{this.clickNBA()}}>Get NBA(in progress)</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{this.clickMyStore()}}>MyStore(in progress)</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
        <div className="content">
          {element}
        </div>
      </div>
      </div>
      );
  }

}

export default App;
