import React from 'react';
import Navbar from "./components/navbar/Navbar";
import FormTask from "./components/formTask/FormTask";
import Footer from "./components/footer/Footer";
import Container from 'react-bootstrap/Container';
import TaskManager from "./components/tasksManager/TaskManager";
import "./App.scss"
import axios from 'axios';
import Task from './models/TaskModel'
import Flash from './components/flash/Flash';
import flashType from './enumerations/FlashType';

axios.defaults.baseURL = 'https://6091661250c25500176781bb.mockapi.io';
interface IState {
  tasks: Task[];
  flash: {
    message: string,
    type: string,
    visibility: boolean
  }
}

class App extends React.Component<IState>  {
  readonly state = { flash: { message: "", type: "", visibility: false }, tasks: Array<Task>() };

  componentDidMount() {
    this.getAllTasks().then(res => {
      this.setState({
        tasks: this.sortByDate(this.state.tasks)
      });
    })
  }
  async getAllTasks(): Promise<Task[]> {
    await axios.get(`/TASK`)
      .then(res => {
        const tasks = res.data.reverse();
        tasks.forEach((task: Task) => {
          this.state.tasks.push(task)
        });
        return this.sortByDate(this.state.tasks)
      })
    return []
  }
  addTask = (newTask: Task) => {
    this.state.tasks.push(newTask)
    this.setState({
      tasks: this.sortByDate(this.state.tasks)
    });
  }
  updateTask = (taskChanged: Task) => {
    axios.put(`/TASK/` + taskChanged.id, { isComplete: taskChanged.isComplete, description: taskChanged.description })
      .then(res => {
        const taskUpdated = res.data
        for (let i = 0; i < this.state.tasks.length; i++) {
          if (taskUpdated.id === this.state.tasks[i].id) {
            let tasks = [...this.state.tasks];
            tasks[i] = taskUpdated;
            this.setState({
              tasks: this.sortByDate(tasks)
            })
          }
        }
      })
  }
  deleteTasks = () => {
    let newTasks = []
    this.state.tasks.forEach(task => {
      if (task.isComplete === true) {
        axios.delete(`/TASK/` + task.id).then(res => {
          newTasks = this.state.tasks.filter(value => value.id !== task.id);
          this.setState({
            tasks: this.sortByDate(newTasks)
          });
          this.sendFlashMessage(`task successfully deleted`, flashType.success);
        }).catch(err => {
          this.sendFlashMessage(err.response.data, flashType.warning);
        })
      }
    });
  }
  sortByDate(tasks: Task[]) {
    return tasks.sort(function (a: Task, b: Task) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  sendFlashMessage(message: string, type: string) {
    this.setState(() => ({
      flash: {
        visibility: true,
        message: message,
        type: type
      }
    }))
  }

  hideFlashMessage() {
    this.setState(prevState => ({
      flash: {
        ...prevState,
        visibility: false
      }
    }))
  }

  render() {
    return (
      <div>
        <Navbar />
        <Container className="mt-5 mb-5">
          <Flash message={this.state.flash.message} type={this.state.flash.type} visibility={this.state.flash.visibility} hideFlash={() => this.hideFlashMessage()} />
          <div className="tasks_managers_container">
            <FormTask onCreatedTask={this.addTask} />
            <div className="tasks_managers">
              <TaskManager tasks={this.state.tasks} onUpdateTask={this.updateTask} onDeleteTasks={this.deleteTasks} taskState="false" />
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
