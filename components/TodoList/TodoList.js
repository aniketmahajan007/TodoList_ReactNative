import React, {Component} from 'react';
import {Body, Card, CardItem, CheckBox, Text} from "native-base";
import {StyleSheet} from "react-native";


class TodoList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const styling = StyleSheet.create({
            texts: {
                marginLeft: 14,
                marginTop:30
            },
            taskposition: {
                marginLeft: 20
            }
        })
        return (
            this.props.list_data.length < 1 ?
                <Text style={styling.texts}>No tasked added yet.....</Text> :
            this.props.list_data.map((data) => (
                <Card key={data.key}>
                    <CardItem>
                        <CheckBox onPress={()=>{this.props.update_task(data.status,data.key)}} checked={data.status} />
                        <Body style={styling.taskposition}>
                            <Text>{data.task}</Text>
                        </Body>
                    </CardItem>
                </Card>
            ))
        );
    }
}

export default TodoList;
