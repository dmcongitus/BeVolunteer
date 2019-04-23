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

export function banUser(username) {
  return Axios.post("/ban/" + username, {
    headers: { "x-access-token": localStorage.getItem("token") }
  });
}

export async function createUser(params) {
  try {
    const data = await Axios.post("/accounts", { ...params });
    return data; 
  } catch (e) {
      throw e;
  }
}
