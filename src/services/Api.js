import axios from "axios";

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";
const API_KEY = "AIzaSyDNOfeef2euCEPEmYPzsgEzRkDHSuk6_mU"
const REGISTER_URL = `/accounts:signUp?key=${API_KEY}`;

export const RegisterApi = (userValues) => {
    let data = {
        displayName: userValues.name,
        email: userValues.email,
        password: userValues.password
    }
    return axios.post(REGISTER_URL, data);
}