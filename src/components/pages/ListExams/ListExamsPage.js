import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, TypeList, ExamsList, LiElement } from './ListExamsStyle';
import * as backApi from '../../../services/backApi';

export default function ListExamsPage() {
    const [listType, setlistType] = useState([]);
    const [listTypeSelected, setListTypeSelected] = useState('teacher');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        backApi.getTeachersWithExams().then((teachers) => {
            setlistType(teachers.data);

            if (teachers.data.length) {
                setExams(teachers.data[0].exams);
            }

            setLoading(false);
        });
    }, []);

    const handleListType = (option) => () => {
        if (listTypeSelected !== 'teacher' && option === 'teacher') {
            backApi.getTeachersWithExams().then((teachers) => {
                setlistType(teachers.data);
                setExams(teachers.data[0].exams);
            });
        }

        if (listTypeSelected !== 'subject' && option === 'subject') {
            backApi.getSubjectsWithExams().then((subjects) => {
                setlistType(subjects.data);
                setExams(subjects.data[0].exams);
            });
        }

        setSelectedIndex(0)
        setListTypeSelected(option);
    }

    const handleEntityClick = (idx) => () => {
        setExams(listType[idx].exams);
        setSelectedIndex(idx)
    };

    
    if (loading) return <h1>Loading...</h1>
    return (
        <PageContainer>
            <div className="type-list-options">
                <p onClick={() => navigate('/')}>↩</p>
                <div 
                    onClick={handleListType('teacher')} 
                    className={listTypeSelected === 'teacher' ? 'selected' : ''}
                >Listar por professor</div>
                <div 
                    onClick={handleListType('subject')}
                    className={listTypeSelected === 'subject' ? 'selected' : ''}
                >Listar por disciplina</div>
            </div>
            
            <div className="content">
                <TypeList>
                    {
                        listType.map((result, idx) => (
                            <LiElement 
                                className={selectedIndex === idx && 'selected'}
                                onClick={handleEntityClick(idx)}
                            >
                                {`${result.name} - ${result.exams.length} provas ${result.period ? ('- ' + result.period + '° Período') : ''}`}
                            </LiElement>
                        ))
                    }
                </TypeList>
                <ExamsList>
                    <LiElement className='topic'>P1</LiElement>
                    <ExamsFromTopic exams={exams} topic='P1' listTypeSelected={listTypeSelected} />

                    <LiElement className='topic'>P2</LiElement>
                    <ExamsFromTopic exams={exams} topic='P2' listTypeSelected={listTypeSelected} />

                    <LiElement className='topic'>P3</LiElement>
                    <ExamsFromTopic exams={exams} topic='P3' listTypeSelected={listTypeSelected} />

                    <LiElement className='topic'>2ª chamada</LiElement>
                    <ExamsFromTopic exams={exams} topic='2ch' listTypeSelected={listTypeSelected} />

                    <LiElement className='topic'>Outras</LiElement>
                    <ExamsFromTopic exams={exams} topic='Outras' listTypeSelected={listTypeSelected} />
                </ExamsList>
            </div>
        </PageContainer>
    )
}

function ExamsFromTopic({ topic, exams, listTypeSelected }) {
    const goToPdfLink = (pdfLink) => () => {
        window.open(pdfLink);
    }


    return (
        <>
        {
            exams.length && exams.filter(exam => exam.category === topic).map(exam => (
                <LiElement onClick={goToPdfLink(exam.linkPdf)}>
                    {`${exam.name} - `}
                    {listTypeSelected === 'subject' ? exam.class.teacher.name : exam.class.subject.name}
                </LiElement>
            ))
        }
        </>
    )
}