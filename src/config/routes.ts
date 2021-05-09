import IRoute from '../interfaces/route';
import TaskPage from '../pages/tasks/Tasks';
import ThemePage from '../pages/theme/ChooseTheme'

const Routes: IRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: TaskPage,
        exact: true
    },
    {
        path: '/tasks/:tasksType',
        name: 'Tasks Page',
        component: TaskPage,
        exact: true
    },
    {
        path: '/theme',
        name: 'Theme Page',
        component: ThemePage,
        exact: true
    }
]

export default Routes;