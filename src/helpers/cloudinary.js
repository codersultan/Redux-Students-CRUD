import axios from "axios";

/**
 * Cloud Image Upload
 * @param {*} param0
 * @returns
 */
export const cloudImageUpload = async ({ file, preset, cloudName }) => {
  const form_data = new FormData();

  form_data.append("file", file);
  form_data.append("upload_preset", preset);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    form_data
  );

  return response.data;
};
