import React from 'react';
import axios from 'axios';
import {Alert, Col, Row, Spinner} from 'react-bootstrap'

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: null,
            isDetail: null,
        }
        this.setPersons = this.setPersons.bind(this);
    }
    setPersons() {
        axios
            .get("/persons")
            .then(response => {
                this.setState({ 
                    persons: response.data,
                    isDetail: Array(response.data.length).fill(false),
                })
            })
            .catch(err => console.log(err));
    }
    componentDidMount() {
        this.setPersons();
    }

    clickDetail(person, i) {
        const isDetail = this.state.isDetail.slice();
        console.log(i)
        isDetail[i] = !isDetail[i];
        console.log(isDetail);
        this.setState({
            isDetail: isDetail
        })
    }

//{this.renderPersons()}
    render() { 
        
        if(!this.state.persons) {
            return (
                <Spinner animation="border" variant="primary" />
            );
        }
        const persons = this.state.persons.slice();
        const elements = persons.map((person, i) => {

            return(
                <Alert onClick={()=> this.clickDetail(person, i)} key={i} variant='dark'>
                    User No.{i+1} {person.username} {this.state.isDetail[i]? "is selected! click again to restore" : "Click Me!"}
                </Alert>
            )           


        });
        return(
            <div>
                <h1>ToDo Members</h1>
                <div className='users' style={{fontSize: "30px"}}>
                    <Col xs={{ span: 6 }}>
                        <ul>
                            {elements}
                        </ul>
                    </Col>
                </div>
            </div>
        )
    }
}

export default ToDo