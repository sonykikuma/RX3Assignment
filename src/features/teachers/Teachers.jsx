import {useSelector, useDispatch} from 'react-redux'
import {fetchTeachers} from './teacherSlice'
import {useEffect} from 'react'
import { Link } from "react-router-dom"
import Header from "../../components/Header"


const Teachers = ()=>{
const dispatch = useDispatch()

  const teachers = useSelector(state=> state.teachers)
  const status = useSelector(state=> state.status)
  const error = useSelector(state=> state.error)

  useEffect(()=>{
     dispatch(fetchTeachers())
  },[ ])

  console.log(teachers)
  
  return(<>
  <Header/>
    <div className="container py-4">
    <h1 className="mb-3">Teachers View</h1>
      <Link to="/addTeacher" className="bg-warning py-2 px-3 rounded ">Add a new Teacher</Link><br/>
      {status === 'loading' && <p>fetching teachers....</p>}
      {error && <p>{error}</p>}
      <div className="row py-3 mt-3">{teachers.teachers.map(teacher=> (
    <div key={teacher._id} className="col-md-4 mb-3" >
      <Link to={`/teachers/${teacher._id}`}>
    <div className="card rounded">
<img src={teacher.imageUrl} className="img-fluid" alt="teacher image" style={{height:"400px", objectFit:"cover"}}/>
      <div className="card-body text-center">
        <p>{teacher.name}</p>
        <p>{teacher.email}</p>
        <p>{teacher.phoneNumber}</p>
      </div>
    </div></Link>
      </div>
      ))}

      </div>       
    </div>
  </>)
} 
export default Teachers


