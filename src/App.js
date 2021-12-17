import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import PostExamPage from './components/pages/PostExam/PostExamPage';
import ListExamsPage from './components/pages/ListExams/ListExamsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/list-exams' element={<ListExamsPage />} />
        <Route path='/add-exam' element={<PostExamPage />} />
        <Route path='/' element={<Home />}/>
        <Route path='*' element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}
