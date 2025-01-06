import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../helpers/api";

/**
 * student data create
 */
export const createStudent = createAsyncThunk(
  "students/createStudent",
  async (data) => {
    try {
      const resonse = await API.post("/students", data);
      return resonse.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

/**
 * get all students data
 */
export const getAllStdData = createAsyncThunk(
  "students/getAllStdData",
  async () => {
    try {
      const response = await API.get("/students");
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

/**
 * student data delete
 */
export const deleteStudent = createAsyncThunk(
  "students/studentDelete",
  async (id) => {
    try {
      await API.delete(`/students/${id}`);
      return id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
