import React from 'react';
import Navbar from "./components/navbar/Navbar";
import FormTask from "./components/formTask/FormTask";
import Footer from "./components/footer/Footer";
import Container from 'react-bootstrap/Container';
import TaskManager from "./components/tasksManager/TaskManager";
import "./App.scss"
import axios, { AxiosError } from 'axios';
import Task from './models/TaskModel'
import Flash from './components/flash/Flash';
import flashType from './enumerations/FlashType';

axios.defaults.baseURL = 'https://6091661250c25500176781bb.mockapi.io';

interface IProps {}
interface IState {
  tasks: Task[];
}

class App extends React.Component<IState, IProps>  {
  readonly state = { tasks: Array<Task>()};
  childFlash: React.RefObject<Flash>;

  constructor(props: IState | Readonly<IState>) {
    super(props);
    this.childFlash = React.createRef();
  }

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
    this.setNewFlashMessage(`task ${newTask.description} successfully added`, flashType.success);
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
            this.setNewFlashMessage(`task ${taskUpdated.description} has been updated`, flashType.success);
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
          this.setNewFlashMessage(`task successfully deleted`, flashType.success);
        }).catch(err => {
          this.setNewFlashMessage(err.response.data, flashType.warning);
        })
      }
    });
  }
  sortByDate(tasks: Task[]) {
    return tasks.sort(function (a: Task, b: Task) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  onErrorChild = (error: AxiosError) => {
    if (error.response !== undefined) {
      this.setNewFlashMessage(error.response.data, flashType.warning);
    }
  }

  setNewFlashMessage(message: string, type: string){
    if(this.childFlash.current) {
      this.childFlash.current.sendFlashMessage(message, type);
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Container className="mt-5 mb-5">
          <Flash ref={this.childFlash} />
          <div className="tasks_managers_container">
            <FormTask onCreatedTask={this.addTask} onErrorChild={this.onErrorChild} />
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
