import Axios from "axios";

export function getAllUsers() {
  return Axios.get("/accounts/users", {
    headers: { "x-access-token": localStorage.getItem("token") }
  });
}

export function deleteUser(username) {
  return Axios.delete("/accounts/" + username, {
    headers: { "x-access-token": localStorage.getItem("token") }
  });
}

const instance = Axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: { "x-access-token": localStorage.getItem("token") }
});

export function banUser(username) {
  return instance.post("/admins/ban/" + username);
}

export function verifyUser(username) {
  return instance.post("/admins/verify/" + username);
}

export async function createUser(params) {
  try {
    const data = await Axios.post("/accounts", { ...params });
    return data; 
  } catch (e) {
      throw e;
  }
}