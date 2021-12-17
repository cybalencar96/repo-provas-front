import { useState, useEffect } from 'react';
import { PageContainer, TypeList, ExamsList, LiElement } from './ListExamsStyle';
import * as backApi from '../../../services/backApi';

export default function ListExamsPage() {
    const [listBy, setListBy] = useState([]);
    const [listBySelect, setListBySelect] = useState('teacher');

    useEffect(() => {
        backApi.getTeachers().then((teachers) => setListBy(teachers.data));
    }, []);

    const handleListBy = (option) => () => {
        if (listBySelect !== 'teacher' && option === 'teacher') {
            backApi.getTeachers().then((teachers) => setListBy(teachers.data));
        }

        if (listBySelect !== 'subject' && option === 'subject') {
            backApi.getSubjects().then((subjects) => setListBy(subjects.data));
        }

        setListBySelect(option);
    }

    console.log(listBy)
    return (
        <PageContainer>
            <div className="type-list-options">
                <div 
                    onClick={handleListBy('teacher')} 
                    className={listBySelect === 'teacher' ? 'selected' : ''}
                >Listar por professor</div>
                <div 
                    onClick={handleListBy('subject')}
                    className={listBySelect === 'subject' ? 'selected' : ''}
                >Listar por disciplina</div>
            </div>
            
            <div className="content">
                <TypeList>
                    {
                        listBy.map(result => (
                            <LiElement>
                                {`${result.name} - ${result.exams.length} provas ${result.period ? ('- ' + result.period + '° Período') : ''}`}
                            </LiElement>
                        ))
                    }
                </TypeList>
                <ExamsList>
                    {/* Se for por prof */}
                    <LiElement>
                        P1 - 2020.1 - Matematica
                    </LiElement>

                    <LiElement>
                        P2 - 2020.1 - Matematica
                    </LiElement>

                    {/* Se for por disciplina */}
                    <LiElement>
                        P1 - 2020.1 - Professor
                    </LiElement>

                    <LiElement>
                        P2 - 2020.1 - Professor
                    </LiElement>
                    
                </ExamsList>
            </div>
        </PageContainer>
    )
}