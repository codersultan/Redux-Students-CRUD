import { useDispatch } from "react-redux";
import "./App.css";
import Student from "./components/Student/Student";
import { useEffect } from "react";
import { getAllStdData } from "./app/student/studentApiSlice";

function App() {
  const dispatch = useDispatch();

  // Load All students data
  useEffect(() => {
    dispatch(getAllStdData());
  }, [dispatch]);

  return (
    <>
      <Student />
    </>
  );
}

export default App;
