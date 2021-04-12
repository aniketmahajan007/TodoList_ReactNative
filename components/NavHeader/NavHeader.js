import React, {Component} from 'react';
import {Body, Button, Container, Header, Icon, Left, Right, Title} from "native-base";

class NavHeader extends Component {
    render() {
        return (
            <Header>
                <Left/>
                <Body>
                    <Title>To-Do List</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}

export default NavHeader;
