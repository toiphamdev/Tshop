import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getEnquiries = async () => {
  const { data } = await axios.get(`${base_url}/enq/get-all-enq`);
  return data;
};

const enqService = {
  getEnquiries,
};

export default enqService;
