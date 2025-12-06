import { useEffect, useState } from "react";
import axios from "../services/axios.config";

export default function useRole() {
  const [role, setRole] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/auth/me");
        setRole(res.data?.role);
      } catch (err) {}
    })();
  }, []);
  return role;
}
