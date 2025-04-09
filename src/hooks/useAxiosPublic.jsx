import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://serventica-backend-2025.onrender.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
