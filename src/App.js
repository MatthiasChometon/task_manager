import React, { Component } from 'react';
import Navbar from "./components/navbar/Navbar";
import FormTask from "./components/formTask/FormTask";
import Footer from "./components/footer/Footer";
import Container from 'react-bootstrap/Container';
import TaskManager from "./components/tasksManager/TaskManager";
import "./App.css"
import axios from 'axios';
axios.defaults.baseURL = 'https://6091661250c25500176781bb.mockapi.io';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
    this.getAllTasks()
  }
  getAllTasks() {
    axios.get(`/TASK`)
      .then(res => {
        const tasks = res.data.reverse();
        tasks.forEach(task => {
          this.state.tasks.push(task)
        });
        this.setState({
          tasks: this.sortByDate(this.state.tasks)
        });
      })
  }
  addTask = (new_task) => {
    this.state.tasks.push(new_task)
    this.setState({
      tasks: this.sortByDate(this.state.tasks)
    });
  }
  updateTask = (task_changed) => {
    axios.put(`/TASK/` + task_changed.id, { isComplete: task_changed.isComplete, description: task_changed.description })
      .then(res => {
        const task_updated = res.data
        for (let i = 0; i < this.state.tasks.length; i++) {
          if (task_updated.id === this.state.tasks[i].id) {
            this.setState({
              tasks: this.sortByDate(this.state.tasks, {1:  {$set: 'updated field name'}})
            });
          }
        }
      })
  }
  deleteTasks = () => {
    let new_tasks = []
    this.state.tasks.forEach(task => {
      if (task.isComplete === true) {
        axios.delete(`/TASK/` + task.id).then(res => {
          new_tasks = this.state.tasks.filter(value => value.id !== task.id);
          this.setState({
            tasks: this.sortByDate(new_tasks)
          });
        })
      }
    });
  }
  sortByDate(tasks) {
    return tasks.sort(function (a, b) {
      return b.createdAt - a.createdAt;
    });
  }
  render() {
    return (
      <div>
        <Navbar />
        <Container className="mt-5 mb-5">
          <div>
            <FormTask onCreatedTask={this.addTask} />
            <div className="taskManager_container">
              <TaskManager tasks={this.state.tasks} onUpdateTask={this.updateTask} taskState="false" />
              <TaskManager tasks={this.state.tasks} onUpdateTask={this.updateTask} onDeleteTasks={this.deleteTasks} taskState="true" />
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    )
  }
}
export default App;
