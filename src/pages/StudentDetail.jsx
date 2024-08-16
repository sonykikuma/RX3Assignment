import {Navigate, useParams, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import {deleteStudentAsync} from '../features/students/studentsSlice'
import Header from '../components/Header'


const StudentDetail = ()=>{
  const students = useSelector(state => state.students.students);
  const status = useSelector(state => state.students.status);
const dispatch = useDispatch()
const navigate = useNavigate()
  const {studentId} = useParams()
  //console.log('students:', students);


  const studentData = students.find(student => student._id === studentId);
  console.log('studentData:', studentData);

const deleteHandler = ()=>{
  dispatch(deleteStudentAsync(studentId))
  .then(()=>{
   // navigate('/students') this used for classview
    navigate('/')
  }).catch(()=>{
    console.error('failed to delete student')
  })
}

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!studentData) {
    return <Navigate to="/students" />;
  }


  
  return(<>
    <Header/>
    <div className='container p-3'>
      {status === 'loading' && <p>Loading...</p>}
  <h1>Student Detail</h1>
      <p>Name: {studentData.name}</p>
      <p>Age: {studentData.age}</p>
      <p>Grade: {studentData.grade}</p>
      <p>Attendance:{studentData.attendance}</p>
      <p>Marks:{studentData.marks}</p>
   <div>   
<Link 
  to={`/editStudent/${studentData._id}`}
  state={{ student: studentData }} 
  className=" bg-warning p-3 rounded ">Edit Details</Link>
     <span className="ms-2 "> <button onClick={deleteHandler}
      className="btn btn-danger">Delete</button></span></div>
  </div></>)
}

export default StudentDetail