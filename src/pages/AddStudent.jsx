
                
 import { useState, useEffect } from 'react';
 import { useDispatch } from 'react-redux';
 import { useLocation, useNavigate } from 'react-router-dom';
 import { addStudentAsync, updateStudentAsync } from '../features/students/studentsSlice';
 import Header from '../components/Header';

 const AddStudent = () => {
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();
   const studentToEdit = location.state?.student || {};

   const [name, setName] = useState("");
   const [age, setAge] = useState("");
   const [grade, setGrade] = useState("");
   const [gender, setGender] = useState("");
   const [attendance, setAttendance] = useState("");
   const [marks, setMarks] = useState("");
   const [error, setError] = useState("");

   useEffect(() => {
     if (studentToEdit && Object.keys(studentToEdit).length > 0) {
       setName(studentToEdit.name || "");
       setAge(studentToEdit.age || "");
       setGrade(studentToEdit.grade || "");
       setGender(studentToEdit.gender || "");
       setAttendance(studentToEdit.attendance || "");
       setMarks(studentToEdit.marks || "");
     }
   }, [studentToEdit]);

   const formHandler = (e) => {
     e.preventDefault();

     if (!name || !age || !grade || !gender) {
       setError("All fields are required.");
       return;
     }

     const studentData = {
       name,
       age: parseInt(age),
       grade,
       gender,
       attendance,
       marks
     };

     if (studentToEdit._id) {
       dispatch(updateStudentAsync({ id: studentToEdit._id, ...studentData }))
         .then(() => {
           navigate(`/students/${studentToEdit._id}`);
         })
         .catch(() => {
           setError("Failed to update student.");
         });
     } else {
       dispatch(addStudentAsync(studentData))
         .then(() => {
           setName("");
           setAge("");
           setGrade("");
           setGender("");
           setAttendance("");
           setMarks("");
           setError("");
         })
         .catch(() => {
           setError("Failed to add student.");
         });
     }
   };

   return (
     <>
       <Header />
       <div className="container py-4">
         <h1>{studentToEdit._id ? "Edit Student" : "Add Student"}</h1>
         {error && <p style={{ color: 'red' }}>{error}</p>}
         <form onSubmit={formHandler}>
           <div>
             <input
               type="text"
               placeholder="Name"
               value={name}
               onChange={(e) => setName(e.target.value)}
             />
           </div>
           <br />
           <div>
             <input
               type="number"
               placeholder="Age"
               value={age}
               onChange={(e) => setAge(e.target.value)}
             />
           </div>
           <br />
           <div>
             <input
               placeholder="Grade"
               value={grade}
               onChange={(e) => setGrade(e.target.value)}
             />
           </div>
           <br />
           <div>
             <label>Gender: </label>
             <label>
               <input className='mx-2'
                 type="radio"
                 name="gender"
                 value="Male"
                 checked={gender === "Male"}
                 onChange={(e) => setGender(e.target.value)}
               /> Male
             </label>
             <label>
               <input className='mx-2'
                 type="radio"
                 name="gender"
                 value="Female"
                 checked={gender === "Female"}
                 onChange={(e) => setGender(e.target.value)}
               /> Female
             </label>
           </div>
           <br />
           {studentToEdit._id && (
             <>
               <div>
                 <input
                   type="text"
                   placeholder="Attendance"
                   value={attendance}
                   onChange={(e) => setAttendance(e.target.value)}
                 />
               </div>
               <br />
               <div>
                 <input
                   type="text"
                   placeholder="Marks"
                   value={marks}
                   onChange={(e) => setMarks(e.target.value)}
                 />
               </div>
               <br />
             </>
           )}

           <button type="submit">{studentToEdit._id ? "Update" : "Add"}</button>
         </form>
       </div>
     </>
   );
 };

 export default AddStudent;

