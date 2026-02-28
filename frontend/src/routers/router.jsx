import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../landing/pages/home';
import Terms from '../landing/pages/terms';
import About from '../landing/pages/about';
import PricingPage from '../landing/pages/pricing';
import FeaturesPage from '../landing/pages/features';
import ContactPage from '../landing/pages/contact';
import PrivacyPage from '../landing/pages/privacy';
import ArchitecturePage from '../landing/pages/architecture';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route  path='/terms' element={<Terms/>}/>
        <Route  path='/about' element={<About/>}/>
        <Route  path='/pricing' element={<PricingPage/>}/>
        <Route  path='/features' element={<FeaturesPage/>}/>
        <Route  path='/contact' element={<ContactPage/>}/>
        <Route  path='/privacy' element={<PrivacyPage/>}/>
        <Route  path='/architecture' element={<ArchitecturePage/>}/>






      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;