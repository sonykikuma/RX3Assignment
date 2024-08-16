
import React from 'react';
import { Link } from 'react-router-dom';

const StudentList = ({ students }) => {
  //console.log("StudentList received students:", students);

  if (!students || students.length === 0) {
    return <p>No students available.</p>;
  }

  
  return (
    <div className='container my-3'>
      <h2 >Student List</h2>
      {students.map(student => (
        <Link to={`/students/${student._id}`} key={student._id}>
          <li>
            {student.name} (Age: {student.age})
          </li>
        </Link>
      ))}
    </div>
  );
};

export default StudentList;
