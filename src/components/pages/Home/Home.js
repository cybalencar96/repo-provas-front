import { useNavigate } from 'react-router-dom';
import { HomeContainer, RouteButton } from './HomeStyle';

export default function Home() {
    const navigate = useNavigate();

    return (
        <HomeContainer>
            <RouteButton onClick={() => navigate('/list-exams')}>Buscar provas</RouteButton>
            <RouteButton onClick={() => navigate('/add-exam')}>Postar prova</RouteButton>
        </HomeContainer>
    )
}