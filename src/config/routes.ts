import IRoute from '../interfaces/route';
import TasksPage from '../pages/tasks/Tasks';

const routes: IRoute[] = [
    {
        path: '/tasks/:tasksType',
        name: 'Tasks Page',
        component: TasksPage,
        exact: true
    },
]

export default routes;