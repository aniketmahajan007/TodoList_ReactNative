import React, { Component } from 'react';
import {Container, Content, Root, Text, Toast} from 'native-base';
import NavHeader from "./components/NavHeader/NavHeader";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {StyleSheet} from "react-native";
import Formtext from "./components/Formtext/Formtext";
import TodoList from "./components/TodoList/TodoList";
import uuid from 'react-uuid';

export default class ButtonThemeExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            todolist:[],
            showToast: false
        };
    }
    AddnewTask = (task) =>{
        if(task.trim() === ""){
            Toast.show({
                text: "Task cannot be empty.",
                duration: 3000
            });
            return;
        }
        const taskobj = {
            task: task,
            key: uuid(),
            status: false
        }
        const newlist = this.state.todolist;
        newlist.push(taskobj);
        this.setState({
            todolist: newlist
        });
    }
    UpdateTask = (status, taskid) => {
        const updatelist = [];
        this.state.todolist.forEach((task)=>{
            if(task.key === taskid){
                task.status = !task.status;
            }
            updatelist.push(task);
        })
        this.setState({
            todolist: updatelist
        });
    }
    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        }).then(()=>{
            this.setState({ isReady: true });
        })
    }
  render() {
      const topmargin = StyleSheet.create({
          topping: {
              marginTop: 10,
          },
          padding6: {
              padding: 6,
              backgroundColor: "#f9f9fa"
          },
          leftmar: {
              marginLeft:14,
              marginTop: 30,
              fontStyle: "italic",
              fontWeight: "bold",
              fontSize:18
          }
      })
        if (!this.state.isReady) {
          return <Container><Content style={topmargin.leftmar}><Text>Loading</Text></Content></Container>;
      }
    return (
        <Root>
            <Container>
                <NavHeader />
                <Content style={topmargin.padding6}>
                    <Formtext addnewTask={this.AddnewTask} />
                    <Text style={topmargin.leftmar}>
                        Awesome To do list:
                    </Text>
                    <TodoList update_task={this.UpdateTask} list_data={this.state.todolist} />
                </Content>
            </Container>
        </Root>
    );
  }
}
