// import axios from "../axios.config";
// export const fetchAssets = (page = 1, limit = 10) =>
//   axios.get(`/assets?page=${page}&limit=${limit}`);
// export const createAsset = (data) => axios.post("/assets", data);
// export const updateAsset = (id, payload) =>
//   axios.patch(`/assets/${id}`, payload);
// export const deleteAsset = (id) => axios.delete(`/assets/${id}`);

import axios from "../axios.config";

export const fetchAssets = (page = 1, limit = 10) =>
  axios.get(`/hr/assets?page=${page}&limit=${limit}`);

export const createAsset = (data) => axios.post("/hr/assets", data);

export const updateAsset = (id, payload) =>
  axios.put(`/hr/assets/${id}`, payload); // ← Changed to PUT

export const deleteAsset = (id) => axios.delete(`/hr/assets/${id}`);
