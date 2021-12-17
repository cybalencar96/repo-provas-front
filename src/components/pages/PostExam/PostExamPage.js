import { useState } from "react";
import { PageContainer, FormContainer } from "./PostExamStyle";

export default function PostExamPage() {
    const [categories, setCategories] = useState([
        'P1', 'P2', 'P3', 'PF', 'T1', 'T2', 'T3', '2ch'   
    ])

    const [subjects, setSubjects] = useState([
        'matematica', 'portugues', 'ingles'   
    ])

    const [teachers, setTeachers] = useState([
        'Mr Been', 'Ms Jane'
    ])

    return (
        <PageContainer>
            <FormContainer>
                <label>Preencha o form para registrar prova</label>
                <input type='text' placeholder='Nome da Prova (ex: 2020.1)'/>
                
                <input list='categories' placeholder='Categoria' required/>
                <datalist id='categories'>
                    {
                        categories.map((category) => <option value={category} />)
                    }
                </datalist>

                <input list='subjects' placeholder='Disciplina' required/>
                <datalist id='subjects'>
                    {
                        subjects.map((subject) => <option value={subject} />)
                    }
                </datalist>

                <input list='teachers' placeholder='Professor' required/>
                <datalist id='teachers'>
                    {
                        subjects.map((subject) => <option value={subject} />)
                    }
                </datalist>

                <button type='submit'>Salvar</button>
            </FormContainer>
        </PageContainer>
    )
}

