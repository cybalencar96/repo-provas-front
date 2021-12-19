import axios from 'axios';

console.log(process.env.REACT_APP_BASE_URL)
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || 'https://my-repo-provas.herokuapp.com/';

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