import axios from "axios";

axios.defaults.baseURL = "http://143.110.189.47:3200/"
// axios.defaults.baseURL = "http://192.168.2.122:3200/"
// axios.defaults.baseURL = "http://localhost:3200/"
export const apis = {
    login: ({ email, password }) => axios.post("auth/login", { email, password }),
    signup: ({ name, email, password, dateOfBirth }) => axios.post("auth/register", { name, email, password, dateOfBirth }),
    getUserDoc: async ({ page = 0 }) => axios.get(`userdocs?page=${page}`, { headers: { Authorization: "Bearer " + await localStorage.getItem("AUTH_TOKEN") } }),
    createUserDoc: async (data) => axios({
        url: `userdocs`,
        method: "POST",
        data,
        headers: {
            Authorization: "Bearer " + await localStorage.getItem("AUTH_TOKEN"),
            "Content-Type": "multipart/form-data; "
        }
    }),
}
