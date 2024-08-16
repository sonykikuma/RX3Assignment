
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents, setFilter, setSortBy } from '../features/students/studentsSlice';
import Header from './Header';

const ClassView = () => {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.students);
  const status = useSelector(state => state.students.status);
  const filter = useSelector(state => state.students.filter);
  const sortBy = useSelector(state => state.students.sortBy);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  let filteredStudents = students;
  if (filter !== 'All') {
    filteredStudents = students.filter(student => student.gender === filter);
  }

  let sortedStudents = [...filteredStudents]; // here created a new array to avoid mutation of original array

  if (sortBy === 'name') {
    sortedStudents = sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'marks') {
    sortedStudents = sortedStudents.sort((a, b) => b.marks - a.marks);
  } else if (sortBy === 'attendance') {
    sortedStudents = sortedStudents.sort((a, b) => b.attendance - a.attendance);
  }

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="container my-3">
        <h1>Class View</h1>
        <div className="filters mb-3">
          <div className="my-3">
            <label htmlFor="filter">Filter by Gender:</label>
            <select id="filter" value={filter} onChange={handleFilterChange} className="ms-2">
              <option value="All">All</option>
              <option value="Male">Boys</option>
              <option value="Female">Girls</option>
            </select>
          </div>
          <div className="my-4">
            <label htmlFor="sort">Sort By:</label>
            <select id="sort" value={sortBy} onChange={handleSortChange} className="ms-2">
              <option value="name">Name</option>
              <option value="attendance">Attendance</option>
              <option value="marks">Marks</option>
            </select>
          </div>
        </div>
        <ul className="">
          {sortedStudents.length > 0 ? (
            sortedStudents.map(student => (
              <li key={student._id} className="">
                {student.name} - {student.gender} - Marks: {student.marks} - Attendance: {student.attendance}
              </li>
            ))
          ) : (
            <li className="list-group-item">No students found</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default ClassView;
