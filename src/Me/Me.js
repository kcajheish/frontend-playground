import React, {Component} from "react";
import {Col, Row, Container, Image, Card } from 'react-bootstrap';
import MyPicture from './personalPicture.jpg'

function Me(props) {

    return(
        <div>

        <Container>
            <Row >
                <Col xs={9} md={4}>
                    <Image  src={MyPicture} style={{height: "200x", width: "160"}}  fluid roundedCircle />
                </Col>
                <Col xs={9} md={4} style={{ marginTop: '100px', fontFamily: "STHeiti"}}>
                        <h1>你好!我是Jack</h1>
                            在這裡，你可以找到我個人的Project<br></br>
                            請點擊上方的Project按鈕查看更多
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default Me;