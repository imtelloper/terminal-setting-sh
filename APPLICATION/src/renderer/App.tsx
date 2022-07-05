import '../style/App.scss';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SettingPage from '../pages/SettingPage';
import ObservePage from '../pages/ObservePage';
import LoginPage from '../pages/LoginPage';
import LandingPage from '../pages/LandingPage';
import LayoutForm from '../components/layout/LayoutForm';
import DetailViewPage from '../pages/DetailViewPage';
import SensingView from '../pages/SensingView';

export default function App() {
  return (
    <Router>
      <LayoutForm>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/observe" element={<ObservePage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/detail" element={<DetailViewPage />} />
          <Route path="/sensingView" element={<SensingView/>}/>
        </Routes>
      </LayoutForm>
    </Router>
  );
}
