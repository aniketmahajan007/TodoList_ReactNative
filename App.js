import React, { Component } from 'react';
import {Container, Content, Root, Text, Toast, View} from 'native-base';
import NavHeader from "./components/NavHeader/NavHeader";
import * as Font from 'expo-font';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {Alert} from "react-native";
import Formtext from "./components/Formtext/Formtext";
import TodoList from "./components/TodoList/TodoList";
import uuid from 'react-uuid';
import topmargin from "./components/appstyle";
import * as SQLite from 'expo-sqlite';

export default class ButtonThemeExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            todolist:[],
            showToast: false
        };
        global.db = SQLite.openDatabase("todo2");
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS todo (key text PRIMARY KEY, task TEXT, status INT)'
            )
        });
        db.transaction(tx => {
            tx.executeSql("select task,key,status from todo", [], (_, { rows }) => {
                const list = [];
                rows["_array"].forEach((todo)=>{
                    if(todo.status){
                        todo.status = true;
                    }else{
                        todo.status = false;
                    }
                    list.push(todo);
                })
                this.setState({
                        todolist: list
                    });
                }
            );
        });
    }
    AddnewTask = (task) =>{
        if(task.trim() === ""){
            Toast.show({
                text: "Task cannot be empty.",
                duration: 3000
            });
            return;
        }
        const key = uuid()
        const taskobj = {
            task: task,
            key: key,
            status: false
        }
        const newlist = this.state.todolist;
        newlist.push(taskobj);
        this.setState({
            todolist: newlist
        });
        db.transaction(tx => {
            tx.executeSql("insert into todo (task, key, status) values (?,?,0)", [task,key]);
        });
    }
    UpdateTask = (status, taskid) => {
        const updatelist = [];
        this.state.todolist.forEach((task)=>{
            if(task.key === taskid){
                task.status = !task.status;
                const st = task.status ? 1 : 0;
                db.transaction(tx => {
                    tx.executeSql("update todo set status=? WHERE key=?", [st, task.key]);
                });
            }
            updatelist.push(task);
        })
        this.setState({
            todolist: updatelist
        });
    }
    clearAll = () => {
        Alert.alert(
            "Clear All Task",
            "Are you sure you want to clear all task?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Ok",
                    onPress: this.ClearAllAction,
                    style: "ok",
                },
            ],
            {
                cancelable: true
            }
        );
    }
    ClearAllAction = () => {
        this.setState({
            todolist: []
        });
        Toast.show({
            text: "All task removed.",
            duration: 3000
        });
        db.transaction(tx => {
            tx.executeSql("DELETE FROM todo", []);
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
                    <View style={topmargin.icon_delete} >
                        <AntDesign onPress={this.clearAll} name="delete" size={24} color="black" />
                    </View>
                    <TodoList update_task={this.UpdateTask} list_data={this.state.todolist} />
                </Content>
            </Container>
        </Root>
    );
  }
}
