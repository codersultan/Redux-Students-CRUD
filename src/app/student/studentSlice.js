import { createSlice } from "@reduxjs/toolkit";
import { createStudent, deleteStudent, getAllStdData } from "./studentApiSlice";

// create slice
export const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    error: null,
    message: null,
    loading: false,
  },
  reducers: {
    loaderStart: (state, action) => {
      state.loader = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStdData.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
        state.loader = false;
      })
      .addCase(createStudent.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (data) => data.id != action.payload
        );
      });
  },
});

// export student selectors
// export const {} = studentSlice.selectors;

// export student actions
export const { loaderStart } = studentSlice.actions;

// export student reducer
export default studentSlice.reducer;
