import { PageContainer, TypeList, ExamsList, LiElement } from './ListExamsStyle';

export default function ListExamsPage() {
    return (
        <PageContainer>
            <div className="type-list-options">
                <div>Listar por professor</div>
                <div>Listar por disciplina</div>
            </div>
            
            <div className="content">
                <TypeList>
                    <LiElement>
                        Nome do professo - 12 provas
                    </LiElement>

                    <LiElement>
                        1° Período - Matematica - 5 provas
                    </LiElement>

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