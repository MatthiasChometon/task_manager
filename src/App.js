import React from "react";
import Navbar from "./components/navbar/Navbar";
import FormTask from "./components/formTask/FormTask";
import Footer from "./components/footer/Footer";
import Container from 'react-bootstrap/Container';
import TaskManager from "./components/tasksManager/TaskManager";
import { taskManager_container } from "./App.css"

const App = () => (
  <div>
    <Navbar />
    <Container className="mt-5 mb-5">
      <div>
        <FormTask />
        <div className="taskManager_container">
          <TaskManager taskState="false"/>
          <TaskManager taskState="true"/>
        </div>
      </div>
    </Container>
    <Footer />
  </div>
);

export default App;
