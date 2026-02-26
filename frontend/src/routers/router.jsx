import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../landing/pages/home';
import Terms from '../landing/pages/terms';



const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route  path='/terms' element={<Terms/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;