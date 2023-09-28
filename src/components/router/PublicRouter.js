import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../modules/Login';


const ProjectRouter = createBrowserRouter([
		{
			path:'/',
			element: <AuthLayout/>,
			children:[
				{
					path:'/',
					element: <Login/>
				},

				],
		},
	]);

export default ProjectRouter;