import axios from 'axios';
const baseURL = 'http://localhost:8080';

const request = axios.create({
    baseURL,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

request.interceptors.response.use(
    res => res.data,
    err => {
        alert('请求失败：' + err.message);
        return Promise.reject(err);
    }
);

export default request;