import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchTeachers = createAsyncThunk("teachers/fetchTeachers", async ()=>{
  const response = await axios.get("https://reduxtoolkitbackend-student-management-rx-3-assignment.vercel.app/teachers",)

  //console.log(response.data)
  return response.data
})

export const addTeacher = createAsyncThunk("teachers/addTeacher", async (newTeacher)=>{
  const res = await axios.post("https://reduxtoolkitbackend-student-management-rx-3-assignment.vercel.app/teachers", newTeacher)
  return res.data;
})


export const updateTeacher = createAsyncThunk("teachers/updateTeacher", async (updatedTeacher) => {
  const response = await axios.put(`https://reduxtoolkitbackend-student-management-rx-3-assignment.vercel.app/teachers/${updatedTeacher.id}`, updatedTeacher);
  return response.data;
});


export const deleteTeacher = createAsyncThunk("teachers/deleteTeacher", async (teacherId)=>{
  const response = await axios.delete(`https://reduxtoolkitbackend-student-management-rx-3-assignment.vercel.app/teachers/${teacherId}`)
  return teacherId
})

export const teachersSlice = createSlice({
  name:"teachers",
  initialState:{
    teachers:[],
    status:"idle",
    error:null
  }, 
  reducers:{},
  extraReducers:(builder) =>{
    builder.addCase(fetchTeachers.pending, (state)=>{
      state.status = "loading"
    })
    builder.addCase(fetchTeachers.fulfilled, (state,action)=>{
      state.status = "success";
      state.teachers = action.payload
    })
    builder.addCase(fetchTeachers.rejected, (state, action)=>{
      state.status = "error";
      state.error = action.error.message
    })

    builder.addCase(addTeacher.fulfilled, (state, action) => {
      state.teachers.push(action.payload);
    });
    builder.addCase(updateTeacher.fulfilled, (state, action) => {
      const index = state.teachers.findIndex(teacher => teacher._id === action.payload._id);
      if (index !== -1) {
        state.teachers[index] = action.payload;
      }
    });
    builder.addCase(deleteTeacher.fulfilled, (state, action)=>{
      state.teachers = state.teachers.filter(teacher => teacher._id !== action.payload)
    })


  }
})

export default teachersSlice.reducer
