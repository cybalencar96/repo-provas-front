import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';

function getTeachers() {
    return  axios.get('/teachers');
}

function getSubjects() {
    return  axios.get('/subjects');
}

export {
    getTeachers,
    getSubjects,
}