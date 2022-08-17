import '../style/App.scss';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SettingPage from '../pages/SettingPage';
import ObservePage from '../pages/ObservePage';
import LoginPage from '../pages/LoginPage';
import LandingPage from '../pages/LandingPage';
import LayoutForm from '../components/layout/LayoutForm';
import DetailViewPage from '../pages/DetailViewPage';
import SensingViewPage from '../pages/SensingViewPage';
import VideoArchivePage from '../pages/VideoArchivePage';
import ImgArchivePage from '../pages/ImgArchivePage';
import BinPage from '../pages/BinPage';
import AllListCheck from '../pages/AllListCheckPage';

export default function App() {
  return (
    <Router>
      <LayoutForm>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/observe" element={<ObservePage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/detail" element={<DetailViewPage />} />
          <Route path="/sensingView" element={<SensingViewPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/videoArchive" element={<VideoArchivePage />} />
          <Route path="/imgArchive" element={<ImgArchivePage />} />
          <Route path="/bin" element={<BinPage />} />
          <Route path="/allListCheck" element={<AllListCheck />}/>
        </Routes>
      </LayoutForm>
    </Router>
  );
}
