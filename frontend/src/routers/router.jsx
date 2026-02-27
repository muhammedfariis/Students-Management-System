import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../landing/pages/home';
import Terms from '../landing/pages/terms';
import About from '../landing/pages/about';
import PricingPage from '../landing/pages/pricing';
import FeaturesPage from '../landing/pages/features';


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route  path='/terms' element={<Terms/>}/>
        <Route  path='/about' element={<About/>}/>
        <Route  path='/pricing' element={<PricingPage/>}/>
        <Route  path='/features' element={<FeaturesPage/>}/>




      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;