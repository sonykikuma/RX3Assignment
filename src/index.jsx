import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import store from './app/store'
import App from './App'
import StudentView from './features/students/StudentView'
import StudentDetail from './pages/StudentDetail'
import AddStudent from './pages/AddStudent'
import ClassView from './components/ClassView'
import School from './features/school/School'
import Teachers from './features/teachers/Teachers'
import AddTeacher from './pages/AddTeacher'
import EditTeacher from './pages/EditTeacher'
import TeacherDetail from './components/TeacherDetail'


const router = createBrowserRouter([
	{path:"/", element:<App/>},
	{path:"/students", element:<ClassView/>},
	 {path:"/school", element:<School/>},
	{path:"/students/:studentId", element:<StudentDetail/>},
	{path:"/addStudent", element:<AddStudent/>},
{ path: "/editStudent/:studentId", element: <AddStudent /> }, // Added this route for editing
	{path:"/teachers", element:<Teachers/>},
	{path:"/addTeacher", element:<AddTeacher/>},
	{path:"/editTeacher/:teacherId", element:<EditTeacher/>},
	{path:"/teachers/:teacherId", element:<TeacherDetail/>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}>
		<App />
				</RouterProvider>
			</Provider>
	</React.StrictMode>
)