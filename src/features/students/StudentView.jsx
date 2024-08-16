import {useSelector, useDispatch} from 'react-redux'
import {fetchStudents} from './studentsSlice'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import StudentList from '../../components/StudentList'

const StudentView = ()=>{
const dispatch = useDispatch()

  const students = useSelector(state=> state.students)
const status = useSelector(state=> state.status)
  const error = useSelector(state=> state.error)

  
   useEffect(()=>{
    dispatch(fetchStudents())
  },[])
//console.log(students)

  return(<div className='container p-4'>
     {status === "loading" && <p>Loading...</p>}
    {error && <p>{error}</p>} 
    <h1 className='mb-3'>Student View</h1>
<Link to="/addStudent" className='rounded px-3 py-2 bg-warning '>Add Student</Link>
     <StudentList students={students.students}/> 
 {/* <div className='container mt-3'>
    <h2>Student List</h2>
  {students.students.map(student => (
    <li key={student._id}>  
      <Link to={`/students/${student._id}`}>
      {student.name} (Age: {student.age})</Link>
    </li>
      ))}</div>  */}
  </div>)
} 
  
export default StudentView


