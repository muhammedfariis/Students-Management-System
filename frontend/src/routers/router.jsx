import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Landing Pages
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

// Auth Pages
import RegisterPage from '../authentication/register';
import LoginPage from '../authentication/login';

// Admin Layout & Pages
import AdminLayout from '../layouts/adminlayouts';
import Dashboard from '../Admins/pages/dashboard';
import SettingsPage from '../Admins/pages/settings';
import AddUserPage from '../Admins/pages/addUsers';
import CreateEventPage from '../Admins/pages/events';
import ActionPage from '../Admins/pages/action';
import StudentList from '../Admins/pages/studentsList';
import UserList from '../Admins/pages/usersList';
import AttendancePage from '../Admins/pages/attandance';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC LANDING ROUTES --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path='/terms' element={<Terms/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/pricing' element={<PricingPage/>}/>
        <Route path='/features' element={<FeaturesPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/privacy' element={<PrivacyPage/>}/>
        <Route path='/architecture' element={<ArchitecturePage/>}/>
        <Route path="/logics" element={<SystemLogicPage/>}/>
        <Route path="/docs" element={<DocumentationPage/>}/>

        {/* --- AUTHENTICATION ROUTES --- */}
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>

        {/* --- ADMIN ROUTES (All show the Sidebar) --- */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* This makes /admin default to the Dashboard */}
          <Route index element={<Dashboard />} />
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="users/add" element={<AddUserPage />} />
          <Route path="events" element={<CreateEventPage />} />
          <Route path="action" element={<ActionPage />} />
          <Route path="studentlist" element={<StudentList />} />
          <Route path="userslist" element={<UserList />} />
          <Route path="attendanceAdmin" element={<AttendancePage />} />
        </Route>

        {/* --- FALLBACK --- */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;