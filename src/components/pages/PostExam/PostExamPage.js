import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { PageContainer, FormContainer } from "./PostExamStyle";
import * as backApi from '../../../services/backApi';

const categories = ['P1', 'P2', 'P3', '2ch', 'Outras'];

export default function PostExamPage() {
    const [subjects, setSubjects] = useState([]);
    const [possibleSubjects, setPossibleSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [possibleTeachers, setPossibleTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputs, setInputs] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const resTeachers = await backApi.getTeachers();
        const resSubjects = await backApi.getSubjects();

        setSubjects(resSubjects.data);
        setTeachers(resTeachers.data);
        setPossibleTeachers(resTeachers.data);
        setPossibleSubjects(resSubjects.data);
        setLoading(false);
    }

    const handleInputChange = (inputType) => (event) => {
        inputs[inputType] = event.target.value;
        setInputs({...inputs});

        checkPossibilities(inputType, event.target.value)
    }

    function checkPossibilities(inputType, value) {

        if (inputType === 'subject') {
            if (!value) return setPossibleTeachers(teachers)

            const subject = subjects.find((subject) => subject.name === value);
            setPossibleTeachers(
                subject 
                ? subject.teachers.map(teacher => ({ name: teacher }))
                : []
            );
        }

        if (inputType === 'teacher') {
            if (!value) return setPossibleSubjects(subjects);

            const teacher = teachers.find((teacher) => teacher.name === value);
            setPossibleSubjects(
                teacher 
                ? teacher.subjects.map((subject) => ({ name: subject }))
                : []
            );
        }
    }

    function postExam(e) {
        e.preventDefault();
        const {
            name,
            category,
            subject,
            teacher,
            linkPdf,
        } = inputs;

        backApi.postExam({
            name,
            category,
            subject,
            teacher,
            linkPdf,
        })
        .then(() => navigate('/list-exams'))
        .catch((err) => console.error(err.response))
    }

    if (loading) return <h1>Loading...</h1>;
    return (
        <PageContainer>
            <FormContainer onSubmit={postExam}>
                <label>Preencha o form para registrar prova</label>
                <input 
                    type='text' 
                    placeholder='Nome da Prova (ex: 2020.1)' 
                    onChange={handleInputChange('name')}
                    value={inputs.name}
                    required/>
                
                <input 
                    list='categories' 
                    placeholder='Categoria' 
                    required
                    onChange={handleInputChange('category')}
                    value={inputs.category}
                />
                <datalist id='categories'>
                    {
                        categories.map((category) => <option value={category} />)
                    }
                </datalist>

                <input 
                    list='subjects' 
                    placeholder='Disciplina'
                    onChange={handleInputChange('subject')}
                    value={inputs.subject} 
                    required
                />
                <datalist id='subjects'>
                    {
                        possibleSubjects.map((subject) => <option value={subject.name} />)
                    }
                </datalist>

                <input 
                    list='teachers' 
                    placeholder='Professor' 
                    onChange={handleInputChange('teacher')}
                    value={inputs.teacher} 
                    required
                />
                <datalist id='teachers'>
                    {
                        possibleTeachers.map((teacher) => <option value={teacher.name} />)
                    }
                </datalist>

                <input 
                    type='url' 
                    placeholder='Link pdf' 
                    onChange={handleInputChange('linkPdf')}
                    value={inputs.linkPdf} 
                    required
                />

                <button type='submit'>Salvar</button>
            </FormContainer>
        </PageContainer>
    )
}

