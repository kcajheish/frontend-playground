import React, {Component} from "react";
import {Col, Row, Container, Image} from 'react-bootstrap';
import MyPicture from './personalPicture.jpg'

function Me(props) {

    return(
        <Container>
            <Row>
                <Col xs={{ span: 3, offset: 0.5 }} >
                    <Image src={MyPicture} style={{height: "300px", width: "240"}}roundedCircle />
                </Col>
                <Col xs={{ span: 6, offset: 0.5 }} style={{ marginTop: '100px', fontFamily: "STHeiti"}}>
                    <h1>你好，我是謝孟勳(Jack)</h1>
                    <p>
                        在這裡，你可以找到我個人的Project<br></br>
                        請點擊上方的Project按鈕查看更多        
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Me;