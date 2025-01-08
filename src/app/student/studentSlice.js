import { createSlice } from "@reduxjs/toolkit";
import {
  createStudent,
  deleteStudent,
  getAllStdData,
  updateStudent,
} from "./studentApiSlice";

// create slice
export const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    error: null,
    success: null,
    loading: false,
    preloader: false,
  },
  reducers: {
    loaderStart: (state) => {
      state.loading = true;
    },
    preloaderStart: (state) => {
      state.preloader = true;
    },
    stateEmpty: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStdData.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
        state.loading = false;
        state.success = `${action.payload.name} data created successfully`;
      })
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (data) => data.id != action.payload
        );

        state.preloader = false;
        state.success = `Your data has been deleted`;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.preloader = true;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.preloader = false;
        state.error = action.error.message;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.students = state.students.map((item) => {
          if (item.id == action.payload.id) {
            return action.payload;
          } else {
            return item;
          }
        });

        state.loading = false;
        state.success = `${action.payload.name} data updated successfully`;
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.success = action.error.message;
      });
  },
});

// export student selectors
// export const {} = studentSlice.selectors;

// export student actions
export const { loaderStart, preloaderStart, stateEmpty } = studentSlice.actions;

// export student reducer
export default studentSlice.reducer;
