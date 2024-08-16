
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTeacher } from '../features/teachers/teacherSlice';
import Header from '../components/Header';

const EditTeacher = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const teacher = useSelector((state) =>
    state.teachers.teachers.find((teacher) => teacher._id === teacherId)
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (teacher) {
      setName(teacher.name);
      setEmail(teacher.email);
      setPhoneNumber(teacher.phoneNumber);
      setImageUrl(teacher.imageUrl);
    }
  }, [teacher]);

  const formHandler = (e) => {
    e.preventDefault();
    const updatedTeacher = {
      id: teacherId, 
      name,
      email,
      phoneNumber,
      imageUrl,
    };
    
    dispatch(updateTeacher(updatedTeacher)).then(() => {
      navigate('/teachers');
    });
  };

  if (!teacher) {
    return <p>Loading...</p>;
  }


  return (
    <>
      <Header />
      <div className="container py-3">
        <h1>Edit Teacher Details</h1>
        <form onSubmit={formHandler} className="pt-3">
          <div>
            <label>
              <input
                placeholder="Teacher Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <br />
          <div>
            <label>
              <input
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <br />
          <div>
            <label>
              <input
                placeholder="Phone Number"
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </label>
          </div>
          <br />
          <div>
            <label>
              <input
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
          </div>
          <br />
          <button type="submit">Update Teacher</button>
        </form>
      </div>
    </>
  );
};

export default EditTeacher;
