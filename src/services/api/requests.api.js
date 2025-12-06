import axios from "../axios.config";
export const fetchRequests = () => axios.get("/requests");
export const createRequest = (payload) => axios.post("/requests", payload);
export const updateRequest = (id, payload) =>
  axios.patch(`/requests/${id}`, payload);
