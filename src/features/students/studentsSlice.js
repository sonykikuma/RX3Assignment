
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchStudents = createAsyncThunk("students/fetchStudents", async()=>{
  const response = await axios.get("https://reduxtoolkitbackend-student-management-rx-3-assignment.vercel.app/students")
                                  // https://6f664d19-ba59-41c5-b06e-910a8c921282-00-23uxsr7yywhnm.sisko.replit.dev/students

  return response.data
})


export const addStudentAsync = createAsyncThunk("students/addStudent", async (newStudent) => {
  const response = await axios.post("https://reduxtoolkitbackend-student-management-rx-3-assignment.vercel.app/students", newStudent);
  return response.data;
});

export const updateStudentAsync = createAsyncThunk("students/updateStudent", async (updatedStudent) => {
  const response = await axios.put(`https://reduxtoolkitbackend-student-management-rx-3-assignment.vercel.app/students/${updatedStudent.id}`, updatedStudent);
  return response.data;
});

export const deleteStudentAsync = createAsyncThunk("students/deleteStudent", async(studentId)=>{
  const response = await axios.delete(`https://reduxtoolkitbackend-student-management-rx-3-assignment.vercel.app/students/${studentId}`)
  return studentId
})

export const studentsSlice = createSlice({
  name:"students",
  initialState:{
    students:[],
    status:"idle",
    error:null,
    filter:"All",
    sortBy:"name"
  },
  reducers:{
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    }

  },
  extraReducers:(builder)=>{
    builder.addCase(fetchStudents.pending, (state)=>{
      state.status = "loading"
    });
    builder.addCase(fetchStudents.fulfilled, (state, action)=>{
      state.status = "success"
      state.students = action.payload
    })

    builder.addCase(fetchStudents.rejected, (state, action) =>{
      state.status = "error";
      state.error = action.payload.message;
    })

    builder.addCase(addStudentAsync.fulfilled, (state, action) => {
      state.students.push(action.payload);
    });


    builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
      const index = state.students.findIndex(student => student._id === action.payload._id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    });

    builder.addCase(deleteStudentAsync.fulfilled, (state, action)=>{
      state.students = state.students.filter(student => student._id !== action.payload)
    })

  }
})

export const { setFilter, setSortBy } = studentsSlice.actions;

export default studentsSlice.reducer