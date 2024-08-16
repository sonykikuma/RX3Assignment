import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react';
import {fetchStudents} from '../../features/students/studentsSlice'
import {updateSchoolStats, setTopStudent} from '../../features/school/schoolSlice'

import Header from '../../components/Header'
import { Link } from 'react-router-dom';

const School = ()=>{
const dispatch = useDispatch()
  const students = useSelector(state => state.students.students)
  const status = useSelector(state => state.students.status)


  useEffect(()=>{
    if(status === 'idle'){
      dispatch(fetchStudents())
    }
  },[status, dispatch])

  useEffect(()=>{
    if(students.length > 0){
      const totalStudents = students.length

     // const validAttendance = students.filter(student => student.attendance != null && !isNaN(student.attendance));

      const totalAttendance = students.reduce((acc, curr)=> acc + curr.attendance, 0)
      const averageAttendance = totalAttendance/ students.length

      const totalMarks = students.reduce((acc,curr)=> acc+ curr.marks, 0)
const averageMarks = totalMarks/totalStudents

const topStudent = students.reduce((acc, curr)=> curr.marks > (acc?.marks || 0) ? curr: acc, null)
      
      dispatch(updateSchoolStats({totalStudents, averageAttendance, averageMarks, topStudent}))

    }

  })
  
  return(<>
    <Header/>  
    <div className="container py-3">
    <h1 className="mb-3">School View</h1>
      <Link to="/teachers" className=" bg-warning px-3 py-2 rounded" >Want to Know About Our Teachers ?</Link>
      <p className="mt-3">Total Students: {students.length}</p>
      <p>Average Attendance: {students.length > 0 ? (students.reduce((acc, curr)=> acc + curr.attendance, 0)/ students.length).toFixed(2): "NA"}</p>
      <p>Average Marks: {students.length > 0 ? (students.reduce((acc,curr)=> acc + curr.marks, 0)/students.length).toFixed(2) : "NA"}</p>
      <p>Top Student: {students.length > 0 ? students.reduce((acc, curr)=> curr.marks > (acc?.marks || 0) ? curr : acc, null)?.name : "NA"}</p>
    </div>
  
  </>)
}

export default School