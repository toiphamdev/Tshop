import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const uploadImages = async (images) => {
  const { data } = await axios.post(
    `${base_url}/upload/upload-image`,
    images,
    config
  );
  return data;
};
const deleteImage = async (public_id) => {
  const { data } = await axios.delete(
    `${base_url}/upload/delete-image/${public_id}`,
    config
  );
  return data;
};

const uploadService = {
  uploadImages,
  deleteImage,
};
export default uploadService;
