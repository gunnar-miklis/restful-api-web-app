import HomePage from '../HomePage';
import TodolistsPage from '../TodolistsPage';
import TodolistPage from '../TodolistPage';
import TodoPage from '../TodoPage';
import ErrorPage from '../ErrorPage';

export const routes = [
	{
		path: '/',
		element: <HomePage/>,
	},
	{
		path: '/home',
		element: <HomePage/>,
	},
	{
		path: '/todolists',
		element: <TodolistsPage/>,
	},
	{
		path: '/todolists/:todolistID',
		element: <TodolistPage/>,
	},
	{
		path: '/todos/:todoID',
		element: <TodoPage/>,
	},
	{
		path: '*',
		element: <ErrorPage/>,
	},
];
