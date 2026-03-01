import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../landing/pages/home';
import Terms from '../landing/pages/terms';
import About from '../landing/pages/about';
import PricingPage from '../landing/pages/pricing';
import FeaturesPage from '../landing/pages/features';
import ContactPage from '../landing/pages/contact';
import PrivacyPage from '../landing/pages/privacy';
import ArchitecturePage from '../landing/pages/architecture';
import SystemLogicPage from '../landing/pages/systemLogic';
import DocumentationPage from '../landing/pages/documentationpage';
import RegisterPage from '../authentication/register';
import LoginPage from '../authentication/login';
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
        <Route path="/logics"  element={<SystemLogicPage/>}/>
        <Route path="/docs"  element={<DocumentationPage/>}/>
        <Route path="/register"  element={<RegisterPage/>}/>
        <Route path="/login"  element={<LoginPage/>}/>

        


         




      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;