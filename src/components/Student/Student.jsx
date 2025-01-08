import { BsTrash } from "react-icons/bs";
import { FaPlus, FaRegEdit, FaRegEye } from "react-icons/fa";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import {
  createStudent,
  deleteStudent,
  updateStudent,
} from "../../app/student/studentApiSlice";
import { useEffect, useState } from "react";
import { cloudImageUpload } from "../../helpers/cloudinary";
import Swal from "sweetalert2";
import Modal from "../Modal/Modal";
import useToggle from "../../hooks/useToggle";
import {
  loaderStart,
  preloaderStart,
  stateEmpty,
} from "../../app/student/studentSlice";
import Loader from "../Loader/Loader";
import { createAlert } from "../../helpers/alert";
import Preloader from "../Loader/Preloader";

const Student = () => {
  const { students, loading, success, error, preloader } = useSelector(
    (state) => state.students
  );
  const dispatch = useDispatch();

  // state
  const [file, setFile] = useState();
  const { toggle, setToggle, handleToggle } = useToggle();
  const { toggle: view, setToggle: setView } = useToggle();
  const { toggle: edit, setToggle: setEdit } = useToggle();
  const [single, setSingle] = useState();

  // input hookd state
  const { input, setInput, handleInputChange } = useInput({
    name: "",
    roll: "",
    class: "",
  });

  // Student Create form submit
  const handleStudentCreate = async (e) => {
    e.preventDefault();

    dispatch(loaderStart());

    const fileData = await cloudImageUpload({
      file: file,
      preset: "CoderSultan_Cloud",
      cloudName: "dbprzhz68",
    });

    // send data to asyncThunk
    dispatch(createStudent({ ...input, photo: fileData.secure_url }));

    setInput({
      name: "",
      roll: "",
      class: "",
    });
    e.target.reset();

    setToggle(false);
  };

  // student delete request send
  const handleStudentDelete = ({ id, name }) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(preloaderStart());
        dispatch(deleteStudent(id));

        if (success) {
          createAlert({
            title: "Deleted!",
            text: "Your data has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  // Single Student View
  const handleStudentView = (id) => {
    setSingle(students.find((data) => data.id == id));

    setView(true);
  };

  // Student data Edit
  const handleStudentEdit = (id) => {
    setEdit(true);
    setInput(students.find((data) => data.id == id));
  };

  // Student data Update
  const handleStudentUpdate = async (e) => {
    e.preventDefault();

    dispatch(loaderStart());

    let photoUrl = input.photo;

    if (file) {
      const fileData = await cloudImageUpload({
        file: file,
        preset: "CoderSultan_Cloud",
        cloudName: "dbprzhz68",
      });

      photoUrl = fileData.secure_url;
    }

    // send updated data to AsyncThunk
    dispatch(updateStudent({ ...input, photo: photoUrl }));

    setInput({
      name: "",
      roll: "",
      class: "",
    });
    e.target.reset();

    setEdit(false);
  };

  useEffect(() => {
    if (success) {
      createAlert({
        title: success,
        icon: "success",
      });

      dispatch(stateEmpty());
    }

    if (error) {
      createAlert({
        title: error,
      });

      dispatch(stateEmpty());
    }
  }, [success, dispatch, error]);

  return (
    <>
      <div className="student-section">
        <div className="container mx-auto py-20">
          <div className="create-std flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Create Student</h2>
            <button
              onClick={handleToggle}
              className="px-5 py-2.5 mt-2 rounded-md border text-white bg-red-500 hover:bg-red-600"
            >
              <FaPlus />
            </button>

            {toggle && (
              <Modal title="Create New Student">
                <form
                  onSubmit={handleStudentCreate}
                  className="flex flex-col gap-3"
                >
                  <label className="block font-semibold">
                    Name
                    <input
                      className="mt-2 px-3 py-2.5 outline-none rounded-sm border block w-full"
                      type="text"
                      placeholder="name"
                      name="name"
                      value={input.name}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label className="block font-semibold">
                    Roll
                    <input
                      className="mt-2 px-3 py-2.5 outline-none rounded-sm border block w-full"
                      type="number"
                      placeholder="roll"
                      name="roll"
                      value={input.roll}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label className="block font-semibold">
                    Class
                    <select
                      name="class"
                      value={input.class}
                      onChange={handleInputChange}
                      className="mt-2 px-3 py-2.5 outline-none rounded-sm border block w-full"
                    >
                      <option value="">-Class-</option>
                      <option value="six">Six</option>
                      <option value="seven">Seven</option>
                      <option value="eight">Eight</option>
                      <option value="nine">Nine</option>
                      <option value="ten">Ten</option>
                    </select>
                  </label>

                  <label className="block font-semibold">
                    Photo
                    <input
                      className="px-3 py-2 outline-none rounded-sm border block w-full"
                      type="file"
                      placeholder="photo"
                      name="photo"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>

                  <button
                    className="px-5 py-2.5 mt-2 outline-none rounded-md border bg-red-500 hover:bg-red-600 text-white text-md uppercase font-semibold flex justify-center  items-center relative"
                    type="submit"
                  >
                    Create Student
                    {loading && <Loader />}
                  </button>
                </form>
              </Modal>
            )}

            {view && (
              <Modal title="Single Student">
                <div className="single-view">
                  <img
                    src={single.photo}
                    className="w-full max-h-[60vh] object-cover rounded-md"
                    alt=""
                  />

                  <div className="meta-box">
                    <h2 className="text-2xl font-semibold mt-4">
                      {single.name}
                    </h2>

                    <div className="info  flex gap-5 mt-2">
                      <h2 className=" text-slate-700">
                        <strong>Roll :</strong>
                        {` ${single.roll}`}
                      </h2>
                      <h2 className=" text-slate-700">
                        <strong>Class :</strong>
                        {` ${single.class}`}
                      </h2>
                    </div>
                  </div>

                  {/* <p>{item.content}</p> */}
                </div>
              </Modal>
            )}

            {edit && (
              <Modal title="Update Student Data" width="50%">
                <div className="update-studen-card flex gap-5">
                  <div className="student-photo w-6/12">
                    <img
                      className="w-full min-h-full object-cover rounded-md"
                      src={input.photo}
                      alt=""
                    />
                  </div>
                  <div className="student-info  w-6/12 self-center">
                    <form
                      onSubmit={handleStudentUpdate}
                      className="flex flex-col gap-3"
                    >
                      <input
                        className="mt-2 px-3 py-2.5 outline-none rounded-sm border block w-full"
                        type="hidden"
                        placeholder="id"
                        name="id"
                        value={input.id}
                      />
                      <label className="block font-semibold">
                        Name
                        <input
                          className="mt-2 px-3 py-2.5 outline-none rounded-sm border block w-full"
                          type="text"
                          placeholder="name"
                          name="name"
                          value={input.name}
                          onChange={handleInputChange}
                        />
                      </label>

                      <label className="block font-semibold">
                        Roll
                        <input
                          className="mt-2 px-3 py-2.5 outline-none rounded-sm border block w-full"
                          type="number"
                          placeholder="roll"
                          name="roll"
                          value={input.roll}
                          onChange={handleInputChange}
                        />
                      </label>

                      <label className="block font-semibold">
                        Class
                        <select
                          name="class"
                          value={input.class}
                          onChange={handleInputChange}
                          className="mt-2 px-3 py-2.5 outline-none rounded-sm border block w-full"
                        >
                          <option value="">-Class-</option>
                          <option value="six">Six</option>
                          <option value="seven">Seven</option>
                          <option value="eight">Eight</option>
                          <option value="nine">Nine</option>
                          <option value="ten">Ten</option>
                        </select>
                      </label>

                      <input
                        className="mt-2 px-3 py-2.5 outline-none rounded-sm border block w-full"
                        type="hidden"
                        placeholder="photo"
                        name="photo"
                        value={input.photo}
                      />

                      <label className="block font-semibold">
                        Photo
                        <input
                          className="px-3 py-2 outline-none rounded-sm border block w-full"
                          type="file"
                          placeholder="photo"
                          name="photo"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </label>

                      <button
                        className="px-5 py-2.5 mt-2 outline-none rounded-md border bg-red-500 hover:bg-red-600 text-white text-md uppercase font-semibold flex justify-center  items-center relative"
                        type="submit"
                      >
                        Update Student
                        {loading && <Loader />}
                      </button>
                    </form>
                  </div>
                </div>
              </Modal>
            )}

            {preloader && <Preloader />}
          </div>

          <hr className="my-4" />

          <div className="std-datatable">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-300">
                <tr>
                  <th className="border border-gray-400 px-4 py-2 text-left text-gray-600 w-[50px]">
                    ID
                  </th>
                  <th className="border border-gray-400 px-4 py-2 text-left text-gray-600">
                    Photo
                  </th>
                  <th className="border border-gray-400 px-4 py-2 text-left text-gray-600">
                    Name
                  </th>
                  <th className="border border-gray-400 px-4 py-2 text-left text-gray-600">
                    Roll
                  </th>
                  <th className="border border-gray-400 px-4 py-2 text-left text-gray-600">
                    Class
                  </th>
                  <th className="border border-gray-400 px-4 py-2 text-left text-gray-600 w-[200px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {students?.map((item, index) => {
                  return (
                    <tr
                      key={item.id}
                      className={`${
                        (index + 1) % 2 == 0 ? "bg-gray-50" : null
                      }  hover:bg-gray-200/70`}
                    >
                      <td className="border-b border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border-b border-gray-300 px-4 py-2">
                        <img
                          className="w-10 h-10 rounded-md object-cover"
                          src={item.photo}
                          alt=""
                        />
                      </td>
                      <td className="border-b border-gray-300 px-4 py-2">
                        {item.name}
                      </td>
                      <td className="border-b border-gray-300 px-4 py-2">
                        {item.roll}
                      </td>
                      <td className="border-b border-gray-300 px-4 py-2">
                        {item.class}
                      </td>
                      <td className="border-b border-gray-300 px-4 py-2">
                        <button
                          onClick={() => handleStudentView(item.id)}
                          className="p-2 border bg-blue-300 hover:bg-blue-400 mr-2"
                        >
                          <FaRegEye />
                        </button>
                        <button
                          onClick={() => handleStudentEdit(item.id)}
                          className="p-2 border bg-yellow-300 hover:bg-yellow-400 mr-2"
                        >
                          <FaRegEdit />
                        </button>
                        <button
                          onClick={() =>
                            handleStudentDelete({
                              id: item.id,
                              name: item.name,
                            })
                          }
                          className="p-2 border bg-red-300 hover:bg-red-400"
                        >
                          <BsTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;
