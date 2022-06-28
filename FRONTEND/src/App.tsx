import '../src/style/App.scss';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../src/pages/MainPage';
import SettingPage from '../src/pages/SettingPage';
import ObservePage from '../src/pages/ObservePage';
import LoginPage from '../src/pages/LoginPage';
import LandingPage from '../src/pages/LandingPage';
import LayoutForm from '../src/components/layout/LayoutForm';
import DetailViewPage from '../src/pages/DetailViewPage';

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
        </Routes>
      </LayoutForm>
    </Router>
  );
}
