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

export async function postEvent(post) {
    // return Axios.post('/events', post, { headers: { "x-access-token": localStorage.getItem("token") } })
    //     .then(({ data: { id } }) => {
    //         if (post.image) {
    //             const formData = new FormData();
    //             formData.append('postimage', post.image);
    //             return Axios.put(`/posts/${id}/img`, formData, { headers: { "x-access-token": localStorage.getItem("token") } })
    //         } else {
    //             return Promise.resolve();
    //         }
    //     });

    try {
        console.log("CCCCCCCCCCCCC");
        console.log(post);
        const data = await instance.post('/events', post, { headers: { "x-access-token": localStorage.getItem("token")}})
            console.log(data);
            return data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
  