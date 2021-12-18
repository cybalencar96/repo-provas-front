import { useState, useEffect } from 'react';
import { PageContainer, TypeList, ExamsList, LiElement } from './ListExamsStyle';
import * as backApi from '../../../services/backApi';

export default function ListExamsPage() {
    const [listType, setlistType] = useState([]);
    const [listTypeSelected, setListTypeSelected] = useState('teacher');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const goToPdfLink = (pdfLink) => () => {
        window.open(pdfLink);
    }

    if (loading) return <h1>Loading...</h1>
    return (
        <PageContainer>
            <div className="type-list-options">
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
                    {
                        exams.length && exams.map(exam => (
                            <LiElement onClick={goToPdfLink(exam.linkPdf)}>
                                {`${exam.category} - ${exam.name} - `}
                                {listTypeSelected === 'subject' ? exam.class.teacher.name : exam.class.subject.name}
                            </LiElement>
                        ))
                    }
                </ExamsList>
            </div>
        </PageContainer>
    )
}