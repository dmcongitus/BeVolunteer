import Axios from "axios";

const instance = Axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: { "x-access-token": localStorage.getItem("token") }
  });
  
export async function createAdmin(params) {
    try {
      const data = await instance.post("/admins", { ...params });
      return data; 
    } catch (e) {
        throw e;
    }
  }
  