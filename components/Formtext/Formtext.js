import React, {Component} from 'react';
import {Button, Form, Input, Item, Label, Text, View} from "native-base";
import {StyleSheet} from "react-native";

class Formtext extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputTask: ""
        }
    }
    onChangeinputTask = (e) => {
        this.setState({
            inputTask: e
        })
    }
    OnclickButton = () =>{
        this.props.addnewTask(this.state.inputTask);
        this.setState({
            inputTask: ""
        })
    }
    render() {
        const styles = StyleSheet.create({
            addtask: {
                flexDirection: 'row',
                alignItems:'flex-end',
                justifyContent:'flex-end',
                marginTop: 10,
                marginRight:14
            }
        })
        return (
            <Form>
                <Item stackedLabel>
                    <Label>Add a new Task</Label>
                    <Input value={this.state.inputTask} onChangeText={this.onChangeinputTask} />
                </Item>
                <View style={styles.addtask}>
                    <Button onPress={this.OnclickButton} rounded>
                        <Text>Add task</Text>
                    </Button>
                </View>
            </Form>
        );
    }
}

export default Formtext;
