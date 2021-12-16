import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='*' element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}
