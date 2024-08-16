import {useDispatch, useSelector} from 'react-redux'
import Header from '../components/Header';
import {useState, useEffect} from 'react'
import {addTeacher} from '../features/teachers/teacherSlice'

const AddTeacher = ()=>{
  const dispatch= useDispatch()
const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState()
  const [imgurl, setImgurl] = useState("")
  const [successMsg, setSuccessMsg] = useState("")


  
const formHandler=(e)=>{
  e.preventDefault()
  //console.log(name, email, phoneNumber, imgurl)
  const newTeacher={
    name:name,
    email:email,
    phoneNumber:phoneNumber,
    imageUrl:imgurl,
}
if(name && email && phoneNumber && imgurl){
  dispatch(addTeacher(newTeacher))
  setName("")
  setEmail("")
  setPhoneNumber("")
  setImgurl("")

setSuccessMsg("Teacher added Successfully")
  setTimeout(() => setSuccessMsg(""), 3000);
 }
}
  
  return(<>
  <Header/>
    <div className="container py-3">
    <h1>Add A New Teacher</h1>
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
    <form onSubmit={formHandler} className="pt-3">
    <div className="">
      <label><input placeholder="Teacher Name" value={name} 
        onChange={(e)=> setName(e.target.value)}       /></label>
    </div><br/>
      <div>
        <label><input placeholder="Email" value={email} type="email"
            onChange={(e)=>setEmail(e.target.value)}     /></label>
      </div><br/>
      <div>
        <label><input placeholder="Phone Number" type="number" 
          value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)}       /></label>
      </div><br/>
      <div>
        <label><input placeholder="Image URL" value={imgurl}
            onChange={(e)=> setImgurl(e.target.value)}     /></label>
      </div><br/>
<button type="submit">Add Teacher</button>
    </form>
    </div>
  </>)
  
}
 export default AddTeacher