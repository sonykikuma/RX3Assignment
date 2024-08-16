import {Navigate, useParams, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {updateTeacher, deleteTeacher} from '../features/teachers/teacherSlice'
import {Link} from 'react-router-dom'
import Header from './Header'


const TeacherDetail = ()=>{
    const teachers = useSelector(state => state.teachers.teachers);
    const status = useSelector(state => state.teachers.status);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {teacherId} = useParams()
  const teacherData = teachers.find(teacher => teacher._id === teacherId);
  //console.log('teacherData:', teacherData);

   const deleteHandler = ()=>{
    dispatch(deleteTeacher(teacherId))
    .then(()=>{
      navigate('/teachers') 
     // navigate('/')
    }).catch(()=>{
      console.error('failed to delete teacher')
   })
   }

  
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!teacherData) {
    return <Navigate to="/teachers" />;
  }

  return(<>
  <Header/>
    <div className="container py-4">
      {status === 'loading' && <p>Loading...</p>}

      <h2>{teacherData.name}</h2>
      <img src={teacherData.imageUrl} alt="teacher pic" className="img-fluid" style={{objectFit:"cover", height:"450px", width:"500px"}}/>
      <p>Email: {teacherData.email}</p>
      <p>Phone Number: {teacherData. phoneNumber}</p>
         <div>   
      <Link 
        to={`/editTeacher/${teacherData._id}`}
        state={{ teacher: teacherData }} 
        className=" bg-warning p-3 rounded ">Edit Details</Link>
           <span className="ms-2 "> 
             <button 
            className="btn btn-danger" onClick={deleteHandler}>Delete</button></span></div>
    </div>
  </>)
}
 export default TeacherDetail