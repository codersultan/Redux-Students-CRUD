import { BsTrash } from "react-icons/bs";
import { FaPlus, FaRegEdit, FaRegEye } from "react-icons/fa";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import {
  createStudent,
  deleteStudent,
} from "../../app/student/studentApiSlice";
import { useState } from "react";
import { cloudImageUpload } from "../../helpers/cloudinary";
import Swal from "sweetalert2";
import Modal from "../Modal/Modal";
import useToggle from "../../hooks/useToggle";
import { loaderStart } from "../../app/student/studentSlice";
import Loader from "../Loader/Loader";

const Student = () => {
  const { students, loading } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  // state
  const [file, setFile] = useState();
  const { toggle, setToggle, handleToggle } = useToggle();

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
        dispatch(deleteStudent(id));

        Swal.fire({
          title: "Deleted!",
          text: "Your data has been deleted.",
          icon: "success",
        });
      }
    });
  };

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
                      value={input.photo}
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
          </div>

          <hr className="my-4" />

          <div className="std-datatable">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 w-[50px]">
                    ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">
                    Photo
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">
                    Roll
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">
                    Class
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 w-[200px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {students?.map((item, index) => {
                  return (
                    <tr key={item.id} className="bg-gray-50 hover:bg-gray-100">
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
                        <button className="p-2 border bg-blue-300 hover:bg-blue-400 mr-2">
                          <FaRegEye />
                        </button>
                        <button className="p-2 border bg-yellow-300 hover:bg-yellow-400 mr-2">
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
