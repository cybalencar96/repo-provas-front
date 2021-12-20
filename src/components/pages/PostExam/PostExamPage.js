import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { PageContainer, FormContainer, DropContainer, FileContainer, Preview } from "./PostExamStyle";
import * as backApi from '../../../services/backApi';
import Dropzone from 'react-dropzone';
import { MdCheckCircle } from 'react-icons/md'
import { v4 as uuid } from 'uuid';
import filesize from 'filesize';

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

    function handleUpload(files) {
        const file = files[0]
        
        const uploadedFile = {
            file: file,
            id: uuid(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null
        }

        setInputs({...inputs, uploadedFile})
    }

    function postExam(e) {
        e.preventDefault();
        const {
            name,
            category,
            subject,
            teacher,
            uploadedFile,
        } = inputs;

        const formData = new FormData();
        
        formData.append('file', uploadedFile.file, uploadedFile.name);
        formData.append('name', name);
        formData.append('category', category);
        formData.append('subject', subject);
        formData.append('teacher', teacher);
        
        backApi.postExam(formData, inputs, setInputs)

        .then(() => navigate('/list-exams'))
        .catch((err) => alert((err.response && err.response.data) || 'Algum erro ocorreu'))
    }

    if (loading) return <h1>Loading...</h1>;
    return (
        <PageContainer>
            <p onClick={() => navigate('/')}>↩</p>
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

                <Upload onUpload={handleUpload}/>

                {
                    inputs.uploadedFile && (
                        <ExamFile 
                            file={inputs.uploadedFile} 
                            inputs={inputs}
                            setInputs={setInputs}
                        />
                    )
                }

                <button type='submit'>Salvar</button>
            </FormContainer>
        </PageContainer>
    )
}


function Upload({ onUpload }) {
    function DragMessage(isDragActive, isDragReject) {
        if (!isDragActive) return 'Drag and drop your pdf exam here'
        if (isDragReject) return 'This is not a valid exam file'
        if (isDragActive) return 'Drop your exam!'
    }

    return (
        <Dropzone accept='application/pdf' onDropAccepted={onUpload}>
            {
                ({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                    <DropContainer
                        {...getRootProps()}
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                    >
                        <input {...getInputProps()} />

                        {DragMessage(isDragActive, isDragReject)}
                    </DropContainer>
                )
            }
        </Dropzone>
    )
}

function ExamFile ({ file, inputs, setInputs }) {
    return (
        <FileContainer>
        <div className='file-info'>
            <Preview className='image' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAgNEns2cLswbw1K2Ho5WovTshIkvQ0gbnuQ&usqp=CAU'} />
            <div >
                <strong>{file.name}</strong>
                <span>{file.readableSize}<div onClick={() => setInputs({...inputs, uploadedFile: null})}>Excluir</div></span>
            </div>
        </div>
        <div>
            <MdCheckCircle size={40} color="#78e5d5" /> 
        </div>
        
        </FileContainer>
        
    )
}
