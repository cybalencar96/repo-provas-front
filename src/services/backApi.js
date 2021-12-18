import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';

function getTeachersWithExams() {
    return  axios.get('/teachers');
}

function getSubjectsWithExams() {
    return  axios.get('/subjects');
}

function getTeachers(filters = {}) {
    const {
        name,
        subject,
    } = filters;

    let query = '';

    if (name) {
        query += `name=${name}&`;
    }

    if (subject) {
        query += `subject=${subject}&`;
    }

    return axios.get(`/teachers/where?${query}`);
}

function getSubjects(filters = {}) {
    const {
        name,
        teacher,
    } = filters;

    let query = '';

    if (name) {
        query += `name=${name}&`;
    }

    if (teacher) {
        query += `subject=${teacher}&`;
    }

    return axios.get(`/subjects/where?${query}`);
}

function postExam(body) {
    return axios.post('/exams', body);
}
export {
    getTeachersWithExams,
    getSubjectsWithExams,
    getSubjects,
    getTeachers,
    postExam,
}