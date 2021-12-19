import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, TypeList, ExamsList, LiElement } from './ListExamsStyle';
import * as backApi from '../../../services/backApi';

const categories = ['P1', 'P2', 'P3', '2ch', 'Outras'];
const periods = [1,2,3,4,5,6,7,8,9,10];

export default function ListExamsPage() {
    const [listType, setlistType] = useState([]);
    const [listTypeSelected, setListTypeSelected] = useState('teacher');
    const [selectedEntity, setSelectedEntity] = useState(0);
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        backApi.getTeachersWithExams().then((teachers) => {
            setlistType(teachers.data);
            setSelectedEntity(teachers.data[0].id);
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
                setSelectedEntity(teachers.data[0].id);
            });
        }

        if (listTypeSelected !== 'subject' && option === 'subject') {
            backApi.getSubjectsWithExams().then((subjects) => {
                setlistType(subjects.data);
                setExams(subjects.data[0].exams);

                const orderedSubjects = subjects.data.sort((subjectA, subjectB) => subjectA.period - subjectB.period);
                setSelectedEntity(orderedSubjects[0].id);
            });
        }
        
        setListTypeSelected(option);
    }

    const handleEntityClick = (id) => () => {
        const entity = listType.find(entity => entity.id === id);
        setExams(entity.exams);
        setSelectedEntity(id);
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
                        listTypeSelected === 'teacher' ?

                        <TeacherTypeList 
                            teacherList={listType} 
                            selectedTeacher={selectedEntity}
                            handleTeacherClick={handleEntityClick}
                        />

                        :

                        periods.map(period => (
                            <SubjectTypeListByPeriod 
                                subjectList={listType} 
                                selectedSubject={selectedEntity}
                                handleSubjectClick={handleEntityClick}
                                period={period}
                            />
                        ))
                    }
                </TypeList>
                <ExamsList>
                    {
                        categories.map(category => (
                            <>
                            <ExamsFromTopic exams={exams} category={category} listTypeSelected={listTypeSelected} />
                            </>
                        ))
                    }
                </ExamsList>
            </div>
        </PageContainer>
    )
}

function TeacherTypeList({teacherList, selectedTeacher, handleTeacherClick}) {
    return (
        teacherList.map((teacher) => (
            <LiElement
                key={teacher.id}
                className={selectedTeacher === teacher.id && 'selected'}
                onClick={handleTeacherClick(teacher.id)}
            >
                {`${teacher.name} - ${teacher.exams.length} provas ${teacher.period ? ('- ' + teacher.period + '° Período') : ''}`}
            </LiElement>
        ))
    )
}

function SubjectTypeListByPeriod({subjectList, selectedSubject, handleSubjectClick, period}) {

    const filteredSubjectList = subjectList && subjectList.filter(result => result.period === period)
    
    if (filteredSubjectList.length === 0) return <></>
    return (
        <>
        <LiElement className='topic'>{period}° período</LiElement>
        {
            filteredSubjectList.map((subject) => (
                <LiElement 
                    key={subject.id}
                    className={(selectedSubject === subject.id) && 'selected'}
                    onClick={handleSubjectClick(subject.id)}
                >
                    {`${subject.name} - ${subject.exams.length} provas - ${period}° Período`}
                </LiElement>
            ))
        }
        </>
    )
}

function ExamsFromTopic({ category, exams, listTypeSelected }) {
    const goToPdfLink = (pdfLink) => () => {
        window.open(pdfLink);
    }

    const filteredExams = exams.length && exams.filter(exam => exam.category === category);

    if (!filteredExams || filteredExams.length === 0)  return <></>
    return (
        <>
            <LiElement className='topic'>{category}</LiElement>
            {
                filteredExams.map(exam => (
                    <LiElement onClick={goToPdfLink(exam.linkPdf)} key={exam.id}>
                        {`${exam.name} - `}
                        {listTypeSelected === 'subject' ? exam.class.teacher.name : exam.class.subject.name}
                    </LiElement>
                ))
            } 
        </>
    )
}