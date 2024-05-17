import axios from "axios";
import { getUserdata } from "./Local-storage";

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";
// const API_KEY = `AIzaSyDNOfeef2euCEPEmYPzsgEzRkDHSuk6_mU`;
const REGISTER_URL = `/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
const LOGIN_URL = `/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
const GET_USER_DATA_URL = `/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

export const RegisterApi = (userValues) => {
    let data = {
        displayName: userValues.name,
        email: userValues.email,
        password: userValues.password
    }
    return axios.post(REGISTER_URL, data);
}

export const LoginApi = (userValues) => {
    let data = {
        email: userValues.email,
        password: userValues.password
    }
    return axios.post(LOGIN_URL, data);
}

export const GetUserDataApi = () => {
    let data = {
        idToken	: getUserdata(),
    }
    return axios.post(GET_USER_DATA_URL, data);
}

