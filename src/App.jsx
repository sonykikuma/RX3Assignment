import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import StudentView from './features/students/StudentView'
import Header from './components/Header'

export default function App() {
  return (
    <>
<Header/>   
   <StudentView/> 
    </>
  )
}
