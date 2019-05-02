import Axios from "axios";

export function getAllUsers() {
  return Axios.get("/accounts/", {
    headers: { "x-access-token": localStorage.getItem("token") }
  });
}
export function getAllUsersRank() {
  return Axios.get("/ranking/", {
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

export async function banUser(username) {
  return await instance.post("/admins/ban/" + username);
}
export async function unbanUser(username) {
  return await instance.post("/admins/unban/" + username);
}

export function verifyUser(username) {
  return instance.post("/admins/verify/" + username);
}
export function unVerifyUser(username) {
  return instance.post("/admins/unVerify/" + username);
}
export async function createUser(params) {
  try {
    const data = await Axios.post("/accounts", { ...params });
    return data; 
  } catch (e) {
      throw e;
  }
}